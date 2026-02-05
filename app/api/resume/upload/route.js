
import { auth } from '@clerk/nextjs/server'
import OpenAI from 'openai'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'
import sql from '@/lib/db'


export const runtime = 'nodejs'


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})


async function extractTextFromPDF(buffer) {
  try {
    const data = new Uint8Array(buffer)
    const pdf = await pdfjs.getDocument({ data }).promise
    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ')
      fullText += pageText + '\n'
    }

    return fullText.trim()
  } catch (error) {
    console.error('PDF extraction error:', error)
    throw new Error('Failed to extract text from PDF')
  }
}

export async function POST(request) {
  try {
    
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    
    const formData = await request.formData()
    const file = formData.get('resume')

    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 })
    }

    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    
    let resumeText = ''
    
    if (file.type === 'text/plain') {
      resumeText = buffer.toString('utf-8')
    } else if (file.type === 'application/pdf') {
      try {
        resumeText = await extractTextFromPDF(buffer)
        
        if (!resumeText || resumeText.trim().length < 50) {
          return Response.json({ 
            error: 'Could not extract enough text from PDF. It may be:\n1. A scanned image (not text-based)\n2. Encrypted\n3. Empty\n\nPlease try converting to TXT format.' 
          }, { status: 400 })
        }
      } catch (pdfError) {
        console.error('PDF parsing error:', pdfError)
        return Response.json({ 
          error: 'Failed to read PDF. Please ensure it\'s a text-based PDF (not a scanned image) or convert to TXT format.' 
        }, { status: 400 })
      }
    } else {
      return Response.json({ 
        error: 'Unsupported file type. Please upload TXT or PDF.' 
      }, { status: 400 })
    }

    // Analyze resume with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional resume analyzer. Extract information from resumes and return ONLY valid JSON, no markdown formatting."
        },
        {
          role: "user",
          content: `Analyze this resume and extract the following information in JSON format:

{
  "skills": ["list of technical and soft skills"],
  "experience": ["brief descriptions of work experience, one per job"],
  "education": ["education qualifications"],
  "strengths": ["3-5 key strengths based on the resume"],
  "gaps": ["3-5 areas that could be improved or are missing"],
  "summary": "A brief 2-3 sentence professional summary"
}

Resume content:
${resumeText}

Return ONLY the JSON object, no other text.`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    })

    const responseText = completion.choices[0].message.content.trim()
    
    // Remove markdown code blocks if present
    const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    let analysis
    try {
      analysis = JSON.parse(cleanedText)
    } catch (e) {
      console.error('Failed to parse OpenAI response:', cleanedText)
      throw new Error('Failed to parse AI response as JSON')
    }

    // Save to database
    const insertResult = await sql`
      INSERT INTO resumes (
        user_id, 
        file_name, 
        file_type, 
        file_content,
        raw_text,
        parsed_data,
        analysis,
        is_active
      ) VALUES (
        ${userId},
        ${file.name},
        ${file.type},
        ${resumeText.substring(0, 50000)},
        ${resumeText.substring(0, 50000)},
        ${JSON.stringify(analysis)},
        ${JSON.stringify(analysis)},
        true
      )
      RETURNING id
    `

    const resumeId = insertResult[0].id

    return Response.json({
      success: true,
      message: 'Resume uploaded and analyzed successfully',
      resumeId,
      analysis
    })

  } catch (error) {
    console.error('Resume upload error:', error)
    return Response.json({ 
      error: error.message || 'Failed to process resume' 
    }, { status: 500 })
  }
}
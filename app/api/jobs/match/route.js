// app/api/jobs/match/route.js
import { auth } from '@clerk/nextjs/server'
import OpenAI from 'openai'
import sql from '@/lib/db'
import { mockJobs } from '@/lib/mockJobs'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's resume analysis
    const resumes = await sql`
      SELECT * FROM resumes 
      WHERE user_id = ${userId} AND is_active = true
      ORDER BY created_at DESC
      LIMIT 1
    `

    if (resumes.length === 0) {
      return Response.json({ 
        error: 'Please upload your resume first' 
      }, { status: 400 })
    }

    const resume = resumes[0]

    // Get user preferences
    const profiles = await sql`
      SELECT * FROM profiles WHERE user_id = ${userId}
    `

    if (profiles.length === 0) {
      return Response.json({ 
        error: 'Please set your career preferences first' 
      }, { status: 400 })
    }

    const profile = profiles[0]

    // Filter jobs based on preferences
    let filteredJobs = mockJobs

    // Filter by location
    if (profile.location_preferences && profile.location_preferences.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        profile.location_preferences.some(loc => 
          job.location.toLowerCase().includes(loc.toLowerCase()) ||
          loc.toLowerCase() === 'remote' && job.work_type === 'remote'
        )
      )
    }

    // Filter by work type
    if (profile.work_type) {
      filteredJobs = filteredJobs.filter(job => 
        job.work_type === profile.work_type
      )
    }

    // Filter by salary
    if (profile.salary_min) {
      filteredJobs = filteredJobs.filter(job => 
        job.salary_max >= profile.salary_min
      )
    }

    if (profile.salary_max) {
      filteredJobs = filteredJobs.filter(job => 
        job.salary_min <= profile.salary_max
      )
    }

    // If no jobs match filters, use all jobs
    if (filteredJobs.length === 0) {
      filteredJobs = mockJobs
    }

    // Use AI to score each job
    const scoredJobs = await Promise.all(
      filteredJobs.map(async (job) => {
        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "You are a job matching expert. Analyze how well a job matches a candidate's profile and return ONLY a JSON object."
              },
              {
                role: "user",
                content: `Score this job match from 0-100 and provide reasoning.

Candidate Profile:
- Skills: ${JSON.stringify(resume.analysis?.skills || [])}
- Experience: ${JSON.stringify(resume.analysis?.experience || [])}
- Target Roles: ${JSON.stringify(profile.target_roles || [])}

Job:
- Title: ${job.title}
- Company: ${job.company}
- Requirements: ${JSON.stringify(job.requirements)}
- Description: ${job.description}

Return ONLY this JSON format:
{
  "score": 85,
  "reasoning": "Brief explanation of why this is a good match",
  "keyMatches": ["skill1", "skill2"],
  "missingSkills": ["skill3"]
}`
              }
            ],
            temperature: 0.3,
            max_tokens: 500
          })

          const responseText = completion.choices[0].message.content.trim()
          const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
          
          let matchData
          try {
            matchData = JSON.parse(cleanedText)
          } catch (e) {
            // Fallback if AI doesn't return valid JSON
            matchData = {
              score: 50,
              reasoning: "Match analysis unavailable",
              keyMatches: [],
              missingSkills: []
            }
          }

          return {
            ...job,
            matchScore: matchData.score,
            reasoning: matchData.reasoning,
            keyMatches: matchData.keyMatches,
            missingSkills: matchData.missingSkills
          }
        } catch (error) {
          console.error('Error scoring job:', job.id, error)
          return {
            ...job,
            matchScore: 50,
            reasoning: "Unable to analyze match",
            keyMatches: [],
            missingSkills: []
          }
        }
      })
    )

    // Sort by match score (highest first)
    const rankedJobs = scoredJobs.sort((a, b) => b.matchScore - a.matchScore)

    // Take top 10
    const topMatches = rankedJobs.slice(0, 10)

    // Save to database
    await Promise.all(
      topMatches.map(async (job) => {
        try {
          await sql`
            INSERT INTO jobs (
              user_id,
              external_id,
              title,
              company,
              location,
              salary_min,
              salary_max,
              job_type,
              work_type,
              description,
              requirements,
              url,
              source,
              match_score,
              match_reasoning
            ) VALUES (
              ${userId},
              ${job.id.toString()},
              ${job.title},
              ${job.company},
              ${job.location},
              ${job.salary_min},
              ${job.salary_max},
              ${job.job_type},
              ${job.work_type},
              ${job.description},
              ${job.requirements},
              ${job.url},
              ${job.source},
              ${job.matchScore / 100},
              ${job.reasoning}
            )
            ON CONFLICT (user_id, external_id) DO UPDATE SET
              match_score = EXCLUDED.match_score,
              match_reasoning = EXCLUDED.match_reasoning
          `
        } catch (dbError) {
          console.error('Error saving job to DB:', dbError)
        }
      })
    )

    return Response.json({
      success: true,
      message: `Found ${topMatches.length} matching jobs`,
      jobs: topMatches
    })

  } catch (error) {
    console.error('Job matching error:', error)
    return Response.json({ 
      error: error.message || 'Failed to match jobs' 
    }, { status: 500 })
  }
}
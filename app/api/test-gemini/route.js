import { GoogleGenerativeAI } from '@google/generative-ai'

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    
    // List all available models
    const models = await genAI.listModels()
    
    return Response.json({
      success: true,
      models: models.map(m => ({
        name: m.name,
        displayName: m.displayName,
        supportedGenerationMethods: m.supportedGenerationMethods
      }))
    })
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
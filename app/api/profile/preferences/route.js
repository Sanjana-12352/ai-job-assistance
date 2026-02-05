// app/api/profile/preferences/route.js
import { auth } from '@clerk/nextjs/server'
import sql from '@/lib/db'

// GET user preferences
export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await sql`
      SELECT * FROM profiles WHERE user_id = ${userId}
    `

    if (profile.length === 0) {
      return Response.json({ 
        profile: null,
        message: 'No preferences set yet' 
      })
    }

    return Response.json({ 
      success: true,
      profile: profile[0] 
    })

  } catch (error) {
    console.error('Get preferences error:', error)
    return Response.json({ 
      error: error.message 
    }, { status: 500 })
  }
}

// POST/UPDATE user preferences
export async function POST(request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const {
      targetRoles,
      targetIndustries,
      salaryMin,
      salaryMax,
      locationPreferences,
      workType
    } = data

    // Validation
    if (!targetRoles || targetRoles.length === 0) {
      return Response.json({ 
        error: 'Please provide at least one target role' 
      }, { status: 400 })
    }

    // Check if profile exists
    const existing = await sql`
      SELECT id FROM profiles WHERE user_id = ${userId}
    `

    if (existing.length > 0) {
      // Update existing profile
      await sql`
        UPDATE profiles SET
          target_roles = ${targetRoles},
          target_industries = ${targetIndustries || []},
          salary_min = ${salaryMin || null},
          salary_max = ${salaryMax || null},
          location_preferences = ${locationPreferences || []},
          work_type = ${workType || null},
          updated_at = NOW()
        WHERE user_id = ${userId}
      `
    } else {
      // Create new profile
      await sql`
        INSERT INTO profiles (
          user_id,
          target_roles,
          target_industries,
          salary_min,
          salary_max,
          location_preferences,
          work_type,
          created_at,
          updated_at
        ) VALUES (
          ${userId},
          ${targetRoles},
          ${targetIndustries || []},
          ${salaryMin || null},
          ${salaryMax || null},
          ${locationPreferences || []},
          ${workType || null},
          NOW(),
          NOW()
        )
      `
    }

    return Response.json({
      success: true,
      message: 'Preferences saved successfully'
    })

  } catch (error) {
    console.error('Save preferences error:', error)
    return Response.json({ 
      error: error.message 
    }, { status: 500 })
  }
}
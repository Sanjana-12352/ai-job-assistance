// app/api/user/sync/route.js
import { auth, currentUser } from '@clerk/nextjs/server'
import sql from '@/lib/db'

export async function POST() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await currentUser()
    
    // Check if user exists in database
    const existingUser = await sql`
      SELECT id FROM users WHERE id = ${userId}
    `

    if (existingUser.length === 0) {
      // Create user in database
      await sql`
        INSERT INTO users (id, email, full_name, created_at, updated_at)
        VALUES (
          ${userId},
          ${user.emailAddresses[0]?.emailAddress},
          ${user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : null},
          NOW(),
          NOW()
        )
      `
    }

    return Response.json({ 
      success: true,
      message: 'User synced successfully'
    })

  } catch (error) {
    console.error('User sync error:', error)
    return Response.json({ 
      error: error.message 
    }, { status: 500 })
  }
}
import { testConnection } from '@/lib/db';
import sql from '@/lib/db';

export async function GET() {
  try {
    // Test basic connection
    const isConnected = await testConnection();
    
    if (!isConnected) {
      return Response.json({ 
        success: false, 
        message: 'Database connection failed' 
      }, { status: 500 });
    }

    // Test querying tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    return Response.json({
      success: true,
      message: 'Database connected successfully!',
      tables: tables.map(t => t.table_name),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
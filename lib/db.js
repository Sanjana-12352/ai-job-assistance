import { neon } from '@neondatabase/serverless';

// Create database connection
const sql = neon(process.env.DATABASE_URL);

// Helper function to execute queries
export async function query(text, params) {
  try {
    const result = await sql(text, params);
    return { success: true, data: result };
  } catch (error) {
    console.error('Database query error:', error);
    return { success: false, error: error.message };
  }
}

// Test connection function
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connected successfully!', result);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

export default sql;
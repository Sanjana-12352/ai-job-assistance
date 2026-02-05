// app/dashboard/preferences/page.js
import { currentUser } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import PreferencesForm from './components/PreferencesForm'

export default async function PreferencesPage() {
  const user = await currentUser()
  
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '40px 20px'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '1px solid #333'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/dashboard" style={{
              color: '#00ff88',
              textDecoration: 'none',
              fontSize: '20px',
              cursor: 'pointer'
            }}>
              ← Back
            </Link>
            <h1 style={{ 
              fontSize: '28px',
              fontWeight: '600',
              margin: 0
            }}>
              ⚙️ Career Preferences
            </h1>
          </div>
          <UserButton />
        </div>

        {/* Info Card */}
        <div style={{ 
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '30px'
        }}>
          <h2 style={{ 
            fontSize: '18px',
            fontWeight: '500',
            margin: '0 0 12px 0',
            color: '#00ff88'
          }}>
            Set Your Job Search Criteria
          </h2>
          <p style={{ 
            margin: 0,
            color: '#888',
            lineHeight: '1.6',
            fontSize: '14px'
          }}>
            Tell us what you're looking for in your next role. The Job Matcher will use these preferences 
            along with your resume to find the most relevant opportunities for you.
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '12px',
          padding: '30px'
        }}>
          <PreferencesForm />
        </div>
      </div>
    </div>
  )
}

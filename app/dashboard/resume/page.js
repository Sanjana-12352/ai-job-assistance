// app/dashboard/resume/page.js
import { currentUser } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import ResumeUpload from '../components/ResumeUpload'

export default async function ResumePage() {
  const user = await currentUser()
  
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '40px 20px'
    }}>
      <div style={{ 
        maxWidth: '1000px', 
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
              📄 Resume Analyzer
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
            How it works:
          </h2>
          <ul style={{ 
            margin: 0,
            paddingLeft: '20px',
            color: '#888',
            lineHeight: '1.8'
          }}>
            <li>Upload your resume in TXT format</li>
            <li>AI analyzes your skills, experience, and qualifications</li>
            <li>Get insights on strengths and areas for improvement</li>
            <li>Use this analysis to optimize job matches</li>
          </ul>
        </div>

        {/* Upload Card */}
        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '12px',
          padding: '30px'
        }}>
          <ResumeUpload />
        </div>
      </div>
    </div>
  )
}
// app/dashboard/page.js
import { currentUser } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import Card from '../components/Card'
import UserSync from './components/UserSync'

export default async function DashboardPage() {
  const user = await currentUser()
  
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '40px 20px'
    }}>
      <UserSync />
      <div style={{ 
        maxWidth: '1400px', 
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
          <h1 style={{ 
            fontSize: '32px',
            fontWeight: '600',
            margin: 0
          }}>
            AI Job Assistant
          </h1>
          <UserButton />
        </div>

        {/* Welcome Card */}
        <div style={{ 
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '40px'
        }}>
          <h2 style={{ 
            fontSize: '24px',
            fontWeight: '500',
            margin: '0 0 10px 0'
          }}>
            Welcome back, {user?.firstName || 'there'}! 👋
          </h2>
          <p style={{ 
            margin: 0,
            color: '#888',
            fontSize: '16px'
          }}>
            Your AI-powered job search assistant. Select an agent below to get started.
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          <Card
            icon="📄"
            title="Resume Analyzer"
            description="Upload and analyze your resume. Get insights on skills, strengths, and areas for improvement."
            href="/dashboard/resume"
            accentColor="#00ff88"
          />

          <Card
            icon="⚙️"
            title="Career Preferences"
            description="Set your target roles, industries, salary expectations, and location preferences."
            href="/dashboard/preferences"
            accentColor="#0088ff"
          />

          <Card
            icon="🎯"
            title="Job Matcher"
            description="Find jobs that perfectly match your skills and preferences using AI-powered search."
            href="/dashboard/job-matcher"
            accentColor="#ff00ff"
            comingSoon={true}
          />

          <Card
            icon="✍️"
            title="Resume Customizer"
            description="Generate tailored resumes and cover letters for each job application."
            href="/dashboard/customizer"
            accentColor="#ffaa00"
            comingSoon={true}
          />

          <Card
            icon="💬"
            title="Interview Prep"
            description="Practice common interview questions and get AI-powered feedback."
            href="/dashboard/interview"
            accentColor="#ff0088"
            comingSoon={true}
          />

          <Card
            icon="📊"
            title="Application Tracker"
            description="Track all your applications, follow-ups, and interview schedules in one place."
            href="/dashboard/tracker"
            accentColor="#00ffff"
            comingSoon={true}
          />
        </div>
      </div>
    </div>
  )
}
'use client'

import { useRouter } from 'next/navigation'

export default function Card({ title, icon, description, href, accentColor = '#00ff88', comingSoon = false }) {
  const router = useRouter()

  const handleClick = () => {
    if (!comingSoon && href) {
      router.push(href)
    }
  }

  return (
    <div 
      onClick={handleClick}
      style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '12px',
        padding: '30px',
        cursor: comingSoon ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        opacity: comingSoon ? 0.6 : 1
      }}
      onMouseEnter={(e) => {
        if (!comingSoon) {
          e.currentTarget.style.borderColor = accentColor
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = `0 8px 16px rgba(0, 255, 136, 0.1)`
        }
      }}
      onMouseLeave={(e) => {
        if (!comingSoon) {
          e.currentTarget.style.borderColor = '#333'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }
      }}
    >
      <h3 style={{ 
        fontSize: '20px',
        fontWeight: '500',
        margin: '0 0 12px 0',
        color: accentColor,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '24px' }}>{icon}</span>
        {title}
      </h3>
      
      <p style={{ 
        color: '#888',
        margin: '0 0 20px 0',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        {description}
      </p>

      {comingSoon && (
        <span style={{
          display: 'inline-block',
          padding: '6px 12px',
          backgroundColor: '#333',
          color: '#888',
          fontSize: '12px',
          borderRadius: '4px',
          fontWeight: '500'
        }}>
          Coming Soon
        </span>
      )}
    </div>
  )
}
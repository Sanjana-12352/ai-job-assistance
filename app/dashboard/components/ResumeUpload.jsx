'use client'

import { useState } from 'react'

export default function ResumeUpload() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    
    const validTypes = ['application/pdf', 'text/plain']
    if (selectedFile && !validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or TXT file')
      setFile(null)
      return
    }
    
    setFile(selectedFile)
    setError(null)
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('resume', file)

      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setResult(data)
      setFile(null)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div style={{ 
        border: '2px dashed #444',
        borderRadius: '8px',
        padding: '30px',
        textAlign: 'center',
        marginBottom: '20px',
        backgroundColor: '#0a0a0a'
      }}>
        <input 
          type="file" 
          accept=".pdf,.txt"
          onChange={handleFileChange}
          style={{ 
            marginBottom: '20px',
            color: '#fff'
          }}
        />

        {file && (
          <p style={{ color: '#00ff88', marginBottom: '20px', fontSize: '14px' }}>
            ✅ Selected: {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          style={{
            padding: '14px 32px',
            backgroundColor: uploading ? '#333' : '#00ff88',
            color: uploading ? '#888' : '#000',
            border: 'none',
            borderRadius: '6px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
        >
          {uploading ? '⏳ Analyzing...' : '🚀 Upload & Analyze'}
        </button>
      </div>

      {error && (
        <div style={{ 
          padding: '16px',
          backgroundColor: '#2a0000',
          border: '1px solid #ff4444',
          color: '#ff6666',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          ❌ {error}
        </div>
      )}

      {result && (
        <div style={{ 
          marginTop: '30px',
          padding: '24px',
          backgroundColor: '#0a2a0a',
          border: '1px solid #00ff88',
          borderRadius: '8px'
        }}>
          <h4 style={{ 
            margin: '0 0 20px 0',
            color: '#00ff88',
            fontSize: '18px'
          }}>
            ✅ Analysis Complete!
          </h4>
          
          {result.analysis && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <h5 style={{ 
                  color: '#00ff88',
                  fontSize: '16px',
                  margin: '0 0 10px 0'
                }}>
                  🔧 Key Skills:
                </h5>
                <div style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {result.analysis.skills?.slice(0, 10).map((skill, i) => (
                    <span key={i} style={{
                      padding: '6px 12px',
                      backgroundColor: '#222',
                      border: '1px solid #00ff88',
                      borderRadius: '20px',
                      fontSize: '14px',
                      color: '#ffffff',
                      fontWeight: '500'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h5 style={{ 
                  color: '#00ff88',
                  fontSize: '16px',
                  margin: '0 0 10px 0'
                }}>
                  💪 Strengths:
                </h5>
                <ul style={{ 
                  margin: 0,
                  paddingLeft: '20px',
                  color: '#ffffff',
                  lineHeight: '1.8'
                }}>
                  {result.analysis.strengths?.map((strength, i) => (
                    <li key={i} style={{ marginBottom: '8px', fontSize: '14px' }}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 style={{ 
                  color: '#ff8800',
                  fontSize: '16px',
                  margin: '0 0 10px 0'
                }}>
                  📈 Areas to Improve:
                </h5>
                <ul style={{ 
                  margin: 0,
                  paddingLeft: '20px',
                  color: '#ffffff',
                  lineHeight: '1.8'
                }}>
                  {result.analysis.gaps?.map((gap, i) => (
                    <li key={i} style={{ marginBottom: '8px', fontSize: '14px' }}>{gap}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
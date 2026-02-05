'use client'

import { useState, useEffect } from 'react'

export default function PreferencesForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  // Form fields
  const [targetRoles, setTargetRoles] = useState('')
  const [targetIndustries, setTargetIndustries] = useState('')
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')
  const [locationPreferences, setLocationPreferences] = useState('')
  const [workType, setWorkType] = useState('remote')

  // Load existing preferences on mount
  useEffect(() => {
    fetchPreferences()
  }, [])

  const fetchPreferences = async () => {
    try {
      const response = await fetch('/api/profile/preferences')
      const data = await response.json()
      
      if (data.profile) {
        // Pre-fill form with existing data
        setTargetRoles(data.profile.target_roles?.join(', ') || '')
        setTargetIndustries(data.profile.target_industries?.join(', ') || '')
        setSalaryMin(data.profile.salary_min || '')
        setSalaryMax(data.profile.salary_max || '')
        setLocationPreferences(data.profile.location_preferences?.join(', ') || '')
        setWorkType(data.profile.work_type || 'remote')
      }
    } catch (err) {
      console.error('Failed to load preferences:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    // Convert comma-separated strings to arrays
    const rolesArray = targetRoles.split(',').map(r => r.trim()).filter(Boolean)
    const industriesArray = targetIndustries.split(',').map(i => i.trim()).filter(Boolean)
    const locationsArray = locationPreferences.split(',').map(l => l.trim()).filter(Boolean)

    // Validation
    if (rolesArray.length === 0) {
      setError('Please enter at least one target role')
      setSaving(false)
      return
    }

    try {
      const response = await fetch('/api/profile/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRoles: rolesArray,
          targetIndustries: industriesArray,
          salaryMin: salaryMin ? parseInt(salaryMin) : null,
          salaryMax: salaryMax ? parseInt(salaryMax) : null,
          locationPreferences: locationsArray,
          workType
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save preferences')
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
        Loading preferences...
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Target Roles */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          color: '#00ff88',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Target Job Roles *
        </label>
        <input
          type="text"
          value={targetRoles}
          onChange={(e) => setTargetRoles(e.target.value)}
          placeholder="e.g., Frontend Developer, Full Stack Engineer"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '14px'
          }}
          required
        />
        <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#666' }}>
          Separate multiple roles with commas
        </p>
      </div>

      {/* Target Industries */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          color: '#00ff88',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Target Industries
        </label>
        <input
          type="text"
          value={targetIndustries}
          onChange={(e) => setTargetIndustries(e.target.value)}
          placeholder="e.g., Fintech, Healthcare, E-commerce"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '14px'
          }}
        />
        <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#666' }}>
          Separate multiple industries with commas
        </p>
      </div>

      {/* Salary Range */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#00ff88',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Minimum Salary (₹/year)
          </label>
          <input
            type="number"
            value={salaryMin}
            onChange={(e) => setSalaryMin(e.target.value)}
            placeholder="e.g., 800000"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '14px'
            }}
          />
        </div>
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#00ff88',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Maximum Salary (₹/year)
          </label>
          <input
            type="number"
            value={salaryMax}
            onChange={(e) => setSalaryMax(e.target.value)}
            placeholder="e.g., 1200000"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Location Preferences */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          color: '#00ff88',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Location Preferences
        </label>
        <input
          type="text"
          value={locationPreferences}
          onChange={(e) => setLocationPreferences(e.target.value)}
          placeholder="e.g., Hyderabad, Bangalore, Remote"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '14px'
          }}
        />
        <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#666' }}>
          Separate multiple locations with commas
        </p>
      </div>

      {/* Work Type */}
      <div style={{ marginBottom: '32px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          color: '#00ff88',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Work Type Preference
        </label>
        <select
          value={workType}
          onChange={(e) => setWorkType(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="onsite">Onsite</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={saving}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: saving ? '#333' : '#00ff88',
          color: saving ? '#888' : '#000',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: saving ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s'
        }}
      >
        {saving ? '⏳ Saving...' : '✅ Save Preferences'}
      </button>

      {/* Success Message */}
      {success && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#0a2a0a',
          border: '1px solid #00ff88',
          borderRadius: '8px',
          color: '#00ff88',
          textAlign: 'center'
        }}>
          ✅ Preferences saved successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#2a0000',
          border: '1px solid #ff4444',
          borderRadius: '8px',
          color: '#ff6666',
          textAlign: 'center'
        }}>
          ❌ {error}
        </div>
      )}
    </form>
  )
}
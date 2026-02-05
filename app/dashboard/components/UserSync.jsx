'use client'

import { useEffect } from 'react'

export default function UserSync() {
  useEffect(() => {
  
    fetch('/api/user/sync', { method: 'POST' })
      .then(res => res.json())
      .catch(err => console.error('User sync failed:', err))
  }, [])

  return null 
}
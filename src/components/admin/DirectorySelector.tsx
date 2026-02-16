'use client'

import React, { useEffect, useState } from 'react'
import { useField } from '@payloadcms/ui'

type SignUp = {
  id: string
  name: string
  email: string
}

const DirectorySelector: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string[]>({ path })
  const [signUps, setSignUps] = useState<SignUp[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSignUps = async () => {
      try {
        const res = await fetch('/api/sign-ups?limit=1000&sort=name')
        const data = await res.json()
        setSignUps(data.docs || [])
      } catch (error) {
        console.error('Error fetching sign-ups:', error)
      }
      setLoading(false)
    }
    fetchSignUps()
  }, [])

  const handleToggle = (id: string) => {
    const currentValue = value || []
    if (currentValue.includes(id)) {
      setValue(currentValue.filter((v) => v !== id))
    } else {
      setValue([...currentValue, id])
    }
  }

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading sign-ups...</div>
  }

  if (signUps.length === 0) {
    return <div style={{ padding: '20px' }}>No sign-ups found.</div>
  }

  const selectedIds = value || []

  return (
    <div style={{ marginTop: '10px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
            <th style={{ padding: '10px', width: '60px' }}>Show</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {signUps.map((signUp) => (
            <tr
              key={signUp.id}
              style={{
                borderBottom: '1px solid #eee',
                backgroundColor: selectedIds.includes(signUp.id) ? '#e8f5e9' : 'transparent',
              }}
            >
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(signUp.id)}
                  onChange={() => handleToggle(signUp.id)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
              </td>
              <td style={{ padding: '10px', fontWeight: selectedIds.includes(signUp.id) ? 'bold' : 'normal' }}>
                {signUp.name}
              </td>
              <td style={{ padding: '10px', color: '#666' }}>
                {signUp.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
        {selectedIds.length} of {signUps.length} selected for directory
      </div>
    </div>
  )
}

export default DirectorySelector

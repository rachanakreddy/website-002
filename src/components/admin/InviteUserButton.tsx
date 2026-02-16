'use client'

import React, { useState } from 'react'

const InviteUserButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; password?: string; message?: string } | null>(null)

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let password = ''
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    const tempPassword = generatePassword()

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          password: tempPassword,
        }),
      })

      if (res.ok) {
        setResult({
          success: true,
          password: tempPassword,
          message: `User created! Share these credentials:\n\nEmail: ${email}\nTemporary Password: ${tempPassword}\n\nThey should change their password after first login.`,
        })
        setEmail('')
        setName('')
      } else {
        const data = await res.json()
        setResult({
          success: false,
          message: data.errors?.[0]?.message || 'Failed to create user',
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'An error occurred',
      })
    }

    setIsLoading(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '16px',
        }}
      >
        + Invite User
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              width: '400px',
              maxWidth: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#333' }}>Invite New User</h2>

            {result ? (
              <div>
                <pre
                  style={{
                    backgroundColor: result.success ? '#e8f5e9' : '#ffebee',
                    padding: '12px',
                    borderRadius: '4px',
                    whiteSpace: 'pre-wrap',
                    fontSize: '14px',
                    color: '#333',
                  }}
                >
                  {result.message}
                </pre>
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                  {result.success && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`Email: ${email}\nPassword: ${result.password}`)
                      }}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Copy Credentials
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setResult(null)
                      if (result.success) setIsOpen(false)
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#666',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {result.success ? 'Close' : 'Try Again'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInvite}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', color: '#333' }}>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', color: '#333' }}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#0070f3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.7 : 1,
                    }}
                  >
                    {isLoading ? 'Creating...' : 'Create & Generate Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#666',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default InviteUserButton

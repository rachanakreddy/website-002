'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { EntryAnimation } from '@/components/animations'

export default function EntryPage() {
  const router = useRouter()
  const [animationComplete, setAnimationComplete] = useState(false)

  const handleAnimationComplete = () => {
    setAnimationComplete(true)
  }

  useEffect(() => {
    if (animationComplete) {
      // Small delay before redirect for smooth transition
      const timeout = setTimeout(() => {
        router.push('/home')
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [animationComplete, router])

  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center">
      <EntryAnimation
        className="w-full h-full max-w-2xl max-h-96"
        onComplete={handleAnimationComplete}
      />
    </main>
  )
}

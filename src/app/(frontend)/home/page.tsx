'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { HomeNavBar } from '@/components/navigation'

export default function HomePage() {
  const router = useRouter()

  // Prefetch other pages for faster navigation
  useEffect(() => {
    router.prefetch('/featured')
    router.prefetch('/directory')
  }, [router])

  const handleNavigate = (href: string) => {
    router.push(href)
  }

  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* Background - plaster texture */}
      <img
        src="/backgrounds/home-bg-plaster.png"
        alt=""
        className="absolute w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Big hand and small hand overlay */}
      <img
        src="/accents/big-hand-smallhand.png"
        alt=""
        className="absolute w-full h-full object-contain pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Plasterwall text overlay */}
      <img
        src="/accents/plasterwall-home-text.png"
        alt=""
        className="absolute w-full h-full object-contain pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <HomeNavBar onNavigate={handleNavigate} />
      </header>
    </main>
  )
}

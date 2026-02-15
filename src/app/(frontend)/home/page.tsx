'use client'

import React from 'react'
import { LogoAnimation } from '@/components/animations'
import { NavBar } from '@/components/navigation'

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6">
        <NavBar className="justify-center" />
      </header>

      {/* Main content - centered logo */}
      <div className="flex items-center justify-center min-h-screen">
        <LogoAnimation className="w-96 h-96" />
      </div>
    </main>
  )
}

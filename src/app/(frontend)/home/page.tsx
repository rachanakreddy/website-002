'use client'

import React from 'react'
import { NavBar } from '@/components/navigation'

export default function HomePage() {
  return (
    <main
      className="fixed inset-0 w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/backgrounds/home-bg.png)' }}
    >
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
        <NavBar className="justify-center" />
      </header>
    </main>
  )
}

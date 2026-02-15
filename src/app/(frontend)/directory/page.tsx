'use client'

import React from 'react'
import { NavBar } from '@/components/navigation'

export default function DirectoryPage() {
  return (
    <main className="relative min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6">
        <NavBar className="justify-center" />
      </header>

      {/* Main content */}
      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Directory</h1>
          <p className="text-gray-600">Directory content coming soon...</p>
        </div>
      </div>
    </main>
  )
}

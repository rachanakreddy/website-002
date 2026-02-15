'use client'

import React from 'react'
import { LogoAnimation } from '@/components/animations/LogoAnimation'
import { ClickToEnter } from '@/components/animations/ClickToEnter'

interface LandingContentProps {
  className?: string
}

export function LandingContent({ className = '' }: LandingContentProps) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-black ${className}`}>
      {/* Logo in center */}
      <LogoAnimation className="mb-16" />

      {/* Click to enter at bottom */}
      <div className="absolute bottom-16">
        <ClickToEnter />
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { LottiePlayer } from './LottiePlayer'

interface EntryAnimationProps {
  className?: string
  onComplete?: () => void
}

export function EntryAnimation({ className = '', onComplete }: EntryAnimationProps) {
  return (
    <LottiePlayer
      src="/assets/lottie/entry-animation.json"
      loop={false}
      autoplay={true}
      className={className}
      onComplete={onComplete}
    />
  )
}

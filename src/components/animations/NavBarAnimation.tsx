'use client'

import React from 'react'
import { LottiePlayer } from './LottiePlayer'

interface NavBarAnimationProps {
  className?: string
}

export function NavBarAnimation({ className = '' }: NavBarAnimationProps) {
  return (
    <LottiePlayer
      src="/assets/lottie/nav-bar.json"
      loop={true}
      autoplay={true}
      className={className}
    />
  )
}

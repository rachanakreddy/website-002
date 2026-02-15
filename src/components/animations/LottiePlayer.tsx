'use client'

import React from 'react'

interface LottiePlayerProps {
  src: string // Path to Lottie JSON file
  loop?: boolean
  autoplay?: boolean
  className?: string
  onComplete?: () => void
}

/**
 * Placeholder Lottie Player component.
 * Replace with actual Lottie library implementation (e.g., lottie-react or @lottiefiles/react-lottie-player)
 */
export function LottiePlayer({
  src,
  loop = true,
  autoplay = true,
  className = '',
  onComplete,
}: LottiePlayerProps) {
  // TODO: Install a Lottie library and implement actual animation
  // Example with lottie-react:
  // import Lottie from 'lottie-react'
  // import animationData from src
  // return <Lottie animationData={animationData} loop={loop} autoplay={autoplay} onComplete={onComplete} />

  return (
    <div
      className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
      data-lottie-src={src}
      data-loop={loop}
      data-autoplay={autoplay}
    >
      <span className="text-gray-500 text-sm">
        [Lottie: {src}]
      </span>
    </div>
  )
}

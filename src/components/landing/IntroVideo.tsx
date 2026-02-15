'use client'

import React, { useRef, useEffect } from 'react'

interface IntroVideoProps {
  src: string
  onEnded: () => void
  className?: string
}

export function IntroVideo({ src, onEnded, className = '' }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener('ended', onEnded)
      return () => video.removeEventListener('ended', onEnded)
    }
  }, [onEnded])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      className={`w-full h-full object-cover ${className}`}
    />
  )
}

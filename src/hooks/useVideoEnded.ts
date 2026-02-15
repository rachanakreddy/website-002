'use client'

import { useState, useCallback, RefObject } from 'react'

export function useVideoEnded(videoRef: RefObject<HTMLVideoElement | null>) {
  const [hasEnded, setHasEnded] = useState(false)

  const handleEnded = useCallback(() => {
    setHasEnded(true)
  }, [])

  return { hasEnded, handleEnded }
}

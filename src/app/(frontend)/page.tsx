'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()
  const [showWiggling, setShowWiggling] = useState(false)
  const [wigglingReady, setWigglingReady] = useState(false)
  const landingVideoRef = useRef<HTMLVideoElement>(null)
  const wigglingVideoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  // Preload and prepare wiggling video
  useEffect(() => {
    const wigglingVideo = wigglingVideoRef.current
    if (wigglingVideo) {
      wigglingVideo.load()

      const handleCanPlay = () => {
        setWigglingReady(true)
        wigglingVideo.currentTime = 0
      }

      wigglingVideo.addEventListener('canplaythrough', handleCanPlay)
      return () => wigglingVideo.removeEventListener('canplaythrough', handleCanPlay)
    }
  }, [])

  // Handle transition from landing to wiggling
  useEffect(() => {
    const landingVideo = landingVideoRef.current
    const wigglingVideo = wigglingVideoRef.current

    if (landingVideo && wigglingVideo) {
      const handleTimeUpdate = () => {
        if (landingVideo.duration - landingVideo.currentTime < 0.1 && wigglingReady) {
          wigglingVideo.play()
        }
      }

      const handleEnded = () => {
        setShowWiggling(true)
        if (wigglingVideo.paused) {
          wigglingVideo.play()
        }
      }

      landingVideo.addEventListener('timeupdate', handleTimeUpdate)
      landingVideo.addEventListener('ended', handleEnded)

      return () => {
        landingVideo.removeEventListener('timeupdate', handleTimeUpdate)
        landingVideo.removeEventListener('ended', handleEnded)
      }
    }
  }, [wigglingReady])

  // Load the button image for hit detection
  useEffect(() => {
    const img = new Image()
    img.src = '/videos/enter-button.png'
    img.onload = () => {
      imageRef.current = img
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
        }
      }
    }
  }, [])

  // Check if click is on a non-transparent pixel
  const handleClick = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    const canvas = canvasRef.current
    const img = e.currentTarget
    if (!canvas || !imageRef.current) return

    const rect = img.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const scaleX = imageRef.current.width / rect.width
    const scaleY = imageRef.current.height / rect.height
    const imgX = Math.floor(x * scaleX)
    const imgY = Math.floor(y * scaleY)

    const ctx = canvas.getContext('2d')
    if (ctx) {
      const pixel = ctx.getImageData(imgX, imgY, 1, 1).data
      const alpha = pixel[3]

      // Only navigate if clicking on non-transparent pixel (alpha > 10)
      if (alpha > 10) {
        router.push('/entry')
      }
    }
  }, [router])

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Hidden canvas for pixel detection */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Fingers wiggling video - bottom layer, preloaded and ready */}
      <video
        ref={wigglingVideoRef}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      >
        <source src="/videos/fingers-wiggling.mp4" type="video/mp4" />
      </video>

      {/* Enter button PNG - middle layer, only non-transparent pixels are clickable */}
      <img
        src="/videos/enter-button.png"
        alt="Enter"
        onClick={handleClick}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        style={{ zIndex: 2 }}
      />

      {/* Landing video - top layer, fades out to reveal wiggling + button */}
      <video
        ref={landingVideoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${showWiggling ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ zIndex: 3 }}
      >
        <source src="/videos/landing-page.mp4" type="video/mp4" />
      </video>
    </main>
  )
}

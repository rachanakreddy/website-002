'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()
  // Initialize mobile check - default to true to prevent video flash, then correct on mount
  const [isMobile, setIsMobile] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)
  const [showWiggling, setShowWiggling] = useState(true) // Start true, will be set false on desktop
  const [showEntry, setShowEntry] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const landingVideoRef = useRef<HTMLVideoElement>(null)
  const wigglingVideoRef = useRef<HTMLVideoElement>(null)
  const entryVideoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768
    const mobile = checkMobile()
    setIsMobile(mobile)
    setIsHydrated(true)

    if (mobile) {
      // On mobile, skip landing video and show interactive state immediately
      setShowWiggling(true)
      setTimeout(() => {
        wigglingVideoRef.current?.play().catch(console.error)
      }, 100)
    } else {
      // On desktop, show landing video first
      setShowWiggling(false)
    }
  }, [])

  // Handle transition from landing to wiggling (desktop only)
  useEffect(() => {
    if (!isHydrated || isMobile) return

    const landingVideo = landingVideoRef.current
    const wigglingVideo = wigglingVideoRef.current

    if (landingVideo && wigglingVideo) {
      // Explicitly play landing video on mount
      landingVideo.play().catch(console.error)

      const handleEnded = () => {
        // Transition directly from landing to wiggling - no loading
        setShowWiggling(true)
        // Ensure wiggling video plays
        wigglingVideo.currentTime = 0
        wigglingVideo.play().catch(console.error)
      }

      landingVideo.addEventListener('ended', handleEnded)

      return () => {
        landingVideo.removeEventListener('ended', handleEnded)
      }
    }
  }, [isMobile, isHydrated])

  // Prefetch home page for seamless transition
  useEffect(() => {
    router.prefetch('/home')
  }, [router])

  // Handle entry video - navigate slightly before end for seamless transition
  useEffect(() => {
    const entryVideo = entryVideoRef.current
    if (entryVideo) {
      const handleTimeUpdate = () => {
        // Navigate 150ms before video ends for seamless transition
        if (entryVideo.duration - entryVideo.currentTime <= 0.15) {
          entryVideo.removeEventListener('timeupdate', handleTimeUpdate)
          router.push('/home')
        }
      }

      entryVideo.addEventListener('timeupdate', handleTimeUpdate)
      return () => entryVideo.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [router])

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

  // Trigger entry sequence
  const triggerEntry = useCallback(() => {
    if (showEntry || isLoading) return // Prevent double trigger

    // Show loading when user clicks enter
    setIsLoading(true)
    wigglingVideoRef.current?.pause()

    // Brief loading, then play entry video
    setTimeout(() => {
      setShowEntry(true)
      setIsLoading(false)
      entryVideoRef.current?.play().catch(console.error)
    }, 500)
  }, [showEntry, isLoading])

  // Check if click/touch is on a non-transparent pixel
  const handleInteraction = useCallback((clientX: number, clientY: number, target: HTMLImageElement) => {
    const canvas = canvasRef.current
    if (!canvas || !imageRef.current) {
      // Fallback: if canvas not ready, trigger entry anyway
      triggerEntry()
      return
    }

    const rect = target.getBoundingClientRect()
    const naturalWidth = imageRef.current.width
    const naturalHeight = imageRef.current.height

    // Calculate the rendered size with object-contain
    const containerAspect = rect.width / rect.height
    const imageAspect = naturalWidth / naturalHeight

    let renderedWidth, renderedHeight, offsetX, offsetY

    if (containerAspect > imageAspect) {
      // Container is wider - image is constrained by height
      renderedHeight = rect.height
      renderedWidth = rect.height * imageAspect
      offsetX = (rect.width - renderedWidth) / 2
      offsetY = 0
    } else {
      // Container is taller - image is constrained by width
      renderedWidth = rect.width
      renderedHeight = rect.width / imageAspect
      offsetX = 0
      offsetY = (rect.height - renderedHeight) / 2
    }

    // Get click position relative to the container
    const clickX = clientX - rect.left
    const clickY = clientY - rect.top

    // Check if click is within the rendered image area
    if (clickX < offsetX || clickX > offsetX + renderedWidth ||
        clickY < offsetY || clickY > offsetY + renderedHeight) {
      return // Click is outside the image
    }

    // Map click to image pixel coordinates
    const imgX = Math.floor((clickX - offsetX) * (naturalWidth / renderedWidth))
    const imgY = Math.floor((clickY - offsetY) * (naturalHeight / renderedHeight))

    const ctx = canvas.getContext('2d')
    if (ctx) {
      try {
        const pixel = ctx.getImageData(imgX, imgY, 1, 1).data
        const alpha = pixel[3]

        // Only play entry video if clicking on non-transparent pixel (alpha > 10)
        if (alpha > 10) {
          triggerEntry()
        }
      } catch (e) {
        // Fallback on error
        triggerEntry()
      }
    }
  }, [triggerEntry])

  const handleClick = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    handleInteraction(e.clientX, e.clientY, e.currentTarget)
  }, [handleInteraction])

  const handleTouch = useCallback((e: React.TouchEvent<HTMLImageElement>) => {
    e.preventDefault()
    const touch = e.touches[0]
    if (touch) {
      handleInteraction(touch.clientX, touch.clientY, e.currentTarget)
    }
  }, [handleInteraction])

  return (
    <main className="fixed inset-0 w-screen h-screen bg-black overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
          <div className="text-white text-xl" style={{ fontFamily: 'lores-12, monospace' }}>
            loading...
          </div>
        </div>
      )}

      {/* Hidden canvas for pixel detection */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Video container - maintains aspect ratio and centers content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Landing background image - bottom layer */}
        <img
          src="/backgrounds/landing-bg.png"
          alt=""
          className="absolute w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />

        {/* Fingers wiggling video - on top of background (WebM with alpha transparency) */}
        <video
          ref={wigglingVideoRef}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute w-full h-full object-cover"
          style={{
            zIndex: 1,
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          <source src="/videos/fingers-wiggling.webm" type="video/webm" />
          <source src="/videos/fingers-wiggling.mp4" type="video/mp4" />
        </video>

        {/* Plasterwall text - on top of wiggling video */}
        <img
          src="/accents/plaster-wall-text-1.png"
          alt=""
          className="absolute w-full h-full object-contain pointer-events-none"
          style={{ zIndex: 2, transform: 'scale(1.01)' }}
        />

        {/* Enter button PNG - clickable layer */}
        <img
          src="/videos/enter-button.png"
          alt="Enter"
          onClick={handleClick}
          onTouchStart={handleTouch}
          draggable={false}
          className="absolute w-full h-full object-contain cursor-pointer select-none touch-none"
          style={{ zIndex: 3, WebkitTapHighlightColor: 'transparent' }}
        />

        {/* Landing video - top layer, fades out to reveal everything below (desktop only) */}
        {isHydrated && !isMobile && (
          <video
            ref={landingVideoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            className={`absolute w-full h-full object-cover transition-opacity duration-150 ease-out ${showWiggling ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{
              zIndex: 4,
              willChange: 'opacity, transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          >
            <source src="/videos/landing-page.mp4" type="video/mp4" />
          </video>
        )}

        {/* Entry video - plays after clicking enter, then navigates to /home */}
        <video
          ref={entryVideoRef}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute w-full h-full object-cover transition-opacity duration-200 ease-out ${showEntry ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{
            zIndex: 10,
            willChange: 'opacity, transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          <source src="/videos/entry.mp4" type="video/mp4" />
        </video>
      </div>
    </main>
  )
}

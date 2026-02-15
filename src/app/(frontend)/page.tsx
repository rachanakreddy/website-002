'use client'

import React from 'react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/welcome_page.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Click to enter text */}
      <Link
        href="/entry"
        className="absolute inset-0 flex items-center justify-center cursor-pointer group"
      >
        <span className="text-white text-2xl tracking-[0.3em] uppercase font-light opacity-80 group-hover:opacity-100 transition-all group-hover:tracking-[0.4em] animate-pulse">
          Click to Enter
        </span>
      </Link>
    </main>
  )
}

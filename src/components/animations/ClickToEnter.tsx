'use client'

import React from 'react'
import Link from 'next/link'

interface ClickToEnterProps {
  className?: string
}

export function ClickToEnter({ className = '' }: ClickToEnterProps) {
  return (
    <Link
      href="/entry"
      className={`group cursor-pointer ${className}`}
    >
      <div className="flex flex-col items-center gap-2 animate-bounce">
        {/* Animated arrow */}
        <svg
          className="w-6 h-6 text-white opacity-80 group-hover:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>

        {/* Text */}
        <span className="text-white text-lg tracking-[0.3em] uppercase font-light opacity-80 group-hover:opacity-100 transition-all group-hover:tracking-[0.4em]">
          Click to Enter
        </span>
      </div>
    </Link>
  )
}

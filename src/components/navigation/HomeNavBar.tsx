'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export function HomeNavBar() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    if (href === '/home') {
      // No loading for home, already there
      return
    }
    setIsLoading(true)
    router.push(href)
  }

  return (
    <>
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
          <div className="text-white text-xl" style={{ fontFamily: 'lores-12, monospace' }}>
            loading...
          </div>
        </div>
      )}

      <div className="relative w-full">
        {/* Nav bar image */}
        <div
          className="relative w-full"
          style={{
            transform: 'scale(1.08)',
            transformOrigin: 'top center',
          }}
        >
          <img
            src="/accents/navbar.png"
            alt=""
            className="w-full h-auto"
            style={{ display: 'block' }}
          />

          {/* Clickable areas positioned over the text */}
          {/* These are invisible links that sit on top of each word */}
          <a
            href="/home"
            onClick={(e) => handleNavClick(e, '/home')}
            className="absolute"
            style={{
              left: '5%',
              top: '0',
              width: '18%',
              height: '100%',
            }}
            aria-label="Home"
          />
          <a
            href="/featured"
            onClick={(e) => handleNavClick(e, '/featured')}
            className="absolute"
            style={{
              left: '28%',
              top: '0',
              width: '28%',
              height: '100%',
            }}
            aria-label="Featured"
          />
          <a
            href="/directory"
            onClick={(e) => handleNavClick(e, '/directory')}
            className="absolute"
            style={{
              left: '62%',
              top: '0',
              width: '33%',
              height: '100%',
            }}
            aria-label="Directory"
          />
        </div>
      </div>
    </>
  )
}

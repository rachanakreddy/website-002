'use client'

import React from 'react'

type Props = {
  onNavigate?: (href: string) => void
}

export function HomeNavBar({ onNavigate }: Props) {
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    if (href === '/home') {
      return
    }
    onNavigate?.(href)
  }

  return (
    <div className="relative w-full">
      {/* Nav bar image */}
      <div className="relative w-full">
        <img
          src="/accents/navbar.png"
          alt=""
          className="w-full h-auto"
          style={{ display: 'block' }}
        />

        {/* Clickable areas positioned over the text */}
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
  )
}

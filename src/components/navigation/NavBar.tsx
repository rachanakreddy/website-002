'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

interface NavBarProps {
  className?: string
  variant?: 'default' | 'home'
}

const navItems = [
  { href: '/home', label: 'home' },
  { href: '/featured', label: 'featured' },
  { href: '/directory', label: 'directory' },
]

export function NavBar({ className = '', variant = 'default' }: NavBarProps) {
  const pathname = usePathname()

  const isHome = variant === 'home'

  return (
    <nav
      className={cn('flex items-center', className)}
      style={{
        fontFamily: 'lores-12, monospace',
        ...(isHome && {
          fontSize: '48px',
          transform: 'scaleY(1.21)',
          transformOrigin: 'top center',
          color: 'white',
          textTransform: 'uppercase' as const,
        }),
      }}
    >
      {navItems.map((item, index) => (
        <React.Fragment key={item.href}>
          <Link
            href={item.href}
            className={cn(
              'transition-colors hover:opacity-70',
              !isHome && 'text-base md:text-lg',
              pathname === item.href ? 'underline' : ''
            )}
          >
            {item.label}
          </Link>
          {index < navItems.length - 1 && (
            <span className={cn(!isHome && 'mx-2 md:mx-3', isHome && 'mx-4')}>&gt;</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

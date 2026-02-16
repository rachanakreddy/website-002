'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

interface NavBarProps {
  className?: string
}

const navItems = [
  { href: '/home', label: 'home' },
  { href: '/featured', label: 'featured' },
  { href: '/directory', label: 'directory' },
]

export function NavBar({ className = '' }: NavBarProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn('flex items-center', className)}
      style={{ fontFamily: 'lores-12, monospace' }}
    >
      {navItems.map((item, index) => (
        <React.Fragment key={item.href}>
          <Link
            href={item.href}
            className={cn(
              'text-base md:text-lg transition-colors hover:opacity-70',
              pathname === item.href ? 'underline' : ''
            )}
          >
            {item.label}
          </Link>
          {index < navItems.length - 1 && (
            <span className="mx-2 md:mx-3">&gt;</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

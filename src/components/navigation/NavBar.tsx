'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

interface NavBarProps {
  className?: string
}

const navItems = [
  { href: '/home', label: 'Home' },
  { href: '/featured', label: 'Featured' },
  { href: '/directory', label: 'Directory' },
]

export function NavBar({ className = '' }: NavBarProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center gap-8', className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-lg transition-colors hover:text-gray-600',
            pathname === item.href ? 'font-bold' : 'font-normal'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

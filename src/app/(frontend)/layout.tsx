import type { Metadata } from 'next'

import { cn } from '@/lib/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link rel="stylesheet" href="https://use.typekit.net/zzs7drm.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Website',
  description: 'Welcome to the website',
}

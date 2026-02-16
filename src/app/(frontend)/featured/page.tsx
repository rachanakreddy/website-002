import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Film, Media } from '@/payload-types'
import FeaturedPageClient from './page.client'
import { NavBar } from '@/components/navigation'

// Disable caching to always fetch fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getFeaturedFilm() {
  const payload = await getPayload({ config: configPromise })

  const featuredFilmGlobal = await payload.findGlobal({
    slug: 'featured-film',
    depth: 3, // Get nested media files
  })

  // Handle case where film might be a relationship ID or populated object
  const filmData = featuredFilmGlobal?.film

  // If it's just an ID, fetch the full film
  if (typeof filmData === 'string' || typeof filmData === 'number') {
    const film = await payload.findByID({
      collection: 'films',
      id: filmData,
      depth: 2,
      draft: true, // Include drafts
    })
    return film as Film | null
  }

  return filmData as Film | null
}

export default async function FeaturedPage() {
  const film = await getFeaturedFilm()

  if (!film) {
    return (
      <main
        className="w-full bg-no-repeat"
        style={{
          backgroundImage: 'url(/backgrounds/featured-bg.png)',
          backgroundSize: '100% auto',
          backgroundPosition: 'bottom center',
          minHeight: '100vh',
          height: 'calc(100vw * 2200 / 2360)',
        }}
      >
        <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
          <NavBar className="justify-center" />
        </header>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No Featured Film</h1>
            <p className="text-gray-600">Please select a featured film in the admin panel.</p>
          </div>
        </div>
      </main>
    )
  }

  // Extract media URLs
  const filmMedia = film.filmMedia as Media
  const videoUrl = filmMedia?.url || ''
  const image1 = film.optionalMedia?.image1 as Media | null
  const image2 = film.optionalMedia?.image2 as Media | null

  return (
    <FeaturedPageClient
      title={film.title || ''}
      synopsis={film.synopsis || ''}
      videoUrl={videoUrl}
      longInformation={film.longInformation}
      image1Url={image1?.url ?? undefined}
      image2Url={image2?.url ?? undefined}
      qa1={film.qa1 || { question: '', answer: '' }}
      qa2={film.qa2 || { question: '', answer: '' }}
      qa3={film.qa3 || { question: '', answer: '' }}
    />
  )
}

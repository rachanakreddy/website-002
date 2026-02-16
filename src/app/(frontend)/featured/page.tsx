import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Film, Media } from '@/payload-types'
import FeaturedPageClient from './page.client'

async function getFeaturedFilm() {
  const payload = await getPayload({ config: configPromise })

  const featuredFilmGlobal = await payload.findGlobal({
    slug: 'featured-film',
    depth: 2, // Get nested media files
  })

  return featuredFilmGlobal?.film as Film | null
}

export default async function FeaturedPage() {
  const film = await getFeaturedFilm()

  if (!film) {
    return (
      <main className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Featured Film</h1>
          <p className="text-gray-600">Please select a featured film in the admin panel.</p>
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
      title={film.title}
      synopsis={film.synopsis}
      videoUrl={videoUrl}
      longInformation={film.longInformation}
      image1Url={image1?.url}
      image2Url={image2?.url}
      qa1={film.qa1}
      qa2={film.qa2}
      qa3={film.qa3}
    />
  )
}

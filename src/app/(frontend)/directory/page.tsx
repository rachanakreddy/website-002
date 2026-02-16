import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NavBar } from '@/components/navigation'

async function getDirectoryMembers() {
  const payload = await getPayload({ config: configPromise })

  const signUps = await payload.find({
    collection: 'sign-ups',
    where: {
      inDirectory: {
        equals: true,
      },
    },
    sort: 'name',
    limit: 1000,
  })

  return signUps.docs
}

export default async function DirectoryPage() {
  const members = await getDirectoryMembers()

  return (
    <main className="relative min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6">
        <NavBar className="justify-center" />
      </header>

      {/* Main content */}
      <div className="pt-24 pb-12 px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Directory</h1>

          {members.length === 0 ? (
            <p className="text-center text-gray-600">No directory members yet.</p>
          ) : (
            <div className="grid gap-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="border border-gray-300 p-4 bg-white/50"
                >
                  <h2 className="font-medium text-lg">{member.name}</h2>
                  <p className="text-gray-600 text-sm">{member.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NavBar } from '@/components/navigation'

async function getDirectoryMembers() {
  const payload = await getPayload({ config: configPromise })

  const directory = await payload.findGlobal({
    slug: 'directory',
    depth: 1,
  })

  // Return the members array with populated sign-up data
  return (directory?.members as any[]) || []
}

export default async function DirectoryPage() {
  const members = await getDirectoryMembers()

  return (
    <main
      className="fixed inset-0 w-screen h-screen bg-cover bg-no-repeat overflow-hidden"
      style={{ backgroundImage: 'url(/backgrounds/directory-bg.png)', backgroundPosition: '70% center' }}
    >
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
        <NavBar className="justify-center" />
      </header>

      {/* Left column */}
      <div className="absolute left-6 md:left-36 lg:left-48 top-20 md:top-24 bottom-8 w-64 md:w-80 flex flex-col">
        {/* Header - "ref" in lores-12 bold */}
        <h2
          className="mb-6"
          style={{
            fontFamily: 'lores-12, monospace',
            fontWeight: 'bold',
            fontSize: '129px',
            color: '#3d2b1f',
          }}
        >
          ref
        </h2>

        {/* Scrollable content - pushed down on mobile */}
        <div className="flex-1 overflow-y-auto pr-4 mt-[100px] md:mt-0">
          {members.length === 0 ? (
            <p className="text-gray-600">No directory members yet.</p>
          ) : (
            <div className="space-y-4">
              {members.map((member) => (
                <div key={member.id}>
                  <h3
                    className="text-left"
                    style={{
                      fontFamily: 'lores-12, monospace',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  >
                    {member.name}
                  </h3>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-right block hover:underline text-black md:text-[#999]"
                    style={{
                      fontFamily: '"Good Times", sans-serif',
                      textTransform: 'uppercase',
                      fontSize: '12px',
                    }}
                  >
                    {member.email}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

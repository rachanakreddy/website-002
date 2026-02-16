import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const FeaturedFilm: GlobalConfig = {
  slug: 'featured-film',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    description: 'Select the film to be featured on the Featured page.',
  },
  fields: [
    {
      name: 'film',
      label: 'Featured Film',
      type: 'relationship',
      relationTo: 'films',
      required: true,
      admin: {
        description: 'Select a film from the Films collection to feature.',
      },
    },
  ],
}

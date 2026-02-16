import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Directory: GlobalConfig = {
  slug: 'directory',
  label: 'Directory',
  admin: {
    description: 'Select sign-ups to display on the public directory page.',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'members',
      label: 'Directory Members',
      type: 'relationship',
      relationTo: 'sign-ups',
      hasMany: true,
      admin: {
        description: 'Search and select sign-ups to add to the directory.',
        sortOptions: 'name',
      },
    },
  ],
}

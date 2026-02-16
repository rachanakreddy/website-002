import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const SignUps: CollectionConfig = {
  slug: 'sign-ups',
  access: {
    create: anyone, // Allow public sign-ups
    delete: authenticated,
    read: anyone, // Needed for directory page
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'inDirectory', 'createdAt'],
    listSearchableFields: ['name', 'email'],
  },
  fields: [
    {
      name: 'inDirectory',
      label: 'Show in Directory',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Check to display this person on the public directory page.',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'whereDidYouHear',
      label: 'Where did you hear about us?',
      type: 'text',
    },
  ],
  timestamps: true,
}

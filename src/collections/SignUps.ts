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
    defaultColumns: ['name', 'email', 'whereDidYouHear', 'inDirectory', 'createdAt'],
  },
  fields: [
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
    {
      name: 'inDirectory',
      label: 'In Directory',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'If checked, this person\'s name and email will be displayed on the directory page.',
      },
    },
  ],
  timestamps: true,
}

import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Films: CollectionConfig = {
  slug: 'films',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'synopsis', 'createdAt'],
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'filmMedia',
      label: 'Film Video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload the film video file (MP4 recommended for streaming).',
      },
    },
    {
      name: 'synopsis',
      label: 'Film Synopsis',
      type: 'textarea',
      required: true,
      admin: {
        description: 'A short synopsis of the film.',
      },
    },
    {
      name: 'longInformation',
      label: 'Long Information',
      type: 'richText',
      admin: {
        description: 'Detailed information about the film (displayed in right column on featured page).',
      },
    },
    {
      type: 'group',
      name: 'optionalMedia',
      label: 'Optional Media',
      admin: {
        description: 'Two optional images to display on the featured page.',
      },
      fields: [
        {
          name: 'image1',
          label: 'Image 1',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'image2',
          label: 'Image 2',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      type: 'group',
      name: 'qa1',
      label: 'Q&A 1',
      fields: [
        {
          name: 'question',
          type: 'text',
        },
        {
          name: 'answer',
          type: 'textarea',
        },
      ],
    },
    {
      type: 'group',
      name: 'qa2',
      label: 'Q&A 2',
      fields: [
        {
          name: 'question',
          type: 'text',
        },
        {
          name: 'answer',
          type: 'textarea',
        },
      ],
    },
    {
      type: 'group',
      name: 'qa3',
      label: 'Q&A 3',
      fields: [
        {
          name: 'question',
          type: 'text',
        },
        {
          name: 'answer',
          type: 'textarea',
        },
      ],
    },
  ],
  timestamps: true,
}

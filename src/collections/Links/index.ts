import type { CollectionConfig } from 'payload'

import { followRedirects } from './hooks/followRedirects'
import { revalidateOnChange } from './hooks/revalidateOnChange'
import { revalidateOnDelete } from './hooks/revalidateOnDelete'
import { urlValidation } from './urlValidation'

export const Links: CollectionConfig = {
  slug: 'links',
  access: {
    create: ({ req }) =>
      Boolean(req.user) || req.headers.get('x-api-key') === (process.env.API_KEY || ''),
    read: ({ req }) =>
      Boolean(req.user) || req.headers.get('x-api-key') === (process.env.API_KEY || ''),
  },
  hooks: {
    afterChange: [revalidateOnChange],
    afterDelete: [revalidateOnDelete],
  },
  fields: [
    {
      type: 'text',
      name: 'url',
      unique: true,
      label: 'URL',
      required: true,
      hasMany: false,
      validate: urlValidation,
      hooks: {
        beforeChange: [followRedirects],
      },
    },
    {
      type: 'checkbox',
      name: 'approved',
      defaultValue: false,
    },
  ],
  custom: {
    recaptcha: [
      {
        name: 'create',
        action: 'trimite',
        // @ts-expect-error
        skip: ({ req: { user } }) => Boolean(user),
      },
    ],
  },
}

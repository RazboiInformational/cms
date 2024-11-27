import type { CollectionConfig } from 'payload'
import { text } from 'payload/shared'

export const Links: CollectionConfig = {
  slug: 'links',
  access: {
    create: ({ req }) =>
      Boolean(req.user) || req.headers.get('x-api-key') === (process.env.API_KEY || ''),
  },
  fields: [
    {
      type: 'text',
      name: 'url',
      unique: true,
      label: 'URL',
      required: true,
      hasMany: false,
      validate: (value, options) => {
        if (value) {
          if (
            !/^.*https:\/\/(?:m|www|vm)?\.?tiktok\.com\/((?:.*\b(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+))|\w+)/.test(
              value,
            )
          ) {
            return 'The URL must be from TikTok.'
          }
        }

        return text(value, options)
      },
      hooks: {
        beforeChange: [
          async ({ value }) => {
            const res = await fetch(value, {
              redirect: 'follow',
              method: 'GET',
            })

            const url = new URL(res.url)
            return url.origin + url.pathname
          },
        ],
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

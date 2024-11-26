import type { CollectionConfig } from 'payload'
import { text } from 'payload/shared'

export const Links: CollectionConfig = {
  slug: 'links',
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
    },
    {
      type: 'checkbox',
      name: 'approved',
      defaultValue: false,
    },
  ],
}

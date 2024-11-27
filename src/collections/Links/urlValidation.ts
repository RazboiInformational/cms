import type { TextFieldSingleValidation } from 'payload'
import { text } from 'payload/shared'

export const urlValidation: TextFieldSingleValidation = (value, options) => {
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
}

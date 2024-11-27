import type { CollectionAfterDeleteHook } from 'payload'

import { revalidateTagOnFrontEnd } from 'src/utils/revalidateTagOnFrontEnd'

export const revalidateOnDelete: CollectionAfterDeleteHook = async () => {
  await revalidateTagOnFrontEnd('links')
}

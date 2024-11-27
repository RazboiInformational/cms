import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTagOnFrontEnd } from 'src/utils/revalidateTagOnFrontEnd'

export const revalidateOnChange: CollectionAfterChangeHook = async ({
  operation,
  doc,
  previousDoc,
}) => {
  if (operation === 'create' && doc.approved) {
    await revalidateTagOnFrontEnd('links')
  } else if (operation === 'update' && previousDoc.approved !== doc.approved) {
    await revalidateTagOnFrontEnd('links')
  }
}

import type { CollectionAfterChangeHook } from 'payload'

export const syncWithTikTok: CollectionAfterChangeHook = async ({
  operation,
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (
    (operation === 'create' && doc.approved) ||
    (operation === 'update' && !previousDoc.approved && doc.approved)
  ) {
    await payload.jobs.queue({
      workflow: 'syncWithTikTok',
      input: {
        id: doc.id,
      },
    })
  }
}

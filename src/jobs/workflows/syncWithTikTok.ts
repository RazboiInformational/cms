import type { WorkflowHandler } from 'payload'

export const syncWithTikTokHandler: WorkflowHandler<'syncWithTikTok'> = async ({
  job,
  tasks,
  req,
}) => {
  const link = await req.payload.findByID({
    collection: 'links',
    id: job.input.id,
  })

  const { likes, comments, shares, views, statusCode } = await tasks.crawlTikTok('1', {
    input: {
      url: link.url,
    },
  })

  if (statusCode === 0) {
    await req.payload.update({
      collection: 'links',
      id: link.id,
      data: {
        likes,
        comments,
        shares,
        views,
      },
    })
  } else if (statusCode === 10204) {
    await req.payload.delete({
      collection: 'links',
      id: link.id,
    })
  }
}

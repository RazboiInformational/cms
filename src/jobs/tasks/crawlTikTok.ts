import type { TaskHandler } from 'payload'

const SCRIPT_START = '<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application/json">'

export const crawlTikTokHandler: TaskHandler<'crawlTikTok'> = async ({ input }) => {
  const { url } = input

  try {
    const res = await fetch(url)
    const body = await res.text()

    const start = body.indexOf(SCRIPT_START)
    const end = body.indexOf('</script>', start)

    const json = body.substring(start + SCRIPT_START.length, end)
    const object = JSON.parse(json)

    if (object['__DEFAULT_SCOPE__']['webapp.video-detail']['statusCode'] !== 0) {
      return {
        output: {
          statusCode: object['__DEFAULT_SCOPE__']['webapp.video-detail']['statusCode'],
        },
      }
    }

    const stats =
      object['__DEFAULT_SCOPE__']['webapp.video-detail']['itemInfo']['itemStruct']['stats']

    return {
      output: {
        statusCode: 0,
        likes: stats['diggCount'],
        comments: stats['commentCount'],
        shares: stats['shareCount'],
        views: stats['playCount'],
      },
    }
  } catch (err) {
    console.error(err)
    return {
      output: {
        statusCode: -1,
      },
    }
  }
}

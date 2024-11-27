import path from 'path'
import type { JobsConfig } from 'payload'
import { fileURLToPath } from 'url'
import { adminAccess } from './collections/accesses/admin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const jobs: JobsConfig = {
  access: {
    run: (args): boolean => {
      const { req } = args
      if (adminAccess(args)) return true

      const authHeader = req.headers.get('authorization')
      return authHeader === `Bearer ${process.env.CRON_SECRET}`
    },
  },
  tasks: [
    {
      retries: 3,
      slug: 'crawlTikTok',
      inputSchema: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      outputSchema: [
        {
          name: 'statusCode',
          type: 'number',
          required: true,
        },
        {
          name: 'views',
          type: 'number',
        },
        {
          name: 'likes',
          type: 'number',
        },
        {
          name: 'comments',
          type: 'number',
        },
        {
          name: 'shares',
          type: 'number',
        },
      ],
      handler: path.resolve(dirname, 'jobs/tasks/crawlTikTok.ts') + '#crawlTikTokHandler',
    },
  ],
  workflows: [
    {
      slug: 'syncWithTikTok',
      inputSchema: [
        {
          name: 'id',
          type: 'number',
          required: true,
        },
      ],
      handler: path.resolve(dirname, 'jobs/workflows/syncWithTikTok.ts') + '#syncWithTikTokHandler',
    },
  ],
}

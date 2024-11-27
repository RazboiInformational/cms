export async function revalidateTagOnFrontEnd(tag: string) {
  if (process.env.API_KEY && process.env.FRONTEND_BASE) {
    try {
      const url = new URL('/api/revalidate-tag', process.env.FRONTEND_BASE)

      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          tag: 'links',
        }),
        headers: {
          'x-api-key': process.env.API_KEY,
        },
      })
    } catch (err) {
      console.error(err);
    }
  }
}

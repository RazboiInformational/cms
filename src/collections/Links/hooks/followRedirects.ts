import type { FieldHook } from 'payload'

export const followRedirects: FieldHook = async ({ value }) => {
  const res = await fetch(value, {
    redirect: 'follow',
    method: 'GET',
  })

  const url = new URL(res.url)
  return url.origin + url.pathname
}

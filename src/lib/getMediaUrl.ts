import { getClientSideURL } from './getURL'

export function getMediaUrl(url: string | null | undefined, cacheTag?: string): string {
  if (!url) return ''

  // If it's already an absolute URL, return it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // Construct the full URL
  const baseUrl = getClientSideURL()
  const fullUrl = `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`

  // Add cache busting if cacheTag provided
  if (cacheTag) {
    const separator = fullUrl.includes('?') ? '&' : '?'
    return `${fullUrl}${separator}v=${cacheTag}`
  }

  return fullUrl
}

/** Converts a CMS video URL into a privacy-friendly embed URL, or null if unsupported. */
export function toEmbedUrl(provider: 'youtube' | 'vimeo' | 'file', url: string): string | null {
  if (provider === 'file') return /^(https:\/\/|\/(?!\/))/.test(url) ? url : null
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return null
  }
  if (provider === 'youtube') {
    const host = parsed.hostname.replace(/^www\./, '')
    let id: string | null = null
    if (host === 'youtu.be') id = parsed.pathname.slice(1)
    else if (host === 'youtube.com' || host === 'm.youtube.com') {
      id = parsed.searchParams.get('v') ?? parsed.pathname.split('/').filter(Boolean).pop() ?? null
    }
    return id && /^[\w-]{6,20}$/.test(id) ? 'https://www.youtube-nocookie.com/embed/' + id : null
  }
  const vimeoId = parsed.hostname.endsWith('vimeo.com')
    ? parsed.pathname.split('/').filter(Boolean).pop()
    : null
  return vimeoId && /^\d+$/.test(vimeoId)
    ? 'https://player.vimeo.com/video/' + vimeoId + '?dnt=1'
    : null
}

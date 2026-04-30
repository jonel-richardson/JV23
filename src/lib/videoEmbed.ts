export type VideoPlatform = 'vimeo' | 'youtube'

const VIMEO_PATTERNS = [
  /(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/i,
]

const YOUTUBE_PATTERNS = [
  /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i,
  /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i,
  /youtu\.be\/([a-zA-Z0-9_-]{11})/i,
]

function matchFirst(patterns: readonly RegExp[], url: string): string | null {
  for (const pattern of patterns) {
    const m = pattern.exec(url)
    if (m && m[1]) return m[1]
  }
  return null
}

export function getPlatform(videoUrl: string | undefined | null): VideoPlatform | null {
  if (!videoUrl) return null
  if (matchFirst(VIMEO_PATTERNS, videoUrl)) return 'vimeo'
  if (matchFirst(YOUTUBE_PATTERNS, videoUrl)) return 'youtube'
  return null
}

export function getThumbnailUrl(videoUrl: string | undefined | null): string | null {
  if (!videoUrl) return null
  const vimeoId = matchFirst(VIMEO_PATTERNS, videoUrl)
  if (vimeoId) return `https://vumbnail.com/${vimeoId}.jpg`
  const youtubeId = matchFirst(YOUTUBE_PATTERNS, videoUrl)
  if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  return null
}

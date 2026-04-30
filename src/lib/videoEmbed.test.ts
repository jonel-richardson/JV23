import { describe, expect, it } from 'vitest'
import { getPlatform, getThumbnailUrl } from './videoEmbed'

describe('getPlatform', () => {
  it('detects vimeo URLs', () => {
    expect(getPlatform('https://vimeo.com/123456789')).toBe('vimeo')
    expect(getPlatform('https://player.vimeo.com/video/123456789')).toBe('vimeo')
  })

  it('detects youtube URLs', () => {
    expect(getPlatform('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('youtube')
    expect(getPlatform('https://youtu.be/dQw4w9WgXcQ')).toBe('youtube')
    expect(getPlatform('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('youtube')
  })

  it('returns null for unknown platforms', () => {
    expect(getPlatform('https://example.com/video.mp4')).toBeNull()
    expect(getPlatform('https://dailymotion.com/video/x123')).toBeNull()
  })

  it('returns null for malformed input', () => {
    expect(getPlatform('not a url')).toBeNull()
    expect(getPlatform('')).toBeNull()
    expect(getPlatform(null)).toBeNull()
    expect(getPlatform(undefined)).toBeNull()
  })
})

describe('getThumbnailUrl', () => {
  it('returns vumbnail URL for vimeo', () => {
    expect(getThumbnailUrl('https://vimeo.com/123456789')).toBe('https://vumbnail.com/123456789.jpg')
    expect(getThumbnailUrl('https://player.vimeo.com/video/987654321')).toBe('https://vumbnail.com/987654321.jpg')
  })

  it('returns img.youtube URL for youtube', () => {
    expect(getThumbnailUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg')
    expect(getThumbnailUrl('https://youtu.be/dQw4w9WgXcQ')).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg')
  })

  it('returns null for unknown URL', () => {
    expect(getThumbnailUrl('https://example.com/video.mp4')).toBeNull()
  })

  it('returns null for malformed input', () => {
    expect(getThumbnailUrl('not a url')).toBeNull()
    expect(getThumbnailUrl('')).toBeNull()
    expect(getThumbnailUrl(null)).toBeNull()
    expect(getThumbnailUrl(undefined)).toBeNull()
  })
})

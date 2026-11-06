import type { MediaAsset } from '@du/schemas'

/**
 * Initial media library. These are the images from the previous portfolio and act
 * as temporary artwork: replace them from the CMS media library with real project
 * screenshots. Project covers are illustrative, not screenshots of the products.
 */
function image(
  id: string,
  url: string,
  alt: string,
  width: number,
  height: number,
  focalY = 50,
): MediaAsset {
  return { id, url, alt, kind: 'image', width, height, focalX: 50, focalY }
}

export const media = {
  portrait: image(
    'media-portrait',
    '/images/about/daniel-portrait.png',
    'Portrait of Daniel Ubani in a black hoodie against a deep red backdrop',
    1086,
    1448,
    32,
  ),
  coverA: image(
    'media-cover-a',
    '/images/projects/project-damas.avif',
    'Placeholder cover image',
    1024,
    706,
  ),
  coverB: image(
    'media-cover-b',
    '/images/projects/project-kavi.avif',
    'Placeholder cover image',
    512,
    353,
  ),
  coverC: image(
    'media-cover-c',
    '/images/projects/project-najm.avif',
    'Placeholder cover image',
    512,
    353,
  ),
  coverD: image(
    'media-cover-d',
    '/images/projects/project-postwing.avif',
    'Placeholder cover image',
    512,
    353,
  ),
  resume: {
    id: 'media-resume',
    url: '/resume/daniel-ubani-resume.pdf',
    alt: 'Daniel Ubani resume (PDF)',
    title: 'Daniel Ubani - Resume',
    kind: 'pdf',
    mimeType: 'application/pdf',
    focalX: 50,
    focalY: 50,
  } satisfies MediaAsset,
} as const

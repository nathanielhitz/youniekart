import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '../sanity/lib/image'
import type { SanityImage } from '../sanity/lib/types'

/** Productie-URL. Stel NEXT_PUBLIC_SITE_URL in zodra het definitieve domein er is. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://youniekart.vercel.app'
).replace(/\/$/, '')

export const absoluteUrl = (path = '/') =>
  `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

/** OG-afbeelding op 1200×630 met hotspot-uitsnede. */
export const ogImageUrl = (image: SanityImage) =>
  urlFor(image as SanityImageSource)
    .width(1200)
    .height(630)
    .fit('crop')
    .auto('format')
    .url()

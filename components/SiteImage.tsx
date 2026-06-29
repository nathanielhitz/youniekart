import Image from 'next/image'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '../sanity/lib/image'
import type { SanityImage as SanityImageType } from '../sanity/lib/types'

/**
 * Sanity-afbeelding via Next/Image, met:
 * - hotspot → object-position (juiste uitsnede bij `fill`)
 * - lqip → blur-placeholder
 * Gebruik binnen een container met een vaste hoogte of aspect-ratio.
 */
export function SiteImage({
  image,
  alt,
  sizes = '100vw',
  priority = false,
  maxWidth = 1600,
  className,
}: {
  image: SanityImageType
  alt: string
  sizes?: string
  priority?: boolean
  maxWidth?: number
  className?: string
}) {
  const src = urlFor(image as SanityImageSource)
    .width(maxWidth)
    .auto('format')
    .quality(78)
    .url()

  const x = image.hotspot?.x ?? 0.5
  const y = image.hotspot?.y ?? 0.5

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder={image.asset.lqip ? 'blur' : 'empty'}
      blurDataURL={image.asset.lqip}
      className={className}
      style={{ objectFit: 'cover', objectPosition: `${x * 100}% ${y * 100}%` }}
    />
  )
}

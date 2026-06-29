'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '../sanity/lib/image'
import { SiteImage } from './SiteImage'
import type { GalleryImage } from '../sanity/lib/types'

export function AlbumGallery({ photos }: { photos: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const show = useCallback(
    (next: (i: number) => number) =>
      setOpenIndex((cur) => (cur === null ? cur : (next(cur) + photos.length) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') show((i) => i + 1)
      if (e.key === 'ArrowLeft') show((i) => i - 1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openIndex, close, show])

  const current = openIndex !== null ? photos[openIndex] : null

  return (
    <>
      <div className="columns-1 gap-[14px] sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <button
            key={photo._key}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="tile group relative mb-[14px] block w-full cursor-zoom-in break-inside-avoid"
            style={{ aspectRatio: photo.image.asset.aspectRatio ?? 1 }}
            aria-label={`Vergroot: ${photo.alt}`}
          >
            <div className="tile-media absolute inset-0">
              <SiteImage
                image={photo.image}
                alt={photo.alt}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                maxWidth={1000}
              />
            </div>
          </button>
        ))}
      </div>

      {/* ===== Lightbox ===== */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between px-[clamp(16px,4vw,40px)] py-5 text-[11px] uppercase tracking-[0.22em] text-muted">
            <span>
              {openIndex! + 1} / {photos.length}
            </span>
            <button type="button" onClick={close} className="nav-link" aria-label="Sluit">
              Sluit
            </button>
          </div>

          <div
            className="relative flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlFor(current.image as SanityImageSource).width(2000).auto('format').quality(82).url()}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />

            {/* prev/next */}
            <button
              type="button"
              onClick={() => show((i) => i - 1)}
              className="absolute left-0 top-0 flex h-full w-1/4 items-center justify-start px-4 text-3xl text-paper/40 transition-colors hover:text-paper"
              aria-label="Vorige foto"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => show((i) => i + 1)}
              className="absolute right-0 top-0 flex h-full w-1/4 items-center justify-end px-4 text-3xl text-paper/40 transition-colors hover:text-paper"
              aria-label="Volgende foto"
            >
              ›
            </button>
          </div>

          {current.caption && (
            <div
              className="px-[clamp(16px,4vw,40px)] py-5 text-center text-sm text-muted"
              onClick={(e) => e.stopPropagation()}
            >
              {current.caption}
            </div>
          )}
        </div>
      )}
    </>
  )
}

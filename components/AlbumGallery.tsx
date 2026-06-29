'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '../sanity/lib/image'
import { SiteImage } from './SiteImage'
import type { GalleryImage } from '../sanity/lib/types'

const chip =
  'flex items-center justify-center rounded-full bg-ink/60 text-paper backdrop-blur-sm transition-colors hover:bg-ink/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export function AlbumGallery({ photos }: { photos: GalleryImage[] }) {
  const reduce = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const show = useCallback(
    (next: (i: number) => number) =>
      setOpenIndex((cur) =>
        cur === null ? cur : (next(cur) + photos.length) % photos.length,
      ),
    [photos.length],
  )

  const openAt = (i: number) => {
    triggerRef.current = document.activeElement as HTMLElement
    setOpenIndex(i)
  }

  // Toetsenbord + focus-trap + scroll-lock zolang de lightbox open is.
  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') show((i) => i + 1)
      else if (e.key === 'ArrowLeft') show((i) => i - 1)
      else if (e.key === 'Tab') {
        const f = dialogRef.current?.querySelectorAll<HTMLElement>('button')
        if (!f || f.length === 0) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openIndex, close, show])

  // Focus de lightbox bij openen; herstel naar de tegel bij sluiten.
  useEffect(() => {
    if (openIndex !== null) {
      dialogRef.current?.querySelector<HTMLElement>('button')?.focus()
    } else if (triggerRef.current) {
      triggerRef.current.focus()
      triggerRef.current = null
    }
  }, [openIndex])

  const current = openIndex !== null ? photos[openIndex] : null

  return (
    <>
      <div className="columns-1 gap-[14px] sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <motion.button
            key={photo._key}
            type="button"
            onClick={() => openAt(i)}
            className="tile group relative mb-[14px] block w-full cursor-zoom-in break-inside-avoid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            style={{ aspectRatio: photo.image.asset.aspectRatio ?? 1 }}
            aria-label={`Vergroot: ${photo.alt}`}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              delay: Math.min((i % 6) * 0.05, 0.3),
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="tile-media absolute inset-0">
              <SiteImage
                image={photo.image}
                alt={photo.alt}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                maxWidth={1000}
              />
            </div>
          </motion.button>
        ))}
      </div>

      {/* ===== Lightbox ===== */}
      {current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between px-[clamp(16px,4vw,40px)] py-5">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
              {openIndex! + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={close}
              className={`${chip} h-10 w-10`}
              aria-label="Sluit"
            >
              <X size={20} weight="light" />
            </button>
          </div>

          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            <Image
              src={urlFor(current.image as SanityImageSource)
                .width(2000)
                .auto('format')
                .quality(82)
                .url()}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />

            <button
              type="button"
              onClick={() => show((i) => i - 1)}
              className={`${chip} absolute left-[clamp(12px,3vw,28px)] top-1/2 h-12 w-12 -translate-y-1/2`}
              aria-label="Vorige foto"
            >
              <CaretLeft size={22} weight="light" />
            </button>
            <button
              type="button"
              onClick={() => show((i) => i + 1)}
              className={`${chip} absolute right-[clamp(12px,3vw,28px)] top-1/2 h-12 w-12 -translate-y-1/2`}
              aria-label="Volgende foto"
            >
              <CaretRight size={22} weight="light" />
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

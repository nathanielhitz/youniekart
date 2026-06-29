'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { SiteImage } from './SiteImage'
import type { AlbumListItem } from '../sanity/lib/types'

const MotionLink = motion.create(Link)

export function AlbumTile({
  album,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  index = 0,
}: {
  album: AlbumListItem
  className?: string
  sizes?: string
  priority?: boolean
  index?: number
}) {
  const reduce = useReducedMotion()

  return (
    <MotionLink
      href={`/portfolio/${album.slug}`}
      className={`tile group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
      aria-label={`${album.title}, ${album.category}`}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="tile-media absolute inset-0">
        <SiteImage
          image={album.coverImage}
          alt={album.title}
          sizes={sizes}
          priority={priority}
        />
      </div>
      <div className="tile-cap">
        <div className="font-serif text-[22px] leading-tight">{album.title}</div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted">
          {album.category} · {album.photoCount} {"foto's"}
        </div>
      </div>
    </MotionLink>
  )
}

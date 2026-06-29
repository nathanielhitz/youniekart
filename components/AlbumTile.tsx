import Link from 'next/link'
import { SiteImage } from './SiteImage'
import type { AlbumListItem } from '../sanity/lib/types'

export function AlbumTile({
  album,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: {
  album: AlbumListItem
  className?: string
  sizes?: string
  priority?: boolean
}) {
  return (
    <Link
      href={`/portfolio/${album.slug}`}
      className={`tile group block ${className}`}
      aria-label={`${album.title}, ${album.category}`}
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
    </Link>
  )
}

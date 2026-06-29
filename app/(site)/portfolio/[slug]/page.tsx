import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAlbumBySlug, getAlbumSlugs } from '../../../../sanity/lib/api'

export async function generateStaticParams() {
  const slugs = await getAlbumSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const album = await getAlbumBySlug(slug)
  if (!album) return { title: 'Album niet gevonden — Youniek Art' }
  return {
    title: `${album.title} — Youniek Art`,
    description: album.description,
  }
}

// Fase 4: data + routing. Galerij/lightbox-styling volgt in Fase 5.
export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const album = await getAlbumBySlug(slug)
  if (!album) notFound()

  return (
    <div className="p-8 space-y-6">
      <header>
        <p className="text-muted uppercase tracking-widest text-sm">
          {album.category}
        </p>
        <h1 className="font-serif text-4xl">{album.title}</h1>
        {album.description && (
          <p className="mt-2 max-w-prose text-muted">{album.description}</p>
        )}
      </header>

      <p className="text-muted">{album.photos?.length ?? 0} {"foto's"}</p>

      <ul className="space-y-1">
        {album.photos?.map((photo) => (
          <li key={photo._key}>
            {photo.alt}
            {photo.caption && (
              <span className="text-muted"> — {photo.caption}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

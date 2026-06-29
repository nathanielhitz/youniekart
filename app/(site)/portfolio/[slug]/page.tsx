import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAlbumBySlug, getAlbumSlugs } from '../../../../sanity/lib/api'
import { AlbumGallery } from '../../../../components/AlbumGallery'

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
  if (!album) return { title: 'Album niet gevonden · Youniek Art' }
  return {
    title: `${album.title} · Youniek Art`,
    description: album.description,
  }
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const album = await getAlbumBySlug(slug)
  if (!album) notFound()

  return (
    <div className="px-[clamp(20px,5vw,64px)] pb-[clamp(72px,12vh,140px)] pt-[clamp(120px,18vh,200px)]">
      <div className="mx-auto max-w-site">
        <header className="mb-12 max-w-[760px]">
          <Link
            href="/portfolio"
            className="mb-6 inline-block text-[11px] uppercase tracking-[0.22em] text-muted hover:text-paper"
          >
            ← Portfolio
          </Link>
          <div className="eyebrow mb-3">{album.category}</div>
          <h1 className="font-serif text-[clamp(34px,5vw,64px)] leading-tight">
            {album.title}
          </h1>
          {album.description && (
            <p className="mt-5 text-muted text-[clamp(15px,1.4vw,17px)]">
              {album.description}
            </p>
          )}
        </header>

        {album.photos?.length ? (
          <AlbumGallery photos={album.photos} />
        ) : (
          <p className="text-muted">Nog geen foto&apos;s in dit album.</p>
        )}
      </div>
    </div>
  )
}

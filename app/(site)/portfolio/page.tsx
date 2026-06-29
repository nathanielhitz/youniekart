import { getAlbums } from '../../../sanity/lib/api'
import { PortfolioGrid } from '../../../components/PortfolioGrid'

export const metadata = { title: 'Portfolio · Youniek Art' }

export default async function PortfolioPage() {
  const albums = await getAlbums()

  return (
    <div className="px-[clamp(20px,5vw,64px)] pb-[clamp(72px,12vh,140px)] pt-[clamp(120px,18vh,200px)]">
      <div className="mx-auto max-w-site">
        <header className="mb-12">
          <div className="eyebrow mb-3">Portfolio</div>
          <h1 className="font-serif text-[clamp(34px,5vw,64px)] leading-tight">
            Het werk
          </h1>
        </header>

        {albums.length === 0 ? (
          <p className="text-muted">Nog geen albums gepubliceerd.</p>
        ) : (
          <PortfolioGrid albums={albums} />
        )}
      </div>
    </div>
  )
}

import Link from 'next/link'
import { getAlbums } from '../../../sanity/lib/api'
import { CATEGORIES } from '../../../sanity/lib/types'

export const metadata = { title: 'Portfolio — Youniek Art' }

// Fase 4: data + routing. Filter-UI en grid-styling volgen in Fase 5.
export default async function PortfolioPage() {
  const albums = await getAlbums()

  return (
    <div className="p-8 space-y-8">
      <h1 className="font-serif text-4xl">Portfolio</h1>

      {CATEGORIES.map((cat) => {
        const inCat = albums.filter((a) => a.category === cat)
        if (inCat.length === 0) return null
        return (
          <section key={cat}>
            <h2 className="font-serif text-2xl mb-2">{cat}</h2>
            <ul className="space-y-1">
              {inCat.map((a) => (
                <li key={a._id}>
                  <Link
                    href={`/portfolio/${a.slug}`}
                    className="text-accent underline"
                  >
                    {a.title}
                  </Link>
                  <span className="text-muted"> · {a.photoCount} {"foto's"}</span>
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      {albums.length === 0 && (
        <p className="text-muted">Nog geen albums gepubliceerd.</p>
      )}
    </div>
  )
}

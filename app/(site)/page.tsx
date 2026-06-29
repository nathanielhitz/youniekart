import Link from 'next/link'
import { getHomePage } from '../../sanity/lib/api'

// Fase 4: data-laag. UI/styling volgt in Fase 5.
export default async function HomePage() {
  const home = await getHomePage()

  if (!home) {
    return (
      <div className="p-8">
        <p className="font-serif text-3xl">Youniek·Art</p>
        <p className="text-muted mt-2">
          Nog geen Homepage-content in de Studio. Vul de Homepage-singleton in
          via <Link href="/studio" className="text-accent underline">/studio</Link>.
        </p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      <section>
        {home.heroEyebrow && (
          <p className="text-muted uppercase tracking-widest text-sm">
            {home.heroEyebrow}
          </p>
        )}
        <h1 className="font-serif text-5xl">{home.heroTitle}</h1>
        {home.heroSubtitle && <p className="text-muted mt-2">{home.heroSubtitle}</p>}
      </section>

      {(home.introHeading || home.introBody) && (
        <section>
          {home.introHeading && (
            <h2 className="font-serif text-3xl">{home.introHeading}</h2>
          )}
          {home.introBody && <p className="mt-2 max-w-prose">{home.introBody}</p>}
        </section>
      )}

      <section>
        <h2 className="font-serif text-2xl mb-3">Uitgelicht werk</h2>
        {home.featuredAlbums?.length ? (
          <ul className="space-y-1">
            {home.featuredAlbums.map((a) => (
              <li key={a._id}>
                <Link href={`/portfolio/${a.slug}`} className="text-accent underline">
                  {a.title}
                </Link>
                <span className="text-muted"> — {a.category} · {a.photoCount} {"foto's"}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Nog geen albums uitgelicht.</p>
        )}
      </section>
    </div>
  )
}

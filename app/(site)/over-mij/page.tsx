import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getAboutPage } from '../../../sanity/lib/api'

export const metadata = { title: 'Over mij — Youniek Art' }

// Fase 4: data-laag. UI/styling volgt in Fase 5.
export default async function AboutPage() {
  const about = await getAboutPage()

  if (!about) {
    return (
      <div className="p-8">
        <h1 className="font-serif text-4xl">Over mij</h1>
        <p className="text-muted mt-2">
          Nog geen content. Vul de {'"Over mij"'}-singleton in via{' '}
          <Link href="/studio" className="text-accent underline">/studio</Link>.
        </p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="font-serif text-4xl">{about.heading}</h1>
      <div className="max-w-prose space-y-3">
        <PortableText value={about.bio} />
      </div>
      {about.contactCta && (
        <p className="text-accent">{about.contactCta}</p>
      )}
    </div>
  )
}

import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { getAboutPage, getSiteSettings } from '../../../sanity/lib/api'
import { SiteImage } from '../../../components/SiteImage'

export const metadata = { title: 'Over mij — Youniek Art' }

const bioComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-muted text-[clamp(15px,1.4vw,17px)] leading-[1.8]">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-paper">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="border-b border-accent text-paper"
      >
        {children}
      </a>
    ),
  },
}

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAboutPage(), getSiteSettings()])
  const email = settings?.email ?? 'nieki.is@live.nl'
  const ctaLabel = about?.contactCta ?? 'Neem contact op'

  return (
    <div className="px-[clamp(20px,5vw,64px)] pb-[clamp(72px,12vh,140px)] pt-[clamp(120px,18vh,200px)]">
      <div className="mx-auto grid max-w-site grid-cols-1 gap-[clamp(32px,5vw,72px)] md:grid-cols-[0.8fr_1.2fr]">
        {/* Portret */}
        <div className="relative aspect-[3/4] w-full self-start overflow-hidden bg-ink-2 md:sticky md:top-[120px]">
          {about?.portrait ? (
            <SiteImage
              image={about.portrait}
              alt={about.heading ?? 'Monniek Westerop'}
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
              maxWidth={1000}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted">
              Portretfoto volgt
            </div>
          )}
        </div>

        {/* Tekst */}
        <div className="max-w-[640px]">
          <div className="eyebrow mb-3">Over mij</div>
          <h1 className="mb-8 font-serif text-[clamp(34px,5vw,60px)] leading-tight">
            {about?.heading ?? 'Monniek Westerop'}
          </h1>

          {about?.bio ? (
            <PortableText value={about.bio} components={bioComponents} />
          ) : (
            <p className="mb-5 text-muted text-[clamp(15px,1.4vw,17px)] leading-[1.8]">
              De biografie van Monniek volgt hier. Vul de &quot;Over mij&quot;-pagina
              in via de Studio.
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href={`mailto:${email}`} className="text-link">
              {ctaLabel}
            </a>
            <Link
              href="/portfolio"
              className="text-[12px] uppercase tracking-[0.22em] text-muted hover:text-paper"
            >
              Bekijk het werk →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

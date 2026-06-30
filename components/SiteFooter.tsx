import Link from 'next/link'
import type { SiteSettings } from '../sanity/lib/types'

function Wordmark({ text }: { text: string }) {
  const [before, after] = text.includes('·')
    ? [text.slice(0, text.indexOf('·')), text.slice(text.indexOf('·') + 1)]
    : [text, '']
  return (
    <span className="wordmark">
      {before}
      {after !== '' && <span>·</span>}
      {after}
    </span>
  )
}

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const wordmark = settings?.wordmark ?? 'Youniek·Art'
  const email = settings?.email ?? 'nieki.is@live.nl'
  const instagramUrl = settings?.instagramUrl ?? 'https://instagram.com/you_niek.art'
  const footerText =
    settings?.footerText ??
    'Fotografie van Monniek Westerop. Portret, natuur en vrij werk.'
  const year = 2026

  return (
    <footer className="border-t border-line bg-ink-2 pb-10 pt-[clamp(54px,8vh,86px)]">
      <div className="wrap grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="mb-4 inline-block">
            <Wordmark text={wordmark} />
          </Link>
          <p className="max-w-[30ch] text-sm text-muted">{footerText}</p>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Menu</h4>
          <Link href="/" className="mb-[9px] block text-sm text-muted hover:text-paper">Home</Link>
          <Link href="/portfolio" className="mb-[9px] block text-sm text-muted hover:text-paper">Portfolio</Link>
          <Link href="/over-mij" className="mb-[9px] block text-sm text-muted hover:text-paper">Over mij</Link>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Contact</h4>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-[9px] block text-sm text-muted hover:text-paper"
          >
            Instagram · @you_niek.art
          </a>
          <a
            href={`mailto:${email}`}
            className="mb-[9px] block text-sm text-muted hover:text-paper"
          >
            {email}
          </a>
          <span className="mb-[9px] block text-sm text-muted">Nederland</span>
        </div>
      </div>

      <div className="wrap mt-12 flex flex-wrap justify-between gap-3 border-t border-line pt-[22px] text-xs text-muted">
        <span>© {year} Youniek Art · Monniek Westerop</span>
        <span>Gebouwd door HitzDigital</span>
      </div>
    </footer>
  )
}

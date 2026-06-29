import Link from 'next/link'

export const metadata = { title: 'Pagina niet gevonden · Youniek Art' }

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <span className="wordmark mb-10">
        Youniek<span>·</span>Art
      </span>
      <p className="eyebrow mb-4">404</p>
      <h1 className="mb-4 font-serif text-[clamp(32px,6vw,56px)] leading-tight">
        Deze pagina bestaat niet
      </h1>
      <p className="mb-10 max-w-[42ch] text-muted">
        Misschien is de link verouderd of verplaatst. Ga terug naar de
        beginpagina of bekijk het portfolio.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <Link href="/" className="text-link">
          Naar home
        </Link>
        <Link
          href="/portfolio"
          className="text-[12px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-paper"
        >
          Bekijk portfolio →
        </Link>
      </div>
    </main>
  )
}

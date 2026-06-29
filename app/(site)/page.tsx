import Link from 'next/link'
import { getAlbums, getHomePage } from '../../sanity/lib/api'
import { SiteImage } from '../../components/SiteImage'
import { AlbumTile } from '../../components/AlbumTile'
import { Reveal } from '../../components/Reveal'

// Editoriale grid-indeling (volgt de mockup): 1 breed + smal, daarna 3 staand.
const FEATURED_LAYOUT = [
  'md:col-span-8 aspect-[3/2]',
  'md:col-span-4 aspect-[3/2]',
  'md:col-span-4 aspect-[3/4]',
  'md:col-span-4 aspect-[3/4]',
  'md:col-span-4 aspect-[3/4]',
]

export default async function HomePage() {
  const [home, albums] = await Promise.all([getHomePage(), getAlbums()])

  // Fallbacks zodat de site compleet oogt vóór Monniek de Homepage invult.
  const heroImage = home?.heroImage ?? albums[0]?.coverImage
  const heroEyebrow = home?.heroEyebrow ?? 'Fotografie · Monniek Westerop'
  const heroTitle = home?.heroTitle ?? 'Het moment,\nvastgehouden in licht.'
  const heroSubtitle =
    home?.heroSubtitle ??
    'Portret, natuur en alles daartussenin, door de lens van Youniek Art.'

  const featured =
    home?.featuredAlbums?.length ? home.featuredAlbums : albums.slice(0, 5)

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative flex h-[100svh] min-h-[600px] w-full items-end overflow-hidden">
        {heroImage && (
          <div className="hero-zoom absolute inset-0">
            <SiteImage
              image={heroImage}
              alt="Uitgelicht werk van Monniek Westerop"
              sizes="100vw"
              priority
              maxWidth={2400}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,13,16,0.88)_0%,rgba(10,13,16,0)_45%)]" />

        <div className="relative z-[2] px-[clamp(20px,5vw,64px)] pb-[clamp(46px,7vh,80px)]">
          <div className="eyebrow mb-4" style={{ letterSpacing: '0.34em' }}>
            {heroEyebrow}
          </div>
          <h1 className="whitespace-pre-line font-serif font-medium leading-[1.02] text-[clamp(40px,7vw,92px)]">
            {heroTitle}
          </h1>
          <p className="mt-[14px] max-w-[34ch] text-muted text-[clamp(14px,1.5vw,17px)]">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="px-[clamp(20px,5vw,64px)] py-[clamp(72px,12vh,140px)]">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 className="mb-[26px] font-serif text-[clamp(26px,4vw,44px)] leading-[1.25]">
            {home?.introHeading ??
              'Een oog voor het ongepolijste, eerlijke moment.'}
          </h2>
          <p className="text-muted text-[clamp(15px,1.4vw,17px)]">
            {home?.introBody ??
              'Youniek Art is de fotografie van Monniek Westerop: portret, natuur en vrij werk, altijd op zoek naar het echte moment.'}
          </p>
          <Link href="/over-mij" className="text-link mt-[18px]">
            Lees meer over mij
          </Link>
        </Reveal>
      </section>

      {/* ===== UITGELICHT WERK ===== */}
      {featured.length > 0 && (
        <section className="px-[clamp(20px,5vw,64px)] pb-[clamp(72px,12vh,140px)]">
          <div className="mx-auto max-w-site">
            <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <h2 className="font-serif text-[clamp(26px,3.6vw,40px)]">
                Uitgelicht werk
              </h2>
              <Link
                href="/portfolio"
                className="whitespace-nowrap text-[12px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-paper"
              >
                Bekijk het volledige portfolio →
              </Link>
            </Reveal>

            <div className="grid grid-cols-12 gap-[14px]">
              {featured.slice(0, 5).map((album, i) => (
                <AlbumTile
                  key={album._id}
                  album={album}
                  index={i}
                  className={`col-span-12 ${FEATURED_LAYOUT[i] ?? 'md:col-span-4 aspect-[3/4]'}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

import { SiteHeader } from '../../components/SiteHeader'
import { SiteFooter } from '../../components/SiteFooter'
import { getSiteSettings } from '../../sanity/lib/api'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <>
      <a href="#main-content" className="skip-link">
        Naar inhoud
      </a>
      <SiteHeader wordmark={settings?.wordmark ?? 'Youniek·Art'} />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <SiteFooter settings={settings} />
    </>
  )
}

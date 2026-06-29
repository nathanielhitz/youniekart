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
      <SiteHeader wordmark={settings?.wordmark ?? 'Youniek·Art'} />
      <main className="min-h-screen">{children}</main>
      <SiteFooter settings={settings} />
    </>
  )
}

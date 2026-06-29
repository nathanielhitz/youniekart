import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { getSiteSettings } from '../sanity/lib/api'
import { ogImageUrl, siteUrl } from '../lib/seo'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const title =
    settings?.seoDefaults?.metaTitle ??
    settings?.siteTitle ??
    'Youniek Art · Monniek Westerop'
  const description =
    settings?.seoDefaults?.metaDescription ??
    'Fotografie van Monniek Westerop. Portret, natuur en vrij werk.'
  const ogImage = settings?.seoDefaults?.ogImage
    ? ogImageUrl(settings.seoDefaults.ogImage)
    : undefined

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: '%s' },
    description,
    openGraph: {
      type: 'website',
      siteName: 'Youniek Art',
      locale: 'nl_NL',
      title,
      description,
      url: siteUrl,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  )
}

import type { MetadataRoute } from 'next'
import { getAlbumSlugs } from '../sanity/lib/api'
import { absoluteUrl } from '../lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAlbumSlugs()

  const staticRoutes = ['/', '/portfolio', '/over-mij'].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }))

  const albumRoutes = slugs.map((slug) => ({
    url: absoluteUrl(`/portfolio/${slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...albumRoutes]
}

import { client } from './client'
import {
  aboutPageQuery,
  albumBySlugQuery,
  albumSlugsQuery,
  albumsQuery,
  homePageQuery,
  siteSettingsQuery,
} from './queries'
import type {
  AboutPage,
  Album,
  AlbumListItem,
  HomePage,
  SiteSettings,
} from './types'

/**
 * Centrale fetch met ISR. Content verandert zelden (CMS), dus we cachen
 * met een revalidate-venster + een gedeelde tag voor latere webhook-purge.
 */
async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60, tags: ['sanity'] },
  })
}

export const getSiteSettings = () =>
  sanityFetch<SiteSettings | null>(siteSettingsQuery)

export const getHomePage = () => sanityFetch<HomePage | null>(homePageQuery)

export const getAboutPage = () => sanityFetch<AboutPage | null>(aboutPageQuery)

export const getAlbums = () => sanityFetch<AlbumListItem[]>(albumsQuery)

export const getAlbumBySlug = (slug: string) =>
  sanityFetch<Album | null>(albumBySlugQuery, { slug })

export const getAlbumSlugs = () => sanityFetch<string[]>(albumSlugsQuery)

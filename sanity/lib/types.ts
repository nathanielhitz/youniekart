import type { PortableTextBlock } from '@portabletext/types'

/** Categorieën — moeten gelijk lopen met de radio-lijst in schemas/documents/album.ts */
export const CATEGORIES = ['Portret', 'Trouw', 'Natuur', 'Abstract', 'Reizen'] as const
export type Category = (typeof CATEGORIES)[number]

/** Een Sanity image-veld met hotspot/crop + gedereferenceerd asset (lqip, ratio). */
export interface SanityImage {
  _type?: 'image'
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  asset: {
    _id: string
    lqip?: string
    aspectRatio?: number
  }
}

/** Eén foto binnen een album (object: galleryImage). */
export interface GalleryImage {
  _key: string
  image: SanityImage
  alt: string
  caption?: string
}

export interface Seo {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
}

/** Album (collectie) — kern van het portfolio. */
export interface Album {
  _id: string
  title: string
  slug: string
  coverImage: SanityImage
  category: Category
  description?: string
  photos: GalleryImage[]
  featured?: boolean
  publishedAt?: string
}

/** Lichte variant voor overzichten (grid/home) — zonder de volledige fotolijst. */
export interface AlbumListItem {
  _id: string
  title: string
  slug: string
  coverImage: SanityImage
  category: Category
  photoCount: number
}

export interface HomePage {
  heroImage: SanityImage
  heroEyebrow?: string
  heroTitle: string
  heroSubtitle?: string
  introHeading?: string
  introBody?: string
  featuredAlbums: AlbumListItem[]
}

export interface AboutPage {
  portrait: SanityImage
  heading: string
  bio: PortableTextBlock[]
  contactCta?: string
}

export interface SiteSettings {
  siteTitle: string
  wordmark?: string
  email?: string
  instagramUrl?: string
  footerText?: string
  seoDefaults?: Seo
}

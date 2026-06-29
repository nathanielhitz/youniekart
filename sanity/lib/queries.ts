import { groq } from 'next-sanity'

/** Herbruikbare projecties */
const imageFields = /* groq */ `
  _type,
  asset,
  hotspot,
  crop
`

const albumListFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  coverImage{ ${imageFields} },
  category,
  "photoCount": count(photos)
`

// ─── Singletons ───────────────────────────────────────────
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteTitle,
    wordmark,
    email,
    instagramUrl,
    footerText,
    seoDefaults{
      metaTitle,
      metaDescription,
      ogImage{ ${imageFields} }
    }
  }
`

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroImage{ ${imageFields} },
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    introHeading,
    introBody,
    "featuredAlbums": featuredAlbums[]->{ ${albumListFields} }
  }
`

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    portrait{ ${imageFields} },
    heading,
    bio,
    contactCta
  }
`

// ─── Albums ───────────────────────────────────────────────
/** Alle albums voor het portfolio-overzicht, nieuwste eerst. */
export const albumsQuery = groq`
  *[_type == "album"] | order(publishedAt desc, _createdAt desc){
    ${albumListFields}
  }
`

/** Eén album met volledige fotolijst (detailpagina). */
export const albumBySlugQuery = groq`
  *[_type == "album" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    coverImage{ ${imageFields} },
    category,
    description,
    featured,
    publishedAt,
    photos[]{
      _key,
      image{ ${imageFields} },
      alt,
      caption
    }
  }
`

/** Alle slugs — voor generateStaticParams. */
export const albumSlugsQuery = groq`
  *[_type == "album" && defined(slug.current)].slug.current
`

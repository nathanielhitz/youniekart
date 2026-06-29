import { galleryImage } from './objects/galleryImage'
import { seo } from './objects/seo'
import { homePage } from './documents/homePage'
import { aboutPage } from './documents/aboutPage'
import { siteSettings } from './documents/siteSettings'
import { album } from './documents/album'

export const schemaTypes = [
  // objecten eerst (documenten kunnen ernaar verwijzen)
  galleryImage,
  seo,
  // singletons
  homePage,
  aboutPage,
  siteSettings,
  // collecties
  album,
]

export const singletonTypes = new Set(['homePage', 'aboutPage', 'siteSettings'])

import type { StructureResolver } from 'sanity/structure'
import { singletonTypes } from './schemas'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Youniek Art')
    .items([
      // ─── Singletons ───────────────────────────────────────
      S.listItem()
        .title('Homepage')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Homepage'),
        ),

      S.listItem()
        .title('Over mij')
        .id('aboutPage')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('Over mij'),
        ),

      S.divider(),

      // ─── Portfolio ────────────────────────────────────────
      S.listItem()
        .title('Portfolio')
        .id('portfolio')
        .child(
          S.list()
            .title('Portfolio')
            .items([
              S.documentTypeListItem('album').title('Albums'),
            ]),
        ),

      S.divider(),

      // ─── Instellingen (singleton) ─────────────────────────
      S.listItem()
        .title('Instellingen')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Instellingen'),
        ),
    ])

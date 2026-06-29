import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta-titel',
      type: 'string',
      description: 'Titel in Google en browsertab (max. 60 tekens)',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta-omschrijving',
      type: 'text',
      rows: 3,
      description: 'Omschrijving in zoekresultaat (max. 160 tekens)',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Deelafbeelding (OG)',
      type: 'image',
      description: 'Voorvertoning bij delen op sociale media (1200×630 px)',
    }),
  ],
})

import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero-foto',
      type: 'image',
      options: { hotspot: true },
      description: 'Fullscreen achtergrond — kies je mooiste foto',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow (klein label boven titel)',
      type: 'string',
      placeholder: 'Fotografie · Monniek Westerop',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero-titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero-ondertitel',
      type: 'string',
    }),
    defineField({
      name: 'introHeading',
      title: 'Kop "Over Monniek"-blok',
      type: 'string',
    }),
    defineField({
      name: 'introBody',
      title: 'Intro-tekst',
      type: 'text',
      rows: 4,
      description: '2–3 zinnen',
    }),
    defineField({
      name: 'featuredAlbums',
      title: 'Uitgelichte albums',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'album' }],
        }),
      ],
      description: 'Sleep om te sorteren (max. 6)',
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
})

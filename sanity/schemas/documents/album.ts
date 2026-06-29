import { defineArrayMember, defineField, defineType } from 'sanity'

export const album = defineType({
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naam van de serie',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Omslagfoto',
      type: 'image',
      options: { hotspot: true },
      description: 'Zichtbaar in het portfolio-overzicht',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          { title: 'Portret', value: 'Portret' },
          { title: 'Trouw', value: 'Trouw' },
          { title: 'Natuur', value: 'Natuur' },
          { title: 'Abstract', value: 'Abstract' },
          { title: 'Reizen', value: 'Reizen' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Omschrijving',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'photos',
      title: "Foto's",
      type: 'array',
      of: [defineArrayMember({ type: 'galleryImage' })],
      options: { layout: 'grid' },
      description: "Sleep om de volgorde te bepalen",
    }),
    defineField({
      name: 'featured',
      title: 'Uitlichten op homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publicatiedatum',
      type: 'datetime',
      description: 'Bepaalt de sorteervolgorde (nieuwste eerst)',
    }),
  ],
  orderings: [
    {
      title: 'Nieuwste eerst',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'category' },
  },
})

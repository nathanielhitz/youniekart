import { defineArrayMember, defineField, defineType } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Foto',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt-tekst',
      type: 'string',
      description: 'Beschrijving van de foto (verplicht voor SEO en toegankelijkheid)',
      validation: (rule) =>
        rule.required().error('Alt-tekst is verplicht — vul een beschrijving in'),
    }),
    defineField({
      name: 'caption',
      title: 'Bijschrift',
      type: 'string',
    }),
  ],
  preview: {
    select: { media: 'image', title: 'alt' },
  },
})

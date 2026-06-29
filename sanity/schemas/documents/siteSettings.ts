import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Sitetitel',
      type: 'string',
      description: 'Verschijnt in browsertab en SEO (bijv. "Youniek Art")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'wordmark',
      title: 'Wordmark',
      type: 'string',
      placeholder: 'Youniek·Art',
    }),
    defineField({
      name: 'email',
      title: 'E-mailadres',
      type: 'string',
      placeholder: 'nieki.is@live.nl',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram-URL',
      type: 'url',
      placeholder: 'https://instagram.com/you_niek.art',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer-tekst',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'seoDefaults',
      title: 'SEO-standaarden',
      type: 'seo',
      description: 'Fallback als een pagina geen eigen SEO-velden heeft',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Instellingen' }),
  },
})

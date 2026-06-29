import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes, singletonTypes } from './schemas'
import { structure } from './structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  name: 'youniek-art',
  title: 'Youniek Art',
  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Verberg singletons in de "nieuwe document"-lijst zodat Monniek
    // ze niet per ongeluk dupliceert of verwijdert.
    templates: (prev) =>
      prev.filter((template) => !singletonTypes.has(template.schemaType)),
  },
})

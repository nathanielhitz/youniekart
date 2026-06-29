// scripts/import-photos.mjs
//
// Bulk-import van foto's naar Sanity albums.
// Mapstructuur:  SOURCE_DIR/<Categorie>/<Albumnaam>/<foto's>
//   Categorie moet zijn: Portret | Trouw | Natuur | Abstract | Reizen
//
// Vereist:
//   npm i @sanity/client
//   env: SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN
//
// Draaien:
//   SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_WRITE_TOKEN=sk... \
//   node scripts/import-photos.mjs ./images-gesorteerd
//
// LET OP: draai dit één keer. Opnieuw draaien maakt dubbele albums.

import { createClient } from '@sanity/client'
import { readdir, readFile, stat } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import { randomUUID } from 'node:crypto'

const SOURCE_DIR = process.argv[2] || './images-gesorteerd'
const VALID_CATEGORIES = ['Portret', 'Trouw', 'Natuur', 'Abstract', 'Reizen']
const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp']

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN, // schrijf-token, NIET in code zetten
  apiVersion: '2024-01-01',
  useCdn: false,
})

const slugify = (s) =>
  s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

async function dirs(p) {
  const items = await readdir(p)
  const out = []
  for (const name of items) {
    if (name.startsWith('.') || name.startsWith('_')) continue
    if ((await stat(join(p, name))).isDirectory()) out.push(name)
  }
  return out
}

async function imagesIn(p) {
  const items = await readdir(p)
  return items.filter((n) => IMAGE_EXT.includes(extname(n).toLowerCase()))
}

async function uploadImage(filePath) {
  const data = await readFile(filePath)
  const asset = await client.assets.upload('image', data, { filename: basename(filePath) })
  return asset._id
}

async function run() {
  if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_WRITE_TOKEN) {
    console.error('Ontbrekend: SANITY_PROJECT_ID en/of SANITY_WRITE_TOKEN'); process.exit(1)
  }

  let albumCount = 0, photoCount = 0
  for (const category of await dirs(SOURCE_DIR)) {
    if (!VALID_CATEGORIES.includes(category)) {
      console.warn(`! Map "${category}" overgeslagen (geen geldige categorie)`); continue
    }
    for (const albumName of await dirs(join(SOURCE_DIR, category))) {
      const albumPath = join(SOURCE_DIR, category, albumName)
      const files = await imagesIn(albumPath)
      if (files.length === 0) continue

      console.log(`\n📁 ${category} / ${albumName}  (${files.length} foto's)`)
      const photos = []
      let coverRef = null

      for (let i = 0; i < files.length; i++) {
        const assetId = await uploadImage(join(albumPath, files[i]))
        if (i === 0) coverRef = assetId
        photos.push({
          _type: 'galleryImage',
          _key: randomUUID(),
          image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } },
          alt: `${albumName} — foto ${i + 1}`, // placeholder; later verfijnen in Studio
        })
        photoCount++
        process.stdout.write(`   ↑ ${i + 1}/${files.length}\r`)
      }

      await client.create({
        _type: 'album',
        title: albumName,
        slug: { _type: 'slug', current: slugify(albumName) },
        category,
        coverImage: coverRef
          ? { _type: 'image', asset: { _type: 'reference', _ref: coverRef } }
          : undefined,
        photos,
        featured: false,
        publishedAt: new Date().toISOString(),
      })
      albumCount++
      console.log(`   ✓ album aangemaakt`)
    }
  }
  console.log(`\nKlaar: ${albumCount} albums, ${photoCount} foto's geüpload.`)
}

run().catch((e) => { console.error(e); process.exit(1) })

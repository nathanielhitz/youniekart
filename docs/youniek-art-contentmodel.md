# Contentmodel — Youniek Art (Sanity CMS)

Fotografie-portfolio van Monniek Westerop · Next.js (App Router) op Vercel + Sanity (hosted).
Doel: een CMS dat een **niet-technische gebruiker** (Monniek) zelfstandig kan beheren.

---

## 1. Samenvatting

- **3 singletons** (bestaan één keer): Homepage, Over mij, Instellingen.
- **2–3 collecties** (meerdere items): Albums (series), Blogposts, en optioneel Categorieën.
- **Foto's zitten ín een album** als sleepbare lijst → makkelijkst voor Monniek (geen losse koppelingen).
- Elke foto heeft verplicht **alt-tekst** (SEO + toegankelijkheid) en een **hotspot/focuspunt** (juiste uitsnede op elk schermformaat).

---

## 2. Document-types in één oogopslag

| Type | Soort | Wat het is | Bewerkt Monniek? |
|---|---|---|---|
| `homePage` | Singleton | Hero-foto + intro + uitgelicht werk | ✅ Ja |
| `aboutPage` | Singleton | "Over mij": portret + bio | ✅ Ja |
| `siteSettings` | Singleton | Contact, Instagram, footer, SEO-defaults | ✅ Ja (zelden) |
| `album` | Collectie | Een serie met foto's | ✅ Ja (vaak) |
| `blogPost` | Collectie | Blogartikel — **Fase 2** | ✅ Ja (later) |

> **Categorie** is géén aparte collectie: het is een vast keuzelijstje (Portret / Trouw / Natuur) op het album zelf → geen beheer-overhead voor Monniek.
> **Taal**: MVP is **alleen NL**; structuur is EN-ready (alle teksten in CMS-velden + Sanity i18n-plugin later).

---

## 3. Velden per type

### 🏠 `homePage` (singleton)
| Veld | Type | Bewerkt Monniek | Toelichting |
|---|---|---|---|
| heroImage | image (hotspot) | ✅ | De mooiste foto, fullscreen |
| heroEyebrow | string | ✅ | Klein label boven titel ("Fotografie · Monniek Westerop") |
| heroTitle | string | ✅ | Grote hero-kop |
| heroSubtitle | text | ✅ | Eén regel onder de titel |
| introHeading | string | ✅ | Kop "Over Monniek"-blok |
| introBody | text | ✅ | Korte intro (2–3 zinnen) |
| featuredAlbums | array → reference(`album`) | ✅ | Kies welke series op de homepage komen (sleepbaar, max ~6) |

### 👤 `aboutPage` (singleton)
| Veld | Type | Bewerkt Monniek | Toelichting |
|---|---|---|---|
| portrait | image (hotspot) | ✅ | Portretfoto van Monniek |
| heading | string | ✅ | Kop |
| bio | portable text (rich) | ✅ | Verhaal met opmaak (alinea's, vet, links) |
| contactCta | string | ✅ | Bijv. "Neem contact op" |

### ⚙️ `siteSettings` (singleton)
| Veld | Type | Bewerkt Monniek | Toelichting |
|---|---|---|---|
| siteTitle | string | ✅ | Voor browser-tab/SEO |
| wordmark | string | ✅ | "Youniek·Art" |
| email | string | ✅ | Contact-e-mail: `nieki.is@live.nl` (geen contactformulier in MVP) |
| instagramUrl | url | ✅ | Link naar @you_niek.art |
| footerText | text | ✅ | Korte footer-zin |
| seoDefaults | object → `seo` | ✅ | Standaard meta-titel/omschrijving + OG-afbeelding |

### 🖼️ `album` (collectie) — de kern
| Veld | Type | Bewerkt Monniek | Toelichting |
|---|---|---|---|
| title | string | ✅ | Naam van de serie |
| slug | slug (auto) | ⚙️ auto | URL, automatisch uit titel |
| coverImage | image (hotspot) | ✅ | Omslagfoto voor overzicht/grid |
| description | text | ✅ | Korte omschrijving |
| category | string (keuzelijst) | ✅ | Vast lijstje: Portret / Trouw / Natuur (dropdown) |
| photos | array → `galleryImage` | ✅ | **De foto's, sleepbaar te ordenen** |
| featured | boolean | ✅ | Uitlichten op homepage |
| publishedAt | datetime | ✅ | Voor sortering (nieuwste eerst) |

### ✍️ `blogPost` (collectie) — **Fase 2 (later toevoegen)**
| Veld | Type | Bewerkt Monniek | Toelichting |
|---|---|---|---|
| title | string | ✅ | Titel |
| slug | slug (auto) | ⚙️ auto | URL |
| coverImage | image (hotspot) | ✅ | Omslag |
| excerpt | text | ✅ | Korte samenvatting voor overzicht |
| body | portable text (rich) | ✅ | Artikel met opmaak + afbeeldingen tussen tekst |
| publishedAt | datetime | ✅ | Publicatiedatum |
| seo | object → `seo` | ✅ (optioneel) | Per-post override |

### 🏷️ Categorie — geen aparte collectie
Categorie is een **vast keuzelijstje op het album** (`Portret` / `Trouw` / `Natuur`), niet een document dat beheerd moet worden. Filteren in het portfolio werkt op deze waarde.

---

## 4. Herbruikbare objecten

### `galleryImage` (één foto in een album)
| Veld | Type | Verplicht | Toelichting |
|---|---|---|---|
| image | image (hotspot) | ✅ | De foto |
| alt | string | ✅ **verplicht** | Beschrijving (SEO + toegankelijkheid) |
| caption | string | — | Optioneel bijschrift |

### `seo` (meta-informatie)
| Veld | Type | Toelichting |
|---|---|---|
| metaTitle | string | Titel in Google/tab |
| metaDescription | text | Omschrijving in zoekresultaat |
| ogImage | image | Voorvertoning bij delen |

---

## 5. Wat Monniek ziet in Sanity Studio (desk-structuur)

```
Youniek Art
├── 🏠 Homepage          (singleton — direct openen)
├── 👤 Over mij           (singleton — direct openen)
├── 🖼️ Portfolio
│     └── Albums          (lijst: nieuw album / bewerken / ordenen; categorie via dropdown)
├── ✍️ Blog               (Fase 2 — later)
└── ⚙️ Instellingen       (singleton — contact, Instagram, SEO)
```

→ Geen technische termen; alleen wat zij herkent: "Homepage", "Albums", "Blog".

---

## 6. Gebruiksvriendelijkheid voor niet-technische editor

- **Verplichte alt-tekst** met validatie → ze kan niet publiceren zonder.
- **Hotspot-cropping**: zij bepaalt het focuspunt, de site kiest automatisch de juiste uitsnede per formaat.
- **Sleep-ordening** van foto's binnen een album en van uitgelichte albums op de homepage.
- **Alleen afbeeldingen** toestaan in image-velden (geen verkeerde bestandstypes).
- **Previews** met thumbnail + titel in alle lijsten.
- **Singletons** zijn niet verwijderbaar/dupliceerbaar (voorkomt fouten).
- Optioneel later: **live preview** van de echte pagina vanuit Studio.

---

## 7. Voorbeeld-schema (Sanity, voor straks in Claude Code)

```js
// schemas/galleryImage.js  — herbruikbaar object
export default {
  name: 'galleryImage',
  type: 'object',
  fields: [
    { name: 'image', type: 'image', options: { hotspot: true }, validation: r => r.required() },
    { name: 'alt', type: 'string', title: 'Alt-tekst', validation: r => r.required() },
    { name: 'caption', type: 'string', title: 'Bijschrift' },
  ],
  preview: { select: { media: 'image', title: 'alt' } },
}

// schemas/album.js
export default {
  name: 'album',
  type: 'document',
  title: 'Album',
  fields: [
    { name: 'title', type: 'string', validation: r => r.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    { name: 'description', type: 'text', rows: 3 },
    { name: 'category', type: 'string', title: 'Categorie',
      options: { list: ['Portret', 'Trouw', 'Natuur'], layout: 'radio' } },
    { name: 'photos', type: 'array', of: [{ type: 'galleryImage' }], options: { layout: 'grid' } },
    { name: 'featured', type: 'boolean', title: 'Uitlichten op homepage' },
    { name: 'publishedAt', type: 'datetime' },
  ],
  preview: { select: { title: 'title', media: 'coverImage' } },
}
```

---

## 8. Gemaakte beslissingen (vastgelegd)

1. **Categorieën**: ✅ ja, als vast dropdown-lijstje op het album (Portret / Trouw / Natuur). Geen beheer-overhead.
2. **Blog**: ⏳ Fase 2 — niet in de eerste oplevering.
3. **Contact**: alleen e-mail (`nieki.is@live.nl`) + Instagram. Geen formulier.
4. **Taal**: NL in de MVP; structuur EN-ready voor later (Sanity i18n-plugin).

### MVP-scope (eerste oplevering)
Homepage · Over mij · Portfolio (albums met categorie-filter) · Instellingen.
**Niet in MVP:** Blog, EN-vertaling, contactformulier.

---

## 9. Volgende stappen

1. Bovenstaande 4 beslissingen maken.
2. Dit model + de homepage-mockup verwerken in de **PRD** (jouw ClickUp-template).
3. **`CLAUDE.md`** opstellen: stack, conventies, stop-points.
4. Pas dán bouwen in **Claude Code** (Sanity-project + Next.js front-end).

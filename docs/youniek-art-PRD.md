# PRD — Youniek Art (fotografie-portfolio)

**Klant:** Monniek Westerop · merk *Youniek Art* (Instagram @you_niek.art)
**Bouwer:** HitzDigital
**Type:** Fotografie-portfolio met zelf-beheerbaar CMS
**Status:** Scoping afgerond — klaar voor bouw

---

## 1. Doel

Een professionele, beeld-eerste portfolio-website waar Monniek haar werk (portret, trouw, natuur) toont en **zelf** content beheert zonder technische kennis. Donker, rustig ontwerp waarin de foto's centraal staan.

### Succescriteria
- Monniek kan zelfstandig albums, foto's en de homepage beheren.
- Snelle, scherpe beelden op alle schermformaten.
- Vindbaar in Google (basis-SEO + alt-teksten).
- Eenvoudig uit te breiden met blog en EN-vertaling (Fase 2).

---

## 2. Scope

### MVP (eerste oplevering)
- Homepage (hero + intro + uitgelicht werk)
- Portfolio-overzicht met **categorie-filter** (Portret / Trouw / Natuur)
- Album-detailpagina (fotogalerij)
- Over mij
- Footer met contact (e-mail + Instagram)
- Sanity Studio (NL) voor beheer

### Fase 2 (later)
- Blog
- EN-vertaling
- Eventueel contactformulier, live preview in Studio

### Buiten scope
- Webshop / online verkoop
- Klant-logins / besloten galerijen
- Boekingssysteem

---

## 3. Tech stack

| Laag | Keuze |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | Sanity (hosted) + Sanity Studio |
| Koppeling | `next-sanity` + Sanity image-CDN |
| Hosting | Vercel |
| Beeld | Sanity asset-CDN (hotspot, on-the-fly resizing) |

---

## 4. Sitemap

```
/                 Home
/portfolio        Overzicht albums + categorie-filter
/portfolio/[slug] Album-detail (galerij)
/over-mij         Over Monniek
/studio           Sanity Studio (beheer)
```

---

## 5. Pagina's & secties

### Home (`/`)
- Fullscreen **hero** (mooiste foto, hotspot) + wordmark + menu + scroll-cue
- **Intro "Over Monniek"** (kop + 2–3 zinnen)
- **Uitgelicht werk**: door Monniek gekozen albums (sleepbaar, max ~6)
- Footer

### Portfolio (`/portfolio`)
- Grid van albums (omslagfoto + titel)
- **Filter** op categorie (Portret / Trouw / Natuur)
- Sortering: nieuwste eerst

### Album-detail (`/portfolio/[slug]`)
- Titel + korte omschrijving
- Galerij van foto's (ordening zoals in CMS, hotspot-uitsnede, lightbox optioneel)
- Alt + bijschrift per foto

### Over mij (`/over-mij`)
- Portretfoto + bio (rich text) + contact-CTA

---

## 6. Contentmodel
Zie apart document **`youniek-art-contentmodel.md`** (singletons: Homepage, Over mij, Instellingen; collectie: Album; Fase 2: Blog).
Kern: foto's zitten als **sleepbare lijst in een album**, elke foto met **verplichte alt-tekst** + **hotspot**.

---

## 7. Ontwerprichting

- **Donker, beeld-eerst** — koel inkt-zwart (`#0B0E11`), foto's leveren de kleur.
- **Accent: cyaan `#7AE7EF`** (Monnieks kleur), ingetogen toegepast (menu-lijn, eyebrows, hover, details).
- **Typografie**: elegante serif voor koppen (Cormorant Garamond) + strakke sans voor menu/labels (Jost).
- **Wordmark**: *Youniek·Art*.
- Veel witruimte, rustige micro-animaties (slow-zoom hero, hover-reveal grid), `reduced-motion` gerespecteerd.
- Referentie-gevoel: wilmardik.nl (structuur), maar eigen identiteit via kleur + serif.

Zie **`monniek-homepage-mockup.html`** voor de visuele richting.

---

## 8. CMS / beheer-ervaring (Sanity Studio)

- Desk in Monnieks taal: Homepage / Over mij / Portfolio (Albums) / Instellingen.
- **Verplichte alt-tekst** (validatie blokkeert publiceren zonder).
- **Hotspot-cropping** per foto.
- **Sleep-ordening** van foto's en uitgelichte albums.
- Alleen afbeeldingen in image-velden; thumbnails in alle lijsten.
- Singletons niet verwijderbaar/dupliceerbaar.

---

## 9. Niet-functionele eisen

- **Performance**: Next/Image + Sanity-CDN, lazy-loading, moderne formaten (WebP/AVIF). Streef Lighthouse ≥ 90.
- **SEO**: per-pagina meta-titel/omschrijving, OG-afbeeldingen, sitemap, semantische HTML.
- **Toegankelijkheid**: alt-teksten, zichtbare focus-states, voldoende contrast, toetsenbordnavigatie.
- **Responsive**: mobiel-eerst, getest t/m kleine schermen.
- **i18n-ready**: alle teksten in CMS-velden zodat EN later eenvoudig is.

---

## 10. Benodigd van de klant (vóór/ tijdens bouw)

- ⚠️ **Hoge-resolutie originelen** van de foto's (Instagram-export is te laag-res voor de live site).
- Definitieve **hero-foto** keuze.
- **Bio-tekst** voor Over mij + korte intro voor de homepage.
- **Tagline** voor de hero.
- Bevestiging contactgegevens: `nieki.is@live.nl` + Instagram-URL.
- Eventueel logo/wordmark-wens.

---

## 11. Fasering (milestones)

1. **Setup** — repo, Next.js, Tailwind, Sanity-project, Vercel-koppeling.
2. **Contentmodel** — Sanity-schema's + Studio desk-structuur.
3. **Data invoeren** — Monniek (of jij) vult enkele albums als testdata.
4. **Front-end logica** — data-fetching, routing, types.
5. **UI scherm-voor-scherm** — Home → Portfolio → Album → Over mij.
6. **Polish** — animaties, SEO, performance, toegankelijkheid.
7. **Oplevering** — domein, Vercel productie, overdracht/uitleg aan Monniek.

---

## 12. Open punten

- Lightbox op album-detail: ja/nee?
- Domeinnaam (youniek.art / youniekart.nl / …)?
- Wie voert de eerste content in — jij of Monniek?

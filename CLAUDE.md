# CLAUDE.md — Youniek Art

Persistente context voor Claude Code. Lees dit eerst bij elke sessie.

---

## Project

Fotografie-portfolio voor **Monniek Westerop** (merk *Youniek Art*), gebouwd door **HitzDigital**.
Beeld-eerst, donker ontwerp, zelf-beheerbaar via Sanity. Zie `youniek-art-PRD.md` en `youniek-art-contentmodel.md`.

---

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4**
- **Sanity** (hosted) + **Sanity Studio** op `/studio`
- **next-sanity** + `@sanity/image-url`
- Hosting: **Vercel** (git push → live)

---

## Projectstructuur (richtlijn)

```
/app
  /(site)
    page.tsx                 # Home
    /portfolio/page.tsx      # Overzicht + filter
    /portfolio/[slug]/page.tsx
    /over-mij/page.tsx
    layout.tsx               # nav + footer
  /studio/[[...tool]]/page.tsx
/sanity
  schemas/                   # documenten + objecten
  lib/                       # client, image-url, queries (GROQ)
  structure.ts               # desk-structuur (NL labels)
/components
/lib
```

---

## Design tokens (vastgelegd — niet improviseren)

```css
--ink:    #0B0E11;   /* achtergrond, koel inkt-zwart */
--ink-2:  #11151A;   /* panels */
--paper:  #EAEFF1;   /* tekst, koel off-white */
--muted:  #8A949B;   /* bijschriften */
--accent: #7AE7EF;   /* cyaan — INGETOGEN gebruiken */
```

- **Koppen**: Cormorant Garamond (serif, licht/medium).
- **Menu / labels / wordmark**: Jost (sans, getrackt, uppercase voor labels).
- **Wordmark**: `Youniek·Art`.
- Accent alleen voor: menu-onderlijn, eyebrows, hover-states, kleine details. Foto's leveren de kleur.
- Micro-animaties subtiel; **`prefers-reduced-motion` respecteren**.
- Visuele referentie: `monniek-homepage-mockup.html`.

---

## Werkwijze (Nathaniel's voorkeuren)

- **Stop-points tussen fasen** — vraag bevestiging voordat je naar de volgende fase gaat.
- **Logica eerst, dan UI scherm-voor-scherm.**
- **Content-first**: bij elke pagina eerst de structuur/data, dan styling.
- **Plan → review → implementeer → commit → merge.**
- Werk in **feature branches**; commit klein en beschrijvend.
- Na merge: push naar Vercel = live.

---

## Bouwfasen (met stop-points)

> Stop na elke fase en vraag akkoord.

1. **Setup** — Next.js + Tailwind v4 + TS, Sanity-project aanmaken, Vercel koppelen, env-vars.
2. **Sanity-schema's** — objecten (`galleryImage`, `seo`) + documenten (`homePage`, `aboutPage`, `siteSettings`, `album`) + desk-structuur met NL-labels + validaties (alt verplicht, singletons).
3. **Data** — testalbums invoeren om tegenaan te bouwen.
4. **Front-end logica** — Sanity-client, GROQ-queries, TypeScript-types, routing.
5. **UI scherm-voor-scherm** — Home → Portfolio (+filter) → Album-detail → Over mij → nav/footer.
6. **Polish** — Next/Image + Sanity-CDN, SEO/metadata, sitemap, toegankelijkheid, animaties, responsive.
7. **Oplevering** — productie-deploy, domein, korte uitleg voor Monniek.

---

## Conventies

- TypeScript strict; geen `any` zonder reden.
- Server Components default; `use client` alleen waar nodig (filter, lightbox, hover-interacties).
- Alle beelden via Next/Image + Sanity image-url builder (gebruik hotspot).
- Alle zichtbare teksten via CMS-velden (i18n-ready voor EN later).
- Tailwind v4: design tokens als CSS-variabelen, geen losse hex-waarden in components.

---

## MVP-scope

In: Home · Portfolio (+filter) · Album-detail · Over mij · Studio.
Niet nu: Blog (Fase 2), EN-vertaling (Fase 2), contactformulier.

---

## Belangrijk

- ⚠️ Wacht met de definitieve hero/portfolio op **hoge-resolutie originelen** van Monniek (Instagram-export is te laag-res).
- Contact: `nieki.is@live.nl` + Instagram @you_niek.art.
- Categorie = vast dropdown-lijstje op album: Portret / Trouw / Natuur.

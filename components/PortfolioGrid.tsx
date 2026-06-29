'use client'

import { useMemo, useState } from 'react'
import { AlbumTile } from './AlbumTile'
import { CATEGORIES, type AlbumListItem, type Category } from '../sanity/lib/types'

type Filter = Category | 'Alles'

export function PortfolioGrid({ albums }: { albums: AlbumListItem[] }) {
  const [active, setActive] = useState<Filter>('Alles')

  // Alleen categorieën tonen die daadwerkelijk albums hebben.
  const available = useMemo(
    () => CATEGORIES.filter((c) => albums.some((a) => a.category === c)),
    [albums],
  )

  const filtered = useMemo(
    () => (active === 'Alles' ? albums : albums.filter((a) => a.category === active)),
    [albums, active],
  )

  const filters: Filter[] = ['Alles', ...available]

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-x-8 gap-y-3">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            data-active={active === f}
            className="nav-link"
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">Nog geen albums in deze categorie.</p>
      ) : (
        <div className="grid grid-cols-12 gap-[14px]">
          {filtered.map((album, i) => (
            <AlbumTile
              key={album._id}
              album={album}
              index={i}
              className="col-span-12 aspect-[4/5] sm:col-span-6 lg:col-span-4"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={i < 3}
            />
          ))}
        </div>
      )}
    </>
  )
}

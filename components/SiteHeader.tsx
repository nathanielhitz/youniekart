'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/over-mij', label: 'Over mij' },
]

function Wordmark({ text }: { text: string }) {
  const [before, after] = text.includes('·')
    ? [text.slice(0, text.indexOf('·')), text.slice(text.indexOf('·') + 1)]
    : [text, '']
  return (
    <span className="wordmark">
      {before}
      {after !== '' && <span>·</span>}
      {after}
    </span>
  )
}

export function SiteHeader({ wordmark = 'Youniek·Art' }: { wordmark?: string }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // sluit het mobiele menu bij route-wissel
  useEffect(() => setMenuOpen(false), [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(20px,5vw,64px)] transition-[background,padding] duration-[400ms] ${
        scrolled
          ? 'bg-ink/[0.86] py-[18px] backdrop-blur-[10px]'
          : 'bg-transparent py-[26px]'
      }`}
    >
      <Link href="/" aria-label="Youniek Art — home">
        <Wordmark text={wordmark} />
      </Link>

      {/* desktop nav */}
      <nav className="hidden md:block">
        <ul className="flex gap-[clamp(20px,3vw,46px)]">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="nav-link"
                data-active={isActive(item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* mobiel menu-knop */}
      <button
        type="button"
        className="text-[13px] uppercase tracking-[0.2em] md:hidden"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((o) => !o)}
      >
        {menuOpen ? 'Sluit' : 'Menu'}
      </button>

      {/* mobiel overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink/95 backdrop-blur-md md:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-base"
              data-active={isActive(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

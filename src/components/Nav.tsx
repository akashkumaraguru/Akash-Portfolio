import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { NAV_SECTIONS, PILL_NAV, PILL_NAV_SPLIT, SOCIALS, type PillNavItem } from '../data/nav'
import { scrollToId } from '../lib/lenis'
import { Container } from './Container'
import avatar from '../assets/hero/avatar.png'

/**
 * The nav turns solid as soon as anything can pass beneath it — a tall
 * threshold would let the dark skill ticker slide under a transparent bar.
 */
const SOLID_AFTER_PX = 16

/** Only the band crossing the middle of the viewport counts as the active section. */
const SPY_ROOT_MARGIN = '-45% 0px -50% 0px'

/** The hero. It owns the avatar in the centre of the pill, and it is where the page opens. */
const HOME_ID = 'home'

/** Shared by the label pill and the avatar halo so the highlight travels as one object. */
const PILL_SPRING = { type: 'spring', stiffness: 380, damping: 32 } as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // starts on the hero, so the highlight opens on the centre avatar
  const [activeId, setActiveId] = useState<string>(HOME_ID)

  useEffect(() => {
    // The glass state carries white labels, so it only reads against a dark
    // first screen. A hero declares itself dark with data-cursor-theme="light"
    // — the same marker the cursor reads. Without one (no hero, or a hero on a
    // light page) the nav starts solid, or the labels vanish into the page.
    const hasDarkFirstScreen =
      document.getElementById(HOME_ID)?.matches('[data-cursor-theme="light"]') ?? false

    function onScroll() {
      setScrolled(!hasDarkFirstScreen || window.scrollY > SOLID_AFTER_PX)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = [HOME_ID, ...PILL_NAV.flatMap((item) => ('id' in item ? [item.id] : []))]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: SPY_ROOT_MARGIN },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function go(id: string) {
    setOpen(false)
    scrollToId(id)
  }

  /** One pill link — a section jump or an outbound link. */
  function renderLink(item: PillNavItem) {
    const isActive = 'id' in item && activeId === item.id
    const className =
      'relative shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-[13px] transition-colors lg:px-2.5 lg:text-[15px] xl:px-3 xl:text-[17px]'

    const content = (
      <>
        {isActive && (
          <motion.span
            layoutId="nav-active-pill"
            transition={PILL_SPRING}
            className={clsx(
              'absolute inset-0 rounded-full',
              scrolled ? 'bg-brand-dim' : 'bg-white/25',
            )}
          />
        )}
        <span
          className={clsx(
            'relative transition-colors',
            // Over the hero video the plate is dark, so the ink gradient would
            // disappear into it; the labels go white until the nav solidifies.
            scrolled
              ? isActive
                ? 'text-brand-soft'
                : 'bg-gradient-to-b from-[#484848] via-[#0a0a0a] via-[55%] to-[#070707] bg-clip-text text-transparent transition-opacity hover:opacity-60'
              : isActive
                ? 'text-white'
                : 'text-white/80 hover:text-white',
          )}
        >
          {item.label}
        </span>
      </>
    )

    if ('href' in item) {
      return (
        <a key={item.label} href={item.href} className={className} style={{ fontFamily: 'var(--font-heading)' }}>
          {content}
        </a>
      )
    }

    return (
      <button
        key={item.id}
        onClick={() => go(item.id)}
        aria-current={isActive ? 'true' : undefined}
        className={className}
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {content}
      </button>
    )
  }

  return (
    <>
      {/* Desktop floating pill nav */}
      <header
        className={clsx(
          'fixed inset-x-0 z-50 hidden justify-center px-6 transition-[top] duration-500 lg:flex',
          scrolled ? 'top-5' : 'top-9',
        )}
      >
        <nav
          aria-label="Sections"
          className={clsx(
            'flex w-full max-w-[860px] items-center justify-between rounded-full border px-2 backdrop-blur-2xl transition-[background-color,border-color,box-shadow,height] duration-500 lg:px-[7px]',
            scrolled
              ? 'h-[44px] border-line-strong bg-ink/95 shadow-[0_8px_24px_-12px_rgba(14,14,16,0.35)] lg:h-[50px]'
              // frosted over the hero video: a white veil with a bright rim,
              // which is what actually reads as glass on a dark backdrop
              : 'h-[44px] border-white/25 bg-white/10 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] lg:h-[50px]',
          )}
        >
          {/* equal-width halves keep the avatar dead centre whatever the labels weigh */}
          <div className="contents lg:flex lg:flex-1 lg:items-center lg:justify-between">
            {PILL_NAV.slice(0, PILL_NAV_SPLIT).map(renderLink)}
          </div>

          <button
            onClick={() => go(HOME_ID)}
            aria-label="Back to home"
            aria-current={activeId === HOME_ID ? 'true' : undefined}
            className="relative mx-2.5 size-[34px] shrink-0 rounded-full transition-transform duration-300 hover:scale-105 lg:size-[40px]"
          >
            {activeId === HOME_ID && (
              <motion.span
                layoutId="nav-active-pill"
                transition={PILL_SPRING}
                className={clsx(
                  'absolute -inset-1 rounded-full',
                  scrolled ? 'bg-brand-dim' : 'bg-white/25',
                )}
              />
            )}
            <img
              src={avatar}
              alt=""
              className="relative size-full scale-110 overflow-hidden rounded-full object-cover"
            />
          </button>

          <div className="contents lg:flex lg:flex-1 lg:items-center lg:justify-between">
            {PILL_NAV.slice(PILL_NAV_SPLIT).map(renderLink)}
          </div>
        </nav>
      </header>

      {/* Mobile bar */}
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-50 flex backdrop-blur-xl transition-[background-color,border-color] duration-500 lg:hidden',
          scrolled || open ? 'border-b border-line bg-ink/95' : 'border-b border-transparent',
        )}
      >
        <Container className="flex h-[64px] items-center justify-between">
          <button
            onClick={() => go(HOME_ID)}
            className={clsx(
              'flex size-9 items-center justify-center overflow-hidden rounded-full border transition-colors duration-500',
              scrolled || open ? 'border-line-strong' : 'border-white/40',
            )}
            aria-label="Back to home"
          >
            <img src={avatar} alt="" className="size-full scale-110 object-cover" />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {/* dark bars vanish against the hero video until the bar solidifies */}
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              className={clsx(
                'block h-px w-5 transition-colors duration-500',
                scrolled || open ? 'bg-paper' : 'bg-white',
              )}
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              className={clsx(
                'block h-px w-5 transition-colors duration-500',
                scrolled || open ? 'bg-paper' : 'bg-white',
              )}
            />
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ink pt-[64px] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            {/* two columns from sm up: twelve full-size rows do not fit a phone screen */}
            <Container className="flex flex-1 flex-col justify-center py-4">
              <ol className="grid grid-cols-1 gap-x-10 sm:grid-cols-2" aria-label="Sections">
                {NAV_SECTIONS.map((s, i) => {
                  const isActive = activeId === s.id
                  return (
                    <motion.li
                      key={s.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.03, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-line"
                    >
                      <button
                        onClick={() => go(s.id)}
                        aria-current={isActive ? 'true' : undefined}
                        className="group flex w-full items-baseline gap-4 py-2 text-left"
                      >
                        <span
                          className={clsx(
                            'text-[11px] tabular-nums',
                            isActive ? 'text-brand-soft' : 'text-faint',
                          )}
                        >
                          {s.index}
                        </span>
                        <span
                          className={clsx(
                            'font-serif-italic text-[clamp(1.15rem,1rem+1.3vw,1.9rem)] leading-[1.25] transition-colors',
                            isActive ? 'text-brand-soft' : 'text-muted group-hover:text-paper',
                          )}
                        >
                          {s.label}
                        </span>
                      </button>
                    </motion.li>
                  )
                })}
              </ol>
            </Container>

            <Container className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-4 text-[12px] text-muted">
              <span>Design × AI × Product Thinking</span>
              <div className="flex flex-wrap gap-5">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} className="hover:text-paper">
                    {s.label}
                  </a>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

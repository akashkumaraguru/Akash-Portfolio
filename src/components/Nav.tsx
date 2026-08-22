import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { NAV_SECTIONS, PILL_NAV, PILL_NAV_SPLIT, SOCIALS, type PillNavItem } from '../data/nav'
import { scrollToId } from '../lib/lenis'
import { Container } from './Container'
import avatar from '../assets/hero/avatar.png'
import navAvatar from '../assets/hero/nav-avatar.png'
import arrowCta from '../assets/about/arrow-cta.svg'

/**
 * The nav turns solid as soon as anything can pass beneath it — a tall
 * threshold would let the dark skill ticker slide under a transparent bar.
 */
const SOLID_AFTER_PX = 16

/** Only the band crossing the middle of the viewport counts as the active section. */
const SPY_ROOT_MARGIN = '-45% 0px -50% 0px'

/** The hero. It owns the avatar in the centre of the pill, and it is where the page opens. */
const HOME_ID = 'home'

/** Drives the collapse between the full bar and the avatar-only one. */
const NAV_SPRING = { type: 'spring', stiffness: 260, damping: 30 } as const

/** Idle label: the frame's near-black vertical gradient, clipped to the text. */
const LINK_TEXT =
  'bg-gradient-to-b from-[#484848] via-[#0a0a0a] via-[55%] to-[#070707] bg-clip-text text-transparent'

/** The active section's name, in the frame's blue gradient. */
const ACTIVE_TEXT =
  'bg-gradient-to-b from-[#2567ff] via-[#1d54d4] via-[50%] to-[#1542aa] bg-clip-text text-transparent'

/** The frame's pill fill, shared by the Resume button and the About CTAs. */
const CTA_FILL = 'linear-gradient(180deg, #484848 0%, #0a0a0a 55%, #070707 100%)'

/** One link in the expanded bar. */
function PillLink({
  item,
  activeId,
  onGo,
}: {
  item: PillNavItem
  activeId: string
  onGo: (id: string) => void
}) {
  const isActive = 'id' in item && activeId === item.id
  const className = clsx(
    'shrink-0 whitespace-nowrap text-[15px] transition-opacity hover:opacity-60 xl:text-[17px]',
    isActive ? ACTIVE_TEXT : LINK_TEXT,
  )
  const style = { fontFamily: 'var(--font-heading)' }

  return 'href' in item ? (
    <a href={item.href} className={className} style={style}>
      {item.label}
    </a>
  ) : (
    <button
      onClick={() => onGo(item.id)}
      aria-current={isActive ? 'true' : undefined}
      className={className}
      style={style}
    >
      {item.label}
    </button>
  )
}

/** The frame's 185×60 Resume pill, scaled to the site's nav height. */
function ResumeButton() {
  return (
    // TODO: no resume file in the repo yet — inert until one is supplied.
    <span
      className="flex h-[44px] w-[136px] shrink-0 cursor-default items-center justify-center gap-2 rounded-[100px] p-2"
      style={{ background: CTA_FILL }}
    >
      <span
        className="text-[15px] leading-none text-white xl:text-[17px]"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Resume
      </span>
      <span className="grid size-7 shrink-0 place-content-center overflow-hidden rounded-full bg-[#fafaff]">
        <img src={arrowCta} alt="" aria-hidden className="size-[8px]" />
      </span>
    </span>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [moved, setMoved] = useState(false)
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
      const past = window.scrollY > SOLID_AFTER_PX
      setScrolled(!hasDarkFirstScreen || past)
      // Collapse tracks the scroll itself. `scrolled` cannot: it is forced true
      // on a light hero so the labels stay legible, which would leave the bar
      // collapsed before the page had moved at all.
      setMoved(past)
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

  /** The bar collapses to the avatar as soon as the page has moved. */
  const collapsed = moved
  /** Which section's name rides beside the avatar once collapsed. */
  const activeLabel = PILL_NAV.find((item) => 'id' in item && item.id === activeId)?.label ?? null

  return (
    <>
      {/* ---- Desktop pill: three states from the frame ----
          default   full bar, every link plus the Resume CTA
          scrolled  collapses to the avatar alone
          in-section  the active section's name sits beside the avatar */}
      <header className="fixed inset-x-0 top-6 z-50 hidden justify-center px-6 transition-[top] duration-500 lg:flex">
        <motion.nav
          layout
          aria-label="Sections"
          transition={NAV_SPRING}
          // The frame is drawn at 86px tall; the whole bar is scaled to ~0.74 of
          // that here. min-w is the frame's fixed collapsed width, scaled to match,
          // so the avatar-only state stays a pill rather than shrinking to a circle.
          className="flex h-[64px] min-w-[164px] items-center justify-center overflow-hidden rounded-[100px] border border-[#d5d5d5] bg-black/[0.02] px-[26px] backdrop-blur-2xl"
        >
          <motion.div layout className="flex h-[44px] items-center justify-center gap-[30px]">
            {!collapsed &&
              PILL_NAV.slice(0, PILL_NAV_SPLIT).map((item) => (
                <PillLink key={item.label} item={item} activeId={activeId} onGo={go} />
              ))}

            {/* The active section's name, shown only once the bar has collapsed. */}
            <AnimatePresence initial={false}>
              {collapsed && activeLabel && (
                <motion.span
                  key={activeLabel}
                  layout
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={NAV_SPRING}
                  className={clsx('overflow-hidden whitespace-nowrap text-[17px]', ACTIVE_TEXT)}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {activeLabel}
                </motion.span>
              )}
            </AnimatePresence>

            <motion.button
              layout
              onClick={() => go(HOME_ID)}
              aria-label="Back to home"
              aria-current={activeId === HOME_ID ? 'true' : undefined}
              className="size-[52px] shrink-0 overflow-hidden rounded-full transition-transform duration-300 hover:scale-105"
            >
              <img src={navAvatar} alt="" className="size-full object-cover" />
            </motion.button>

            {!collapsed && (
              <>
                {PILL_NAV.slice(PILL_NAV_SPLIT).map((item) => (
                  <PillLink key={item.label} item={item} activeId={activeId} onGo={go} />
                ))}
                <ResumeButton />
              </>
            )}
          </motion.div>
        </motion.nav>
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

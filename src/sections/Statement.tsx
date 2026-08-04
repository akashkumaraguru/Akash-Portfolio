import { Fragment, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import clsx from 'clsx'
import { Container } from '../components/Container'
import mosaic from '../assets/statement/mosaic-landscape.jpg'

/** Shown first, then handed over to the second statement partway down the section. */
const STATEMENT_ONE =
  'Crafting end-to-end digital products that solve real user problems, drive business growth, and balance user needs, business objectives, and technical feasibility.'
const STATEMENT_TWO_LEAD = 'From concept to launch,'
const STATEMENT_TWO_BODY =
  'I design and build digital products that balance user needs, business goals, and technical feasibility'

/** Extra height beyond the pinned viewport — the room the handover happens in. */
const SECTION_HEIGHT = 'h-[220vh]'
/** Scroll progress at which the second statement takes over from the first. */
const HANDOVER_AT = 0.45

/** Cells across and down the tile grid — matches the pitch of the mosaic artwork. */
const GRID_COLS = 36
const GRID_ROWS = 10
/** How many cells light up at any time. Kept sparse so the effect stays a shimmer. */
const TWINKLE_COUNT = 30
const TWINKLE_PEAK_OPACITY = 0.55

/** Seconds between neighbouring words as the sentence fades in. */
const WORD_STAGGER = 0.045

/**
 * Deterministic stand-in for Math.random: the same index always yields the same
 * cell, so the pattern is stable across renders and never reshuffles mid-animation.
 */
function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

const TWINKLE_TILES = Array.from({ length: TWINKLE_COUNT }, (_, i) => ({
  col: Math.floor(pseudoRandom(i + 1) * GRID_COLS),
  row: Math.floor(pseudoRandom(i + 101) * GRID_ROWS),
  delay: pseudoRandom(i + 201) * 6,
  duration: 3.5 + pseudoRandom(i + 301) * 3.5,
}))

const sentence: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: WORD_STAGGER, delayChildren: 0.06 } },
  gone: { transition: { staggerChildren: 0.012 } },
}

/** Fade with a touch of rise and defocus — the blur is what makes it read as soft. */
const word: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  gone: {
    opacity: 0,
    y: -8,
    filter: 'blur(4px)',
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  },
}

/**
 * Words fade in one after another. The spaces are real text nodes, not margins —
 * margin-spaced words look right but come out of innerText as
 * "Craftingend-to-enddigital…", which is what copy-paste and screen readers get.
 */
function FadingWords({ text }: { text: string }) {
  return (
    <span className="block">
      {text.split(' ').map((token, i) => (
        <Fragment key={i}>
          <motion.span variants={word} className="inline-block will-change-[opacity,transform]">
            {token}
          </motion.span>{' '}
        </Fragment>
      ))}
    </span>
  )
}

const STATEMENT_CLASS =
  'col-start-1 row-start-1 max-w-[1120px] text-[clamp(1.25rem,0.75rem+2.8vw,3.25rem)] font-semibold leading-[1.3] tracking-[-0.025em] text-paper'

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  /** Parallax: the mosaic travels slower than the page, so the band feels deeper. */
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  /**
   * Which statement is on screen. A single boolean rather than scroll-linked
   * opacity, so each statement plays its own word-by-word fade on arrival
   * instead of the whole block tracking the scrollbar.
   */
  const [showSecond, setShowSecond] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setShowSecond(value >= HANDOVER_AT)
  })

  return (
    <section ref={sectionRef} aria-label="What I do" className={`relative ${SECTION_HEIGHT} bg-ink`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* mosaic plate — the sky photo again, tiled, drifting on its own and on scroll */}
        <motion.img
          src={mosaic}
          alt=""
          aria-hidden
          style={{ y: backgroundY }}
          className="pointer-events-none absolute inset-0 -z-10 h-[120%] w-full -translate-y-[10%] object-cover"
          initial={{ x: '0%', scale: 1.12 }}
          animate={{ x: ['-3%', '3%', '-3%'], scale: [1.12, 1.2, 1.12] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* individual cells lighting up and fading, on the mosaic's own grid */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          {TWINKLE_TILES.map((tile, i) => (
            <motion.span
              key={i}
              className="absolute bg-brand/25"
              style={{
                left: `${(tile.col / GRID_COLS) * 100}%`,
                top: `${(tile.row / GRID_ROWS) * 100}%`,
                width: `${100 / GRID_COLS}%`,
                height: `${100 / GRID_ROWS}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, TWINKLE_PEAK_OPACITY, 0] }}
              transition={{
                duration: tile.duration,
                delay: tile.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* feathered edges so the band melts into the page instead of butting against it */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(180deg, var(--color-ink) 0%, transparent 22%, transparent 78%, var(--color-ink) 100%)',
          }}
        />

        <Container>
          {/* both statements share one grid cell so the swap never shifts layout */}
          <div className="grid">
            <motion.p
              variants={sentence}
              initial="hidden"
              animate={showSecond ? 'gone' : 'show'}
              className={clsx(STATEMENT_CLASS, showSecond && 'pointer-events-none')}
            >
              <FadingWords text={STATEMENT_ONE} />
            </motion.p>

            <motion.p
              variants={sentence}
              initial="hidden"
              animate={showSecond ? 'show' : 'hidden'}
              aria-hidden
              className={clsx(STATEMENT_CLASS, !showSecond && 'pointer-events-none')}
            >
              <FadingWords text={STATEMENT_TWO_LEAD} />
              <FadingWords text={STATEMENT_TWO_BODY} />
            </motion.p>
          </div>
        </Container>
      </div>
    </section>
  )
}

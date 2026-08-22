import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'
import clsx from 'clsx'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { CARD_FRAME, cqw, MEETUPS, meetupPhoto, type Meetup } from '../data/meetups'

/**
 * Hide the broken image but keep its slot. Removing the slot entirely — which
 * this used to do — collapsed a card whose photos had not been supplied yet into
 * a blank slab. The slot keeps its tinted plate instead, so the composition
 * still reads and a photo dropped in later simply fills it.
 */
const hideBrokenImage = (e: { currentTarget: HTMLImageElement }) => {
  e.currentTarget.style.visibility = 'hidden'
}

/** The photos stagger in behind their card as it arrives. */
const card: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const photo: Variants = {
  hidden: { opacity: 0, scale: 1.04, y: 24 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

/**
 * The pill's fill. The frame uses a soft dark gradient, lighter through the
 * middle-left — the exact stops are not readable without `get_design_context`,
 * so these are matched by eye off the node's own render.
 */
const CTA_FILL = 'linear-gradient(103deg, #3b3b3b 0%, #262626 42%, #141414 100%)'

/**
 * Outbound arrow, 15×15 in the frame. A plain glyph, so it is drawn rather than
 * shipped as an asset. Dark, since it sits on the pill's white disc.
 */
function ArrowIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 15 15" fill="none" aria-hidden className={className} style={style}>
      <path
        d="M4 11L11 4M11 4H5.4M11 4V9.6"
        stroke="#1a1a1a"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * The collage. The frame scatters each event's photos at bespoke overlapping
 * offsets, which cannot survive a narrower screen — so the density is kept but
 * expressed as a grid: the first photo takes a tall two-row cell the way the
 * frame's does, and the rest flow around it.
 */
function Collage({ meetup }: { meetup: Meetup }) {
  return (
    <ul className="grid min-h-0 flex-1 auto-rows-fr grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: meetup.photos }, (_, i) => (
        <motion.li
          key={i}
          variants={photo}
          className={clsx('overflow-hidden rounded-[14px] bg-black/5', i === 0 && 'row-span-2')}
        >
          <img
            src={meetupPhoto(meetup.id, i)}
            alt={`${meetup.name} — photo ${i + 1}`}
            loading="lazy"
            onError={hideBrokenImage}
            className="size-full object-cover"
          />
        </motion.li>
      ))}
    </ul>
  )
}

/**
 * Node 1194:2743, reproduced to its own measurements.
 *
 * The card is aspect-locked to the frame's 1256×666 and declares
 * `container-type: inline-size`, so every value below can be stated in the
 * frame's own pixels via `cqw()` and the whole composition scales as one piece.
 * Nothing here reflows — the frame is the only one the design provides.
 */
function FrameCard({ meetup }: { meetup: Meetup }) {
  const layout = meetup.layout ?? []

  const cta = (
    <>
      <span
        className="absolute whitespace-nowrap font-medium text-white"
        // 17px SemiBold reproduces the frame's 150px text node exactly.
        style={{
          left: cqw(27.73),
          top: cqw(20.25),
          fontSize: cqw(17),
          lineHeight: cqw(20),
          fontWeight: 600,
        }}
      >
        View LinkedIn Post
      </span>
      <span
        className="absolute grid place-content-center rounded-full bg-white"
        style={{ left: cqw(188.73), top: cqw(15.25), width: cqw(30), height: cqw(30) }}
      >
        <ArrowIcon style={{ width: cqw(15), height: cqw(15) }} />
      </span>
    </>
  )

  return (
    // The query container is this wrapper, not the card. An element cannot be
    // its own container, so a `cqw` radius set on the card itself resolves
    // against an ancestor instead — it measured 27.3px rather than 24.
    <div
      style={{
        containerType: 'inline-size',
        aspectRatio: `${CARD_FRAME.width} / ${CARD_FRAME.height}`,
      }}
    >
      <motion.article
        variants={card}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative size-full overflow-hidden"
        // Card fill, radius and shadow straight off the frame's own node — the
        // radius is 14px, not the 24 I had been carrying.
        style={{
          background: '#f1f1f1',
          borderRadius: cqw(14),
          boxShadow:
            '0px 0.602px 0.602px -1.25px rgba(0,0,0,0.07), 0px 2.289px 2.289px -2.5px rgba(0,0,0,0.06), 0px 10px 10px -3.75px rgba(0,0,0,0.03)',
        }}
      >
        {/* Photos first, so the header sits over them as it does in the frame.
          Photo 1 runs past the card's bottom edge; the card's clip crops it. */}
        {layout.map(({ crop, z, ...box }, i) => {
          const [cw, ch, cl, ct] = crop ?? [100, 100, 0, 0]
          return (
            <motion.div
              key={i}
              variants={photo}
              aria-hidden
              // The plate is on the slot, not the image, so a photo that has not
              // been supplied still shows where it belongs instead of a hole.
              className="absolute overflow-hidden bg-black/[0.07]"
              style={{ ...box, borderRadius: cqw(8), zIndex: z }}
            >
              {/* The frame clips rather than fits: the image is laid into the
                  slot at its own size and offset, which is what `object-fit`
                  cannot reproduce. */}
              {/* Not lazy: the cards move sideways under a pinned section, so a
                  lazy image only starts fetching once its card has already slid
                  into view — you reach the card before the photo does. */}
              <img
                src={meetupPhoto(meetup.id, i)}
                alt=""
                decoding="async"
                onError={hideBrokenImage}
                className="absolute max-w-none"
                style={{ width: `${cw}%`, height: `${ch}%`, left: `${cl}%`, top: `${ct}%` }}
              />
            </motion.div>
          )
        })}

        {meetup.logo && (
          <img
            src={meetup.logo.src}
            alt=""
            aria-hidden
            className="pointer-events-none absolute object-contain"
            style={meetup.logo.rect}
          />
        )}

        {/* Type solved from the frame's own text-node widths across all 11
            cards: 22px Medium at -0.0295em fits them to 0.69px RMS. At 24px the
            titles render ~15% wide of the frame. */}
        <h3
          className="absolute z-10 whitespace-nowrap font-medium text-paper"
          style={{
            left: cqw(40),
            top: cqw(42.5),
            fontSize: cqw(22),
            lineHeight: cqw(31),
            letterSpacing: '-0.0295em',
          }}
        >
          {meetup.name}
        </h3>
        <p
          className="absolute z-10 whitespace-nowrap text-muted"
          style={{ left: cqw(40), top: cqw(73.5), fontSize: cqw(16), lineHeight: cqw(24) }}
        >
          {meetup.location} 📍
        </p>

        {/* 236×60 at (980, 40), fully rounded. The fill is a soft dark gradient,
          lighter through the middle — see the note in the section README. */}
        {meetup.href ? (
          <a
            href={meetup.href}
            target="_blank"
            rel="noreferrer"
            className="absolute z-10 block transition-transform duration-200 hover:scale-[1.02]"
            style={{
              left: cqw(980),
              top: cqw(40),
              width: cqw(236),
              height: cqw(60),
              borderRadius: cqw(30),
              background: CTA_FILL,
            }}
          >
            {cta}
          </a>
        ) : (
          <span
            className="absolute z-10 block cursor-default"
            style={{
              left: cqw(980),
              top: cqw(40),
              width: cqw(236),
              height: cqw(60),
              borderRadius: cqw(30),
              background: CTA_FILL,
            }}
          >
            {cta}
          </span>
        )}
      </motion.article>
    </div>
  )
}

/**
 * The ten cards the frame has not been drawn for yet: same content, laid out on
 * a grid until each one's own arrangement is available.
 */
function GridCard({ meetup }: { meetup: Meetup }) {
  const label = (
    <>
      View LinkedIn Post
      <span className="grid size-[30px] place-content-center rounded-full bg-white">
        <ArrowIcon className="size-[15px]" />
      </span>
    </>
  )

  return (
    <motion.article
      variants={card}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-panel p-5 sm:p-7 lg:p-10"
    >
      <header className="relative z-10 mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-[20px] font-medium leading-snug tracking-[-0.01em] text-paper sm:text-[24px]">
            {meetup.name}
          </h3>
          <p className="mt-1 text-[15px] text-muted sm:text-[16px]">{meetup.location} 📍</p>
        </div>

        {/* Inert until a post URL is supplied, rather than a link to nowhere. */}
        {meetup.href ? (
          <a
            href={meetup.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-paper py-2 pl-6 pr-2 text-[15px] font-medium text-white transition-transform hover:scale-[1.03]"
          >
            {label}
          </a>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-paper/40 py-2 pl-6 pr-2 text-[15px] font-medium text-white">
            {label}
          </span>
        )}
      </header>

      <Collage meetup={meetup} />
    </motion.article>
  )
}

/** A card the frame has been drawn for renders to it; the rest use the grid. */
function MeetupCard({ meetup }: { meetup: Meetup }) {
  return meetup.layout ? <FrameCard meetup={meetup} /> : <GridCard meetup={meetup} />
}

/**
 * The cards run sideways while the section is pinned: the track is one viewport
 * tall per card, and the strip inside it is translated by the scroll through
 * that track.
 *
 * The clip lives on the sticky pane itself, not on an ancestor — `overflow:
 * hidden` on anything above a sticky element makes that element the scroll
 * container and the pinning silently stops working.
 */
function HorizontalTrack() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  /** One card is already on screen, so the strip only travels the other n-1. */
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(MEETUPS.length - 1) * 100}vw`])

  return (
    <div ref={trackRef} className="relative" style={{ height: `${MEETUPS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.ul style={{ x }} className="flex h-full">
          {MEETUPS.map((meetup) => (
            <li
              key={meetup.id}
              // flex, not `grid place-content-center`: that sizes the column to
              // its content, so the card's `w-full` resolved against a shrunken
              // column and it collapsed to a fraction of the screen.
              className="flex h-full w-screen shrink-0 items-center justify-center px-4 py-16 sm:px-6 lg:px-10"
            >
              {/* The frame's card is 1256×666; holding that ratio is what keeps
                  the scatter's percentages landing where they were drawn. */}
              <div className="aspect-[1256/666] max-h-full w-full max-w-[1256px]">
                <MeetupCard meetup={meetup} />
              </div>
            </li>
          ))}
        </motion.ul>

        {/* How far through the gallery the reader is. */}
        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-8 h-[5px] origin-left bg-brand"
        />
      </div>
    </div>
  )
}

/** The same cards stacked, for reduced-motion readers and very small screens. */
function StackedList() {
  return (
    <Container>
      <div className="grid gap-5 md:gap-6">
        {MEETUPS.map((meetup) => (
          // Each card rises as it is scrolled to, rather than the whole strip
          // moving sideways.
          <motion.div
            key={meetup.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <MeetupCard meetup={meetup} />
          </motion.div>
        ))}
      </div>
    </Container>
  )
}

/**
 * The pinned sideways gallery is a desktop behaviour: on a phone it turns one
 * screen of content into eleven screens of vertical scrolling to move sideways,
 * which reads as the page being stuck. Below md the cards simply stack.
 */
function useIsNarrow() {
  const [narrow, setNarrow] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(max-width: 767px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const onChange = (e: MediaQueryListEvent) => setNarrow(e.matches)
    setNarrow(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return narrow
}

export function Meetups() {
  const reduceMotion = useReducedMotion()
  const isNarrow = useIsNarrow()
  const stacked = isNarrow || reduceMotion

  return (
    <section id="events" aria-label="Meetup Diary" className="bg-ink py-16 md:py-20">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="The Community Behind the Journey"
          title="Meetup Diary"
          description="Exploring ideas, meeting inspiring people, and capturing moments from the design and tech community."
        />
      </Container>

      <div className="mt-12 md:mt-14">{stacked ? <StackedList /> : <HorizontalTrack />}</div>
    </section>
  )
}

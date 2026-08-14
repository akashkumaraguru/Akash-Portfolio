import { Fragment } from 'react'
import { motion, type Variants } from 'framer-motion'
import cornerAccents from '../assets/statement/corner-accents.svg'
import barElements from '../assets/statement/bar-elements.svg'

const HEADLINE = 'Designing Products with Clarity, Purpose, and Impact'
const BODY =
  'I believe great products are built at the intersection of user needs, business goals, and technical feasibility. My approach combines product thinking, thoughtful design, and hands-on building to create experiences that are intuitive, scalable, and genuinely useful.'

/** Seconds between neighbouring words as a line fades in. */
const WORD_STAGGER = 0.045

/**
 * Decorative bands, as fractions of the 1440×786 frame they were drawn in.
 * Both SVGs export with preserveAspectRatio="none", so they stretch to whatever
 * width the section is — which is the intent: they are full-bleed edge artwork.
 */
const ACCENTS_BAND = { top: '-0.38%', height: '71.43%' }
const BAR_BAND = { top: '78.41%', height: '21.97%' }

const sentence: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: WORD_STAGGER, delayChildren: 0.06 } },
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
}

/**
 * Words fade in one after another. The spaces are real text nodes, not margins —
 * margin-spaced words look right but come out of innerText as
 * "TurningComplexProblems…", which is what copy-paste and screen readers get.
 */
function FadingWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((token, i) => (
        <Fragment key={i}>
          <motion.span variants={word} className="inline-block will-change-[opacity,transform]">
            {token}
          </motion.span>{' '}
        </Fragment>
      ))}
    </>
  )
}

export function Statement() {
  return (
    // data-cursor-theme marks the section dark: the cursor dot goes white here,
    // the same marker the nav reads to decide its own contrast.
    <section
      aria-label="What I do"
      data-cursor-theme="light"
      // 15.4vw lands on the design's 222px content offset at 1440.
      className="relative w-full overflow-hidden bg-black py-[clamp(3rem,15.4vw,13.875rem)]"
    >
      {/* Pixel-block corners and the dot field down the right edge. */}
      <img
        src={cornerAccents}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 w-full"
        style={ACCENTS_BAND}
      />

      {/* Stepped bar along the bottom edge. */}
      <img
        src={barElements}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 w-full"
        style={BAR_BAND}
      />

      {/* Not the site Container: the artwork is full-bleed, so the copy's inset
          has to be measured from the section edge too, or it lands on the corner
          blocks. 14vw is the design's 202/1440 gutter, floored for narrow screens. */}
      <div className="relative mx-auto w-full max-w-[1440px] px-[clamp(1.25rem,14vw,202px)]">
        <motion.div
          variants={sentence}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          // 982 of the 1440 frame — the copy stops well short of the dot field.
          className="flex max-w-[982px] flex-col gap-5"
        >
          <h2
            className="text-[clamp(1.75rem,1.3rem+3vw,4rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <FadingWords text={HEADLINE} />
          </h2>

          <p
            className="text-[clamp(1rem,0.7rem+1.5vw,2rem)] font-normal leading-[1.25] text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <FadingWords text={BODY} />
          </p>
        </motion.div>
      </div>
    </section>
  )
}

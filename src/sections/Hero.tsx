import { motion } from 'framer-motion'
import { Magnetic } from '../components/Magnetic'
import { ToolDock } from '../components/ToolDock'
import { CONTACT_EMAIL } from '../data/nav'
import { HALFTONE } from '../lib/textures'
import { useTypewriter, type TypedPhrase } from '../hooks/useTypewriter'
import { VantaClouds } from '../components/VantaClouds'
import sky from '../assets/hero/sky-landscape.jpg'
import vercelIcon from '../assets/hero/vercel-icon.svg'
import figmaIcon from '../assets/hero/figma-icon.svg'
import geminiIcon from '../assets/hero/gemini-icon.svg'
import claudeIcon from '../assets/hero/claude-icon.svg'
import antigravityIcon from '../assets/hero/antigravity-icon.svg'
import adobeIcon from '../assets/hero/adobe-icon.svg'
import xcodeIcon from '../assets/hero/xcode-icon.svg'
import terminalIcon from '../assets/hero/terminal-icon.svg'
import linkedinIcon from '../assets/hero/linkedin-icon.svg'
import dribbbleIcon from '../assets/hero/dribbble-icon.svg'
import behanceIcon from '../assets/hero/behance-icon.svg'
import githubIcon from '../assets/hero/github-icon.svg'

const ICONS: Record<string, string> = {
  figma: figmaIcon,
  gemini: geminiIcon,
  claude: claudeIcon,
  antigravity: antigravityIcon,
  adobe: adobeIcon,
  xcode: xcodeIcon,
  terminal: terminalIcon,
  vercel: vercelIcon,
  linkedin: linkedinIcon,
  dribbble: dribbbleIcon,
  behance: behanceIcon,
  github: githubIcon,
}

/** Fixed opener — only what follows it is typed and retyped. */
const HEADLINE_PREFIX = "Hey, I'm "

/** The tail of the headline cycles through these, typed and erased in turn. */
const HEADLINES: TypedPhrase[] = [
  [{ text: 'Akash Kumaraguru', bold: true }],
  [{ text: 'a Product Designer.', bold: true }],
  [{ text: 'a Product </Builder>', bold: true }],
]

/**
 * Reveal choreography, in seconds. All of it hangs off the intro panel's exit
 * (IntroAnimation's EXIT_AT), so the hero uncovers exactly as the panel slides off.
 */
const REVEAL_DELAY = 1.4
const DOCK_DELAY = 1.7

/** Typing starts as the intro panel clears, in step with the rest of the hero. */
const HEADLINE_START_DELAY = REVEAL_DELAY * 1000

/** Both readings of the headline — what a screen reader announces instead of the typing. */
const HEADLINE_LABEL = HEADLINES.map(
  (phrase) => HEADLINE_PREFIX + phrase.map((segment) => segment.text).join(''),
).join(' — ')

/**
 * The widest phrase. An invisible copy of it reserves the tail's width so the
 * prefix stays put instead of sliding around as the line grows and shrinks.
 */
const HEADLINE_WIDEST = HEADLINES.map((phrase) => phrase.map((s) => s.text).join('')).reduce(
  (widest, phrase) => (phrase.length > widest.length ? phrase : widest),
)

export function Hero() {
  const { segments, isBusy, showCaret } = useTypewriter(HEADLINES, HEADLINE_START_DELAY)

  return (
    // Full-bleed: the cloud field is the page's first screen, not a card on it.
    <section
      id="home"
      data-cursor-theme="light"
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
    >
      {/* Live WebGL cloud field, sized exactly to the section. Vanta builds its
          sky dome to fit the element it is given: over-sizing the canvas leaves
          the dome short of the corners and a hard diagonal seam shows through. */}
      <VantaClouds className="absolute inset-0" fallbackSrc={sky} />

      {/* print-halftone dot screen over the clouds */}
      <div className="pointer-events-none absolute inset-0" style={HALFTONE} />

      {/* Keeps the copy legible, and grades out the cloud deck. Vanta always
          renders that deck edge-on, so below the horizon the frame is a flat
          grey slab with a hard line across it; fading it down softens the line
          and gives the dock something to sit on. Kept light: this is a daytime
          sky, and a heavy wash turns the white deck to mud. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 54% at 50% 40%, rgba(6,18,44,0.26), transparent 76%), linear-gradient(180deg, rgba(6,18,44,0.30) 0%, transparent 20%, transparent 54%, rgba(10,22,46,0.24) 76%, rgba(12,22,42,0.58) 100%)',
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.1, delayChildren: REVEAL_DELAY }}
          className="flex flex-col items-center"
        >
          {/* min-height reserves the tallest phrase so the button below never jumps */}
          <h1
            aria-label={HEADLINE_LABEL}
            className="min-h-[2.1em] max-w-[26ch] text-[clamp(1.6rem,0.9rem+3.4vw,5.625rem)] font-medium leading-[1.05] tracking-[-0.045em] text-white sm:min-h-[1.05em]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span aria-hidden>
              {HEADLINE_PREFIX}
              <span className="inline-grid">
                <span className="invisible col-start-1 row-start-1 whitespace-pre font-bold">
                  {HEADLINE_WIDEST}
                </span>
                <span className="col-start-1 row-start-1 justify-self-start whitespace-pre">
                  {segments.map((segment, i) => (
                    <span key={i} className={segment.bold ? 'font-bold' : undefined}>
                      {segment.text}
                    </span>
                  ))}
                  {showCaret && (
                    <motion.span
                      className="ml-[0.06em] inline-block h-[0.78em] w-[0.045em] translate-y-[0.06em] bg-white/90"
                      animate={isBusy ? { opacity: 1 } : { opacity: [1, 0, 1] }}
                      transition={
                        isBusy ? { duration: 0.1 } : { duration: 1, repeat: Infinity, ease: 'linear' }
                      }
                    />
                  )}
                </span>
              </span>
            </span>
          </h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
            className="mt-3 text-[clamp(1.1rem,0.9rem+1.2vw,3rem)] tracking-[-0.03em] text-white/90"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Designer by passion. Builder by curiosity.
            <span className="font-serif-italic">Creating clarity from complexity.</span>
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
            className="mt-8"
          >
            <Magnetic>
              {/* opens mail — there is no contact section to scroll to */}
              <a
                href={CONTACT_EMAIL}
                className="inline-block rounded-full bg-white px-9 py-4 text-[15px] font-medium tracking-[-0.01em] text-[#0a0a0a] shadow-lg transition-transform hover:scale-[1.03]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Say Helloo!!
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* bottom rail: the dock, centred, and nothing else competing with it */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-6 md:pb-8">
        <ToolDock icons={ICONS} delay={DOCK_DELAY} />
      </div>
    </section>
  )
}

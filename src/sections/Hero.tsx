import { motion } from 'framer-motion'
import { Magnetic } from '../components/Magnetic'
import { ToolBadge } from '../components/ToolBadge'
import { TOOL_BADGES } from '../data/badges'
import { CONTACT_EMAIL } from '../data/nav'
import { HALFTONE } from '../lib/textures'
import { useTypewriter, type TypedPhrase } from '../hooks/useTypewriter'
import { VantaClouds } from '../components/VantaClouds'
import sky from '../assets/hero/sky-landscape.jpg'
import hexTop from '../assets/hero/hexagon-top.svg'
import hexBottom from '../assets/hero/hexagon-bottom.svg'
import blob from '../assets/hero/decorative-blob.svg'
import vercelIcon from '../assets/hero/vercel-icon.svg'
import figmaIcon from '../assets/hero/figma-icon.svg'
import geminiIcon from '../assets/hero/gemini-icon.svg'
import claudeIcon from '../assets/hero/claude-icon.svg'
import linkedinIcon from '../assets/hero/linkedin-icon.svg'
import dribbbleIcon from '../assets/hero/dribbble-icon.svg'
import behanceIcon from '../assets/hero/behance-icon.svg'
import githubIcon from '../assets/hero/github-icon.svg'

const ICONS: Record<string, string> = {
  figma: figmaIcon,
  gemini: geminiIcon,
  claude: claudeIcon,
  vercel: vercelIcon,
}

/**
 * The credits row's social links. Each icon is a complete tile — its own
 * rounded, coloured background — so it fills its slot rather than sitting on a
 * plate the way the loose tool artwork does.
 */
const SOCIAL_LINKS: { label: string; icon: string; href?: string }[] = [
  { label: 'LinkedIn', icon: linkedinIcon, href: 'https://www.linkedin.com/in/akash-kumaraguru/' },
  // TODO: no Dribbble URL on file — renders without a link until one is supplied.
  { label: 'Dribbble', icon: dribbbleIcon },
  { label: 'Behance', icon: behanceIcon, href: 'https://www.behance.net/akashkumaraguru' },
  { label: 'GitHub', icon: githubIcon, href: 'https://github.com/Akashkumaraguru' },
]

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
const BADGE_DELAY = 1.7
const BADGE_STAGGER = 0.09
const FOOTER_DELAY = 1.9

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
    <section id="home" className="relative overflow-hidden bg-ink pb-10 pt-[130px] md:pt-[150px]">
      {/* decorative background layers */}
      <img
        src={hexTop}
        alt=""
        className="pointer-events-none absolute -left-[8%] -top-[22%] w-[115%] max-w-none opacity-[0.35]"
      />
      <img
        src={hexBottom}
        alt=""
        className="pointer-events-none absolute -left-[10%] bottom-[-30%] w-[115%] max-w-none opacity-[0.35]"
      />
      <img
        src={blob}
        alt=""
        className="pointer-events-none absolute -left-[22%] top-[2%] w-[32%] max-w-none opacity-70"
      />
      <img
        src={blob}
        alt=""
        className="pointer-events-none absolute -right-[22%] -top-[6%] w-[32%] max-w-none scale-x-[-1] opacity-70"
      />

      <div className="relative mx-auto max-w-[1360px] px-5 lg:px-10">
        {/* card frame — badges anchor to the photo card, never to the footer row below */}
        <div className="relative">
          {/* floating tool badges */}
          {TOOL_BADGES.map((badge, i) => (
            <ToolBadge key={badge.id} badge={badge} icon={ICONS[badge.id]} delay={BADGE_DELAY + i * BADGE_STAGGER} />
          ))}

          {/* rounded photo card */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] sm:aspect-[16/10] sm:rounded-[64px] lg:aspect-[1318/557] lg:rounded-[100px]">
            {/* Static plate underneath: it carries the first paint and stays visible
                if WebGL is unavailable or the visitor asked for reduced motion. */}
            <img src={sky} alt="" className="absolute inset-0 size-full object-cover" />

            {/* live WebGL cloud field */}
            <VantaClouds className="absolute inset-0" />

            {/* print-halftone dot screen over the clouds */}
            <div className="pointer-events-none absolute inset-0" style={HALFTONE} />

            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(60% 50% at 50% 55%, rgba(0,0,0,0.18), transparent 70%)' }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
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
                              isBusy
                                ? { duration: 0.1 }
                                : { duration: 1, repeat: Infinity, ease: 'linear' }
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
                  Designer by passion. Builder by curiosity.<span className="font-serif-italic">Creating clarity from complexity.</span>
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
                      className="inline-block rounded-full bg-gradient-to-b from-[#484848] via-[55%] via-[#0a0a0a] to-[#070707] px-9 py-4 text-[15px] font-medium tracking-[-0.01em] text-white shadow-lg transition-transform hover:scale-[1.03]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Say Helloo!!
                    </a>
                  </Magnetic>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* footer credits row — lg margin clears the badges hanging off the card's bottom edge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: FOOTER_DELAY, duration: 0.6 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-24"
        >
          <ul className="flex shrink-0 items-center gap-3">
            {SOCIAL_LINKS.map(({ label, icon, href }) => {
              const art = (
                // No radius here: each tile draws its own rounded rect, and
                // they don't agree — GitHub's is 12.5%, Dribbble's 27%. One CSS
                // value would clip the squarer ones.
                <img src={icon} alt="" className="size-[26px] transition-transform hover:scale-110" />
              )
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                      {art}
                    </a>
                  ) : (
                    // Unlinked, so it needs to announce itself rather than stay decorative.
                    <span role="img" aria-label={label}>
                      {art}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
          <div className="hidden h-px min-w-6 flex-1 bg-paper/70 sm:mx-8 sm:block" />
          <p
            className="shrink-0 text-center text-[12px] font-bold uppercase leading-[1.6] tracking-[0.06em] text-paper/80 sm:text-right lg:whitespace-pre"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {'/ Designer × AI.   / Figma × Claude X Vercel.'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

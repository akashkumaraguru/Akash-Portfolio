import { PRODUCT_DESIGN_CRAFT } from '../data/skills'

/** The bar is tipped off true so it reads as a strip laid over the page. */
const TILT_DEGREES = -1.7
/** Overhang past the viewport, so the tilted ends never expose a corner. */
const BAR_WIDTH = '106vw'
/**
 * Seconds of travel per label. Deriving the duration from the list length keeps
 * the scroll at a readable pace no matter how many skills the list grows to —
 * a fixed duration would speed up every time an entry is added.
 */
const SECONDS_PER_ITEM = 1.6
const MARQUEE_DURATION = `${PRODUCT_DESIGN_CRAFT.length * SECONDS_PER_ITEM}s`

function CraftRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex h-[72px] shrink-0 items-center gap-12 pr-12"
    >
      {PRODUCT_DESIGN_CRAFT.map((craft) => (
        <li key={craft} className="flex items-center gap-4">
          <span
            className="whitespace-nowrap text-[24px] font-semibold leading-[72px] tracking-[-0.05em] text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {craft}
          </span>
          <span className="size-2 shrink-0 rounded-full bg-white/40" />
        </li>
      ))}
    </ul>
  )
}

export function SkillTicker() {
  return (
    <section
      aria-label="Product design craft"
      className="relative overflow-hidden bg-ink py-10 md:py-12"
    >
      <div
        className="mx-auto border-y border-black/10 bg-black py-px"
        style={{ width: BAR_WIDTH, transform: `rotate(${TILT_DEGREES}deg)` }}
      >
        <div className="flex overflow-hidden">
          {/* two identical rows; the track slides exactly one row-width, so the seam never shows */}
          <div
            className="flex w-max animate-marquee hover:[animation-play-state:paused]"
            style={{ animationDuration: MARQUEE_DURATION }}
          >
            <CraftRow />
            <CraftRow hidden />
          </div>
        </div>
      </div>
    </section>
  )
}

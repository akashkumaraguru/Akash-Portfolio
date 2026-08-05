/**
 * The tools behind the work, as they appear in the hero dock. `purpose` is what
 * the tooltip says after the name — "Claude — Building".
 *
 * Every logo is full-colour or dark artwork on transparency, so tiles default to
 * a light plate. Override `gradient` only for a logo that needs a dark one.
 */
export type DockApp = {
  id: string
  name: string
  purpose: string
  gradient?: string
  /** Present on the social tiles — they navigate rather than just sit there. */
  href?: string
  /** Draws the dock's running-app dot beneath the tile. */
  running?: boolean
  /**
   * The artwork is already a complete tile — its own rounded, coloured
   * background — so it fills the slot instead of sitting on a plate.
   */
  bleed?: boolean
}

/**
 * Near-black plate, the way these four ship their own app icons. The rest keep
 * the light default because their artwork is dark or saturated — Terminal and
 * Vercel are solid black glyphs and would vanish on a dark tile.
 */
const DARK_PLATE = 'from-[#2b2b30] via-[#161618] to-[#0a0a0b]'

export const DOCK_APPS: DockApp[] = [
  { id: 'figma', name: 'Figma', purpose: 'Designing', gradient: DARK_PLATE },
  { id: 'gemini', name: 'Gemini', purpose: 'Researching', gradient: DARK_PLATE },
  { id: 'claude', name: 'Claude', purpose: 'Building', gradient: DARK_PLATE },
  { id: 'antigravity', name: 'Antigravity', purpose: 'AI IDE', gradient: DARK_PLATE, running: true },
  { id: 'adobe', name: 'Creative Cloud', purpose: 'Retouching' },
  { id: 'xcode', name: 'Xcode', purpose: 'Prototyping' },
  { id: 'terminal', name: 'Terminal', purpose: 'Shipping' },
  { id: 'vercel', name: 'Vercel', purpose: 'Deploying' },
]

/**
 * The second half of the dock, past the divider — where a real dock keeps the
 * things that aren't apps. These navigate, so each carries an href.
 */
export const DOCK_SOCIALS: DockApp[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    purpose: 'Connecting',
    href: 'https://www.linkedin.com/in/akash-kumaraguru/',
    running: true,
    bleed: true,
  },
  // TODO: no Dribbble URL on file — tile is inert until one is supplied.
  { id: 'dribbble', name: 'Dribbble', purpose: 'Posting', running: true, bleed: true },
  {
    id: 'behance',
    name: 'Behance',
    purpose: 'Showcasing',
    href: 'https://www.behance.net/akashkumaraguru',
    running: true,
    bleed: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    purpose: 'Committing',
    href: 'https://github.com/Akashkumaraguru',
    running: true,
    bleed: true,
  },
]

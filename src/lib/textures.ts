import type { CSSProperties } from 'react'

/** Dot pitch of the halftone screen, in px. Small enough to read as print grain. */
const HALFTONE_PITCH = '4px'
const HALFTONE_DOT = 'rgba(255, 255, 255, 0.22)'

/**
 * Print-style halftone screen laid over the sky photo, in the hero card and the
 * loading panel alike. `overlay` keeps the dots visible on the blue midtones
 * without washing out the white cloud tops.
 */
export const HALFTONE: CSSProperties = {
  backgroundImage: `radial-gradient(${HALFTONE_DOT} 1px, transparent 1px)`,
  backgroundSize: `${HALFTONE_PITCH} ${HALFTONE_PITCH}`,
  mixBlendMode: 'overlay',
}

/** Cell size of the case-study line grid. Large enough to read as drafting paper. */
const GRID_PITCH = '96px'
const GRID_LINE = 'rgba(14, 14, 16, 0.055)'
/** Fades the grid out top and bottom so it never butts against the next section. */
const GRID_FADE = 'linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)'

/**
 * Faint line art behind the case-study stack — the drafting-grid backdrop the
 * Figma frame used, rebuilt in CSS so it carries no asset dependency.
 */
export const LINE_GRID: CSSProperties = {
  backgroundImage: `
    linear-gradient(to right, ${GRID_LINE} 1px, transparent 1px),
    linear-gradient(to bottom, ${GRID_LINE} 1px, transparent 1px)
  `,
  backgroundSize: `${GRID_PITCH} ${GRID_PITCH}`,
  maskImage: GRID_FADE,
  WebkitMaskImage: GRID_FADE,
}

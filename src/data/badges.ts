export type ToolBadge = {
  id: string
  eyebrow: string
  name: string
  gradient: string
  rotate: number
  position: string
}

/**
 * Offsets are relative to the hero photo card, not the page container.
 * They stay inside the 20px page gutter up to 2xl; only past 1536px — where the
 * 1360px container leaves real slack — do the badges hang further out.
 */
export const TOOL_BADGES: ToolBadge[] = [
  {
    id: 'figma',
    eyebrow: 'Design',
    name: 'Figma',
    gradient: 'from-[#000000] via-[#142722] to-[#0B1F1A]',
    rotate: -9.51,
    position: '-left-5 -top-12 2xl:-left-14 2xl:-top-14',
  },
  {
    id: 'gemini',
    eyebrow: 'Research',
    name: 'Gemini',
    gradient: 'from-[#7bacfa] via-[#4285f4] to-[#366fce]',
    rotate: 14.55,
    position: '-right-5 -top-9 2xl:-right-12 2xl:-top-10',
  },
  {
    id: 'vercel',
    eyebrow: 'Deploy',
    name: 'Vercel',
    gradient: 'from-[#fcfcfd] via-[#c6c6c6] to-[#f5f5f5]',
    rotate: 9.27,
    position: '-left-5 -bottom-9 2xl:-left-16 2xl:-bottom-10',
  },
  {
    id: 'claude',
    eyebrow: 'Building',
    name: 'Claude',
    gradient: 'from-[#e8a089] via-[#d97757] to-[#b76348]',
    rotate: 9.27,
    position: '-right-5 -bottom-9 2xl:-right-14 2xl:-bottom-10',
  },
]

export const CONTACT_EMAIL = 'mailto:hello@akashkumaraguru.com'

/**
 * Sections listed in the mobile menu.
 *
 * NOTE: only `home`, `work` and `skills` are currently mounted in App.tsx — the
 * sections behind events / philosophy / experience were removed. Their entries
 * stay here so the menu matches the desktop pill; `scrollToId` no-ops on a
 * missing element, so the links are inert rather than broken until those
 * sections come back.
 */
export const NAV_SECTIONS = [
  { id: 'home', label: 'Home', index: '00' },
  { id: 'work', label: 'Case study', index: '01' },
  { id: 'skills', label: 'Skills.md', index: '02' },
  { id: 'events', label: 'Meetup Diary', index: '03' },
  { id: 'philosophy', label: 'Playground', index: '04' },
  { id: 'experience', label: 'Who am I?', index: '05' },
] as const

/**
 * The floating pill. An item either scrolls to a section (`id`) or opens a link
 * (`href`). The avatar sits at PILL_NAV_SPLIT, so keep the two halves even.
 */
export type PillNavItem = { label: string; id: string } | { label: string; href: string }

export const PILL_NAV: PillNavItem[] = [
  { label: 'Case study', id: 'work' },
  { label: 'Skills.md', id: 'skills' },
  { label: 'Meetup Diary', id: 'events' },
  // ── avatar sits here ──
  { label: 'Who am I?', id: 'experience' },
  { label: 'Playground', id: 'philosophy' },
]

/** Where the avatar breaks the link row in two. */
export const PILL_NAV_SPLIT = 3

export const SOCIALS = [
  { label: 'Email', href: CONTACT_EMAIL },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/akash-kumaraguru/' },
  { label: 'GitHub', href: 'https://github.com/Akashkumaraguru' },
  { label: 'Behance', href: 'https://www.behance.net/akashkumaraguru' },
]


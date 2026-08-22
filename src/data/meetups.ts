/**
 * The Meetup Diary, from Figma node 1205:3526 ("Events Gallery") — one card per
 * event, in the frame's own order, each with the frame's own photo arrangement.
 *
 * `photos` is a count rather than a list of filenames: the images are numbered
 * per event, so the paths are derived. They live under public/ so a photo that
 * has not been exported yet 404s quietly instead of breaking the build. See
 * public/meetups/README.md.
 *
 * Every rect below is in the frame's own pixels against a 1256×666 card. The
 * frame nests photos at three depths — loose in the section, inside the
 * 40×40-inset "Content Block", or inside a bounding Group — so the numbers are
 * normalised to section coordinates here and cross-checked against the earlier
 * flat metadata for the same artwork.
 */

/**
 * One photo's box, in `cqw` against the card's own width. The card is
 * aspect-locked to the frame, so a width-relative unit scales vertical offsets
 * correctly too and the whole composition stays 1:1 with the design.
 */
export type PhotoRect = {
  left: string
  top: string
  width: string
  height: string
  /**
   * The frame's own image crop, as `[width%, height%, left%, top%]` of the slot.
   * Figma does not scale a photo to fit — it positions the full image inside a
   * clipping box, so a 261% height with a -96% top is a deliberate close crop.
   * `object-fit` cannot express that; only these four numbers can.
   */
  crop?: [number, number, number, number]
  /**
   * Paint order, when it differs from the numbering. Rects stay in photo-number
   * order so `layout[i]` keeps pointing at `(i+1).jpg`; this restacks them.
   */
  z?: number
}

export type Meetup = {
  id: string
  name: string
  location: string
  /** How many photos the card's collage has, counted off the frame. */
  photos: number
  /**
   * The frame's arrangement, one rect per photo in photo-number order. Cards
   * without a layout fall back to a grid.
   */
  layout?: PhotoRect[]
  /** An event mark the frame places on the card. Only Madrasters has one. */
  logo?: { src: string; rect: PhotoRect }
  /** The post the card links out to. Absent until the URL is supplied. */
  href?: string
}

/** The frame's card, and the basis every measurement below is expressed against. */
export const CARD_FRAME = { width: 1256, height: 666 }

/** px in the frame → cqw against the card's width. */
export const cqw = (px: number) => `${((px / CARD_FRAME.width) * 100).toFixed(4)}cqw`

type RectOptions = Pick<PhotoRect, 'crop' | 'z'>

/** px rect in the frame → the same rect in cqw. */
const rect = (x: number, y: number, w: number, h: number, opts: RectOptions = {}): PhotoRect => ({
  left: cqw(x),
  top: cqw(y),
  width: cqw(w),
  height: cqw(h),
  ...opts,
})

/** Ordered as the frame stacks them, top to bottom. 50 photos across the 11. */
export const MEETUPS: Meetup[] = [
  {
    id: 'shoptalk-school',
    name: 'Shoptalk School Design Edition',
    location: 'paperflite, Chennai',
    photos: 4,
    // 1 is the wide backdrop and runs past the card's bottom edge.
    layout: [
      rect(27, 159, 1198, 773),
      rect(444, 111, 395, 421, { crop: [100.0, 166.59, 0.0, -27.14] }),
      rect(839, 182, 366, 371, { crop: [100.04, 131.54, -0.02, -31.54] }),
      rect(40, 252, 402, 294, { crop: [143.41, 261.26, -17.56, -96.32] }),
    ],
  },
  {
    id: 'madrasters',
    name: 'Madrasters Core member',
    location: 'Zeta, Bangalore',
    photos: 4,
    layout: [
      rect(289.6, 359.9, 543, 306),
      rect(296.6, 120.9, 494, 278),
      rect(790.6, 120.9, 662, 372),
      rect(40, 124, 275, 488),
    ],
    // Node 1205:3581 — the Madrasters mark, bottom right.
    logo: { src: '/meetups/madrasters/logo.svg', rect: rect(1130.6, 521.9, 98, 60) },
  },
  {
    id: 'lollypop-designathon',
    name: 'Lollypop Designathon 2025',
    location: 'Lollypop Studio, Bangalore',
    photos: 6,
    layout: [
      rect(328, 107, 238, 358),
      rect(40, 112, 283, 411, { crop: [100.07, 153.04, -0.03, -36.01] }),
      rect(134, 438, 474.667, 356),
      rect(553, 112, 742, 375, { crop: [100.0, 148.4, 0.0, -48.33] }),
      rect(591, 453, 244, 214, { crop: [100.0, 152.02, 0.0, -51.95] }),
      rect(821, 355, 404, 303),
    ],
  },
  {
    id: 'figma-config-watch-party',
    name: 'Figma Config Watch party, Friends of Figma',
    location: 'Freshworks, Bangalore',
    photos: 5,
    layout: [
      rect(738, 413, 248, 311),
      rect(930, 141, 420, 525),
      rect(438, 136, 424, 530),
      rect(842, 136, 332, 414),
      rect(32, 141, 432, 539),
    ],
  },
  {
    id: 'devfest-2025',
    name: 'Google Developer Devfest - 2025',
    location: 'IIT Madras, Chennai',
    photos: 5,
    layout: [
      rect(872, 203, 384, 480),
      rect(29, 116, 442, 552),
      rect(468, 102, 348, 435),
      rect(487, 330, 433, 542),
      rect(813, 116, 313, 391),
    ],
  },
  {
    id: 'the-clan',
    name: 'The Clan Event',
    location: 'Lollypop Studio, Bangalore',
    photos: 3,
    // The frame paints 2 first, then 1 over it, then 3 on top.
    layout: [
      rect(40, 115, 434, 542, { z: 2 }),
      rect(474, 115, 441, 551, { z: 1 }),
      rect(915, 115, 433, 542, { z: 3 }),
    ],
  },
  {
    id: 'umo',
    name: 'UMO Design Event',
    location: 'Accenture, Bangalore',
    photos: 4,
    layout: [
      rect(40, 124, 246, 436),
      rect(242, 124, 677, 541),
      rect(893, 124, 379, 543),
      rect(40, 518, 436, 231, { crop: [100.0, 149.87, 0.0, -49.83] }),
    ],
  },
  {
    id: 'design-led-transformation',
    name: 'Future of Design-Led Enterprise Transformation',
    location: 'IBM, Bangalore',
    photos: 6,
    layout: [
      rect(1060, 422, 258.066, 244),
      rect(40, 136, 536, 267),
      rect(40, 379, 536, 271, { crop: [100.29, 149.13, -0.15, -49.13] }),
      rect(576, 436, 544, 215, { crop: [100.0, 233.22, 0.0, -73.63] }),
      rect(879, 136, 692, 300, { crop: [100.0, 172.97, 0.0, -72.97] }),
      rect(576, 136, 440, 330),
    ],
  },
  {
    id: 'cubbon-design',
    name: 'Cubbon Design Casual meetup',
    location: 'Cubbon Park, Bangalore',
    photos: 4,
    layout: [
      rect(40, 165, 446, 446),
      rect(357, 118, 513, 513),
      rect(871, 118, 367, 190),
      rect(871, 308, 374, 374),
    ],
  },
  {
    id: 'friends-of-figma-navi',
    name: 'Friends of Figma X Navi',
    location: 'Navi Office, Bangalore',
    photos: 4,
    layout: [
      rect(919, 472, 398, 298),
      rect(34, 121, 449, 561),
      rect(483, 107, 448, 559),
      rect(931, 121, 375, 500),
    ],
  },
  {
    id: 'google-connect-io',
    name: 'Google Connect IO Extended',
    location: 'Ford, Chennai',
    photos: 5,
    layout: [
      rect(122, 353, 1144, 594, { crop: [100.0, 240.74, 0.0, -74.92] }),
      rect(856, 124, 438, 478, { crop: [100.0, 114.54, 0.0, -14.49] }),
      rect(524, 124, 329, 412),
      rect(470, 249, 612, 439, { crop: [100.0, 174.46, 0.0, -74.4] }),
      rect(40, 128, 487, 501, { crop: [100.0, 121.3, 0.0, -21.3] }),
    ],
  },
]

/** Photos are numbered 1..n inside a folder named for the event. */
export const meetupPhoto = (id: string, index: number) => `/meetups/${id}/${index + 1}.jpg`

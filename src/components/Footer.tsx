import { CONTACT_EMAIL } from '../data/nav'
import arrowLink from '../assets/about/arrow-link.svg'

const TAGLINE =
  'Product Designer based in Bangalore, exploring design, development, and community through meaningful digital experiences.'

const EMAIL = 'dev.iamakash@gmail.com'
const PHONE = '+9345509223'

/**
 * The frame draws each link's label twice and its arrow twice, one pair offset
 * out of view — that is a roll-over: on hover the label slides up to its own
 * duplicate while the arrow leaves top-right and a second enters bottom-left.
 */
const LINKS: { label: string; href?: string; download?: boolean }[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/akash-kumaraguru/' },
  // TODO: no Instagram URL on record — inert until one is supplied.
  { label: 'Instagram' },
  // TODO: no resume file in the repo yet.
  { label: 'Download Resume', download: true },
]

function LinkArrows() {
  return (
    <span aria-hidden className="relative block size-5 overflow-hidden">
      <img
        src={arrowLink}
        alt=""
        className="absolute inset-0 size-5 transition-transform duration-300 ease-out group-hover/link:-translate-y-full group-hover/link:translate-x-full"
      />
      <img
        src={arrowLink}
        alt=""
        className="absolute inset-0 size-5 translate-x-[-100%] translate-y-full transition-transform duration-300 ease-out group-hover/link:translate-x-0 group-hover/link:translate-y-0"
      />
    </span>
  )
}

function FooterLink({ label, href, download }: { label: string; href?: string; download?: boolean }) {
  const body = (
    <>
      {/* Two copies stacked; the track slides one label-height on hover. */}
      <span className="relative block h-[22px] overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover/link:-translate-y-[22px]">
          <span className="block h-[22px] leading-[22px]">{label}</span>
          <span className="block h-[22px] leading-[22px]">{label}</span>
        </span>
      </span>
      <LinkArrows />
    </>
  )

  const className =
    'group/link flex h-[46px] flex-1 items-center justify-center gap-3 rounded-[12px] bg-black px-6 py-3 text-[16px] tracking-[-0.03em] text-white'

  return href ? (
    <a
      href={href}
      {...(download ? { download: '' } : { target: '_blank', rel: 'noreferrer' })}
      className={className}
    >
      {body}
    </a>
  ) : (
    <span className={`${className} cursor-default opacity-70`}>{body}</span>
  )
}

export function Footer() {
  return (
    // #111, straight from the frame.
    <footer className="overflow-hidden bg-[#111] text-white">
      {/* Tagline bar */}
      <div className="border-t border-white/10 px-6 py-8 md:px-10">
        <p className="mx-auto max-w-[1320px] text-center text-[18px] font-light leading-[32px] tracking-[-0.04em] md:text-[24px]">
          {TAGLINE}
        </p>
      </div>

      {/* Social row */}
      <div className="px-6 pb-10 pt-6 md:px-10">
        <div className="mx-auto flex max-w-[1390px] flex-col gap-1.5 rounded-[16px] bg-white/[0.01] p-1.5 sm:flex-row">
          {LINKS.map((link) => (
            <FooterLink key={link.label} {...link} />
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 py-10 md:px-10 md:py-[60px]">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-[20px] font-semibold leading-[31.2px] tracking-[-0.04em] md:text-[24px]">
            Akash Kumaraguru
          </p>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-2.5">
            <a
              href={CONTACT_EMAIL}
              className="text-[17px] font-light leading-[32px] tracking-[-0.04em] transition-opacity hover:opacity-70 md:text-[24px]"
            >
              {EMAIL}
            </a>
            {/* The frame's separator is a rotated rule between the two. */}
            <span aria-hidden className="hidden h-9 w-px bg-white/25 sm:block" />
            <a
              href={`tel:${PHONE}`}
              className="text-[17px] font-light leading-[32px] tracking-[-0.04em] transition-opacity hover:opacity-70 md:text-[24px]"
            >
              {PHONE}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

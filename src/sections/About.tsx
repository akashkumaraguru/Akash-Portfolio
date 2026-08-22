import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { CONTACT_EMAIL } from '../data/nav'
import arrowCta from '../assets/about/arrow-cta.svg'

/** Served from public/: it is a photograph, not part of the module graph. */
const PROFILE_SRC = '/about/profile.jpg'

const HEADING =
  'Hiii, I’m Akash, from Bangalore. I currently work as a UXUI Designer at Gnapi Technologies'

/**
 * Three bio blocks, exactly as the frame breaks them. The first carries an
 * internal break, which is a blank line in the design rather than two nodes.
 */
const BIO = [
  [
    'a Product Designer interested in building meaningful digital products that are simple, useful, and thoughtful. I enjoy turning ideas into clear user experiences, from early concepts and wireframes to polished interfaces.',
    'I also create website banners and visual assets and support visual campaigns, collaborating closely with marketing, developers, and PMs.',
  ],
  [
    'I’m part of the Madraster Community core team in Banglore, a, where I actively engage with the local design and developer ecosystem. Through attending and contributing to design and development events, I keep learning from the community, exchanging ideas, and staying close to how people build meaningful digital products.',
  ],
  [
    'I specialize in Figma, Claude, Framer, Blender, Rive, Spline, Lovable, and Bolt, and use AI tools like ChatGPT, Gemini, Uizard, and Firefly for ideation and prototyping.',
  ],
]

/** The frame's pill: a near-black vertical gradient, not a flat fill. */
const BUTTON_FILL =
  'linear-gradient(180deg, #484848 0%, #0a0a0a 55%, #070707 100%)'

function CtaButton({ label, href, download }: { label: string; href?: string; download?: boolean }) {
  const inner = (
    <>
      <span className="text-[20px] leading-none text-white sm:text-[24px]">{label}</span>
      <span className="grid size-9 shrink-0 place-content-center overflow-hidden rounded-[23px] bg-[#fafaff]">
        <img src={arrowCta} alt="" aria-hidden className="size-[9.56px]" />
      </span>
    </>
  )

  const className =
    'inline-flex h-[60px] items-center justify-center gap-2 rounded-[100px] p-3 pl-6 transition-transform duration-200 hover:scale-[1.02]'

  // Inert until a destination is supplied, rather than a link to nowhere.
  return href ? (
    <a
      href={href}
      {...(download ? { download: '' } : { target: '_blank', rel: 'noreferrer' })}
      className={className}
      style={{ background: BUTTON_FILL }}
    >
      {inner}
    </a>
  ) : (
    <span className={`${className} opacity-60`} style={{ background: BUTTON_FILL }}>
      {inner}
    </span>
  )
}

export function About() {
  return (
    // #fafafa, straight from the frame.
    <section id="experience" aria-label="About" className="bg-[#fafafa] py-16 md:py-[68px]">
      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-center lg:gap-[60px]">
          {/* 693 of the frame's 1320 column. */}
          <div className="flex w-full flex-col items-start gap-[33px] lg:w-[693px]">
            <div className="flex flex-col items-start gap-[9px]">
              <Reveal>
                <h2 className="max-w-[630px] text-[20px] font-semibold leading-[1.4] tracking-[-0.04em] text-black sm:text-[24px]">
                  {HEADING}
                </h2>
              </Reveal>

              <div className="flex flex-col items-start gap-[9px]">
                {BIO.map((block, i) => (
                  <Reveal key={i} delay={0.06 * (i + 1)}>
                    <div className={i > 0 ? 'pt-5' : undefined}>
                      {block.map((paragraph, j) => (
                        <p
                          key={j}
                          className="max-w-[630px] text-[17px] font-semibold leading-[30px] tracking-[-0.04em] text-black/60 sm:text-[20px]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.24}>
              <div className="flex flex-wrap items-center gap-[18px]">
                {/* TODO: no detailed-story page or resume file on record yet. */}
                <CtaButton label="Detailed story" />
                <CtaButton label="Resume" />
              </div>
            </Reveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[567px] shrink-0"
          >
            <img
              src={PROFILE_SRC}
              alt="Akash Kumaraguru"
              className="aspect-[567/678] w-full rounded-[8.4px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { CONTACT_EMAIL }

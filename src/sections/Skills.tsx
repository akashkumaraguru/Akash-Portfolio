import type { ReactNode } from 'react'
import clsx from 'clsx'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SKILL_TOOLS } from '../data/skillsDock'
import { BUILDING_SKILLS, CORE_SKILLS } from '../data/skillGroups'

/**
 * A few of the marks are trademarked artwork the repo does not have yet. Drop
 * the whole tile rather than the image alone — hiding just the image leaves an
 * empty plate sitting in the grid, which reads as a gap rather than as absence.
 */
const dropTileOnError = (e: { currentTarget: HTMLImageElement }) => {
  const tile = e.currentTarget.closest('li')
  if (tile) tile.style.display = 'none'
}

/** Each panel carries its own tint, so the two read as a set rather than a stack. */
const TINTS = {
  core: '#dce4ea',
  tools: '#fae4d0',
} as const

/** One bento panel. Radius is the case-study card's, so the two sit together. */
function Panel({
  title,
  hint,
  tint,
  className,
  children,
}: {
  title: string
  hint: string
  tint: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={clsx('flex flex-col rounded-[28px] p-6 md:p-8', className)}
      // Tinted, so no border: the plate is its own edge and a line on top of it
      // reads as a second one.
      style={{ backgroundColor: tint }}
    >
      <h3 className="text-[19px] font-medium tracking-[-0.01em] text-paper">{title}</h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{hint}</p>
      <div className="mt-6">{children}</div>
    </section>
  )
}

/**
 * Skill name as a chip. White rather than the panel grey it used to be — on a
 * tinted plate a grey chip is too close in value to separate from it.
 */
function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full bg-white/70 px-3 py-1.5 text-[13px] text-paper">{children}</li>
  )
}

/**
 * Two panels: what the craft is, and what it is made and shipped with. Uneven
 * spans on purpose — Core skills carries the most content, so it takes two
 * columns and Tools sits beside it.
 */
function Bento() {
  return (
    <div className="mt-12 grid gap-4 md:grid-cols-3">
      <Panel
        title="Core skills"
        hint="The craft, in the order the work happens."
        tint={TINTS.core}
        className="md:col-span-2"
      >
        <ul className="flex flex-wrap gap-2">
          {CORE_SKILLS.map((skill) => (
            <Chip key={skill}>{skill}</Chip>
          ))}
        </ul>

        <h4 className="mt-7 text-[15px] font-medium tracking-[-0.01em] text-paper">
          Building skills
        </h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {BUILDING_SKILLS.map((skill) => (
            <Chip key={skill}>{skill}</Chip>
          ))}
        </ul>
      </Panel>

      <Panel title="Tools" hint="What the work gets made and shipped with." tint={TINTS.tools}>
        <ul className="grid grid-cols-4 gap-3">
          {SKILL_TOOLS.map((tool) => (
            <li
              key={tool.id}
              title={tool.name}
              className={clsx(
                'flex aspect-square items-center justify-center overflow-hidden rounded-[22%]',
                tool.dark
                  ? 'bg-gradient-to-b from-[#2b2b30] via-[#161618] to-[#0a0a0b]'
                  : 'bg-gradient-to-b from-white via-[#f5f5f7] to-[#e8e8ec]',
              )}
            >
              <img
                src={tool.icon}
                alt={tool.name}
                onError={dropTileOnError}
                className="size-[62%] object-contain"
              />
            </li>
          ))}
        </ul>
      </Panel>

    </div>
  )
}

export function Skills() {
  return (
    // Warm off-white, straight from the frame.
    <section id="skills" aria-label="Skills" className="bg-[#fcfbf9] py-16 md:py-20">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="The Skills Behind the Work"
          title="Think. Design. Build."
          description="A multidisciplinary skill set that blends product strategy, user experience, visual design, and hands-on development to create intuitive, scalable digital products"
        />
        <Reveal delay={0.12}>
          <Bento />
        </Reveal>
      </Container>
    </section>
  )
}

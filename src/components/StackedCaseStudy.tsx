import clsx from 'clsx'
import type { Project } from '../data/projects'
import { ProjectCover } from './ProjectCover'

/**
 * Tag tints, cycled by position so a card's pills never repeat a colour and the
 * same project always renders the same way.
 */
const TAG_TINTS = [
  'bg-[#efe6fd] text-[#7c3aed]',
  'bg-[#e3efff] text-[#2563eb]',
  'bg-[#ffeede] text-[#ea7317]',
  'bg-[#fde7f5] text-[#db2777]',
  'bg-[#e4f7ea] text-[#15803d]',
]

/**
 * Tags are capped so they stay on one row. A second row costs ~50px of card
 * height, which on a 720px-tall laptop comes straight out of the artwork.
 */
const MAX_TAGS = 5

/**
 * One case study, pinned for a full viewport. Every panel sticks to the same
 * `top: 0` at the same height, so each new one lands exactly over the last —
 * the whole effect is CSS, with nothing driven off scroll position.
 */
export function StackedCaseStudy({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  const headline = project.headline ?? project.tagline
  const tags = (project.scope ?? project.tools).slice(0, MAX_TAGS)

  return (
    // pt clears the fixed nav — the panel pins at top-0, so without it the card
    // slides under the pill. pb keeps the same breathing room at the bottom.
    // Aligned to start, not centred: the panel is a full screen tall, so
    // centring a fixed-height card left slack that grew with the viewport —
    // 152px of it at 1200px tall, all of it read as a gap under the heading.
    <figure className="md:sticky md:top-0 md:grid md:h-screen md:content-start md:justify-center md:pt-[104px] md:pb-8">
      <button
        onClick={onOpen}
        aria-label={`View project — ${project.name}`}
        data-cursor="View Project"
        // Fixed height, with the plate absorbing whatever the copy does not use.
        // Equal heights are what make one card land exactly on the last — uneven
        // ones leave the previous card's footer peeking out below.
        className="group flex w-full flex-col bg-white text-left md:h-[min(760px,calc(100vh-9rem))] md:w-[min(1040px,calc(100vw-5rem))]"
      >
        {/* tinted plate — the artwork is inset in it, not bleeding off its edge.
            min-height keeps the artwork legible when a short laptop viewport
            leaves the flex row little to share out. */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[28px] bg-[#e3ecfb] p-6 md:min-h-[300px] md:p-8 lg:p-10">
          <ProjectCover
            project={project}
            index={index}
            className="aspect-[16/9] w-full rounded-[16px] transition-transform duration-700 group-hover:-translate-y-1.5 md:h-full md:w-auto md:min-w-full"
          />
        </div>

        {/* pb keeps the CTA off the card's bottom edge */}
        <div className="shrink-0 pt-6 pb-2 lg:pt-7">
          {project.status && (
            <span className="mb-6 inline-flex h-9 w-fit items-center rounded-full border border-[#1d1e2c] px-4 text-[13px] font-semibold tracking-[-0.04em] text-[#1d1e2c]">
              {project.status}
            </span>
          )}

          <h3
            className="max-w-[52ch] text-[clamp(1.2rem,0.85rem+1.2vw,2rem)] leading-[1.25] tracking-[-0.01em] text-paper"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {headline}
          </h3>

          <p className="mt-3 max-w-[80ch] text-[clamp(0.95rem,0.85rem+0.45vw,1.125rem)] leading-[1.5] text-muted">
            {project.tagline}
          </p>

          <ul className="mt-6 flex flex-wrap gap-3">
            {tags.map((tag, i) => (
              <li
                key={tag}
                className={clsx(
                  'rounded-full px-5 py-2.5 text-[14px] font-medium',
                  TAG_TINTS[i % TAG_TINTS.length],
                )}
              >
                {tag}
              </li>
            ))}
          </ul>

          {/* The whole card is the control; this is its visible affordance, so it
              is a span rather than a nested button. */}
          <span className="mt-8 flex w-fit items-center gap-2.5 rounded-full bg-[#1d1e2c] px-6 py-3.5 text-[14px] font-semibold tracking-[-0.01em] text-white transition-colors group-hover:bg-black">
            View Project
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </button>
    </figure>
  )
}

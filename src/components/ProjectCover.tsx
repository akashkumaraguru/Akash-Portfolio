import { motion } from 'framer-motion'
import clsx from 'clsx'
import type { Project } from '../data/projects'

/** Seconds for one column to travel its own height; each column runs a little slower. */
const WALL_BASE_DURATION = 26
const WALL_DURATION_STEP = 5

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
}

/**
 * Columns of phone screens drifting upward. Each column repeats its images twice
 * and travels exactly half its height, so the loop is seamless.
 */
function MockupWall({ columns }: { columns: string[][] }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="flex h-full justify-center gap-2 px-3">
        {columns.map((column, i) => (
          <motion.div
            key={i}
            className="flex w-[23%] max-w-[145px] shrink-0 flex-col gap-2"
            style={{ marginTop: i % 2 === 0 ? '-14%' : '-30%' }}
            animate={{ y: ['0%', '-50%'] }}
            transition={{
              duration: WALL_BASE_DURATION + i * WALL_DURATION_STEP,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...column, ...column].map((src, j) => (
              <img key={j} src={src} alt="" className="w-full" loading="lazy" />
            ))}
          </motion.div>
        ))}
      </div>
      {/* the design washes the wall back so the copy stays dominant */}
      <div className="pointer-events-none absolute inset-0 bg-white/20" />
    </div>
  )
}

/** Stand-in artwork for projects that have no cover screenshot yet. */
function GeneratedCover({ project, index }: { project: Project; index?: number }) {
  return (
    <>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(14,14,16,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,14,16,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <motion.span
        variants={{ hover: { scale: 1.06, opacity: 0.16 } }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif-italic pointer-events-none absolute -bottom-4 -right-2 text-[9rem] leading-none text-paper opacity-10"
      >
        {initials(project.name)}
      </motion.span>
      {index !== undefined && (
        <span className="absolute left-5 top-5 text-[13px] tracking-[0.1em] text-faint">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
    </>
  )
}

/**
 * A project's artwork, whichever kind it has. Shared by the grid card and the
 * case-study page so both stay in step when a project gains a real cover.
 */
export function ProjectCover({
  project,
  index,
  className,
}: {
  project: Project
  index?: number
  className?: string
}) {
  // No background of its own — the caller owns it, so artwork can sit on a tint.
  return (
    <div className={clsx('relative overflow-hidden', className)}>
      {project.coverMockups ? (
        <MockupWall columns={project.coverMockups} />
      ) : project.cover ? (
        <motion.img
          src={project.cover}
          alt=""
          variants={{ hover: { scale: 1.03 } }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={clsx(
            'size-full',
            project.coverFit === 'contain' ? 'p-10 object-contain' : 'object-cover object-top',
          )}
        />
      ) : (
        <GeneratedCover project={project} index={index} />
      )}

      {project.badge && (
        <span className="absolute right-4 top-4 rounded-[35px] bg-[#0596ff] px-5 py-2 text-[12px] font-bold tracking-[-0.06em] text-[#fafaff]">
          {project.badge}
        </span>
      )}
    </div>
  )
}

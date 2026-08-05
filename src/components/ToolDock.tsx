import { motion } from 'framer-motion'
import clsx from 'clsx'
import { DOCK_APPS, DOCK_SOCIALS, type DockApp } from '../data/dock'

/**
 * Icon tile size — the dock reads as a strip of app icons, so keep them square.
 * Twelve tiles is a lot of width, hence the tighter steps below md.
 */
const TILE = 'size-8 sm:size-9 md:size-11'

/** Light plate, as in a real dock: the logos are colour artwork on transparency. */
const DEFAULT_PLATE = 'from-white via-[#f5f5f7] to-[#e8e8ec]'

function DockTile({ app, icon }: { app: DockApp; icon: string }) {
  const tile = (
    <>
      {/* name + purpose, as the dock's own labels behave */}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg border border-white/15 bg-black/80 px-3 py-1.5 text-[12px] font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 group-hover/tile:translate-y-0 group-hover/tile:opacity-100"
      >
        {app.name} <span className="text-white/55">— {app.purpose}</span>
      </span>

      <div
        className={clsx(
          'flex shrink-0 items-center justify-center overflow-hidden rounded-[10px] shadow-[0_6px_18px_-6px_rgba(0,0,0,0.5)] sm:rounded-[12px] md:rounded-[14px]',
          TILE,
          // Bleed artwork brings its own background, so no plate beneath it.
          !app.bleed && clsx('bg-gradient-to-b', app.gradient ?? DEFAULT_PLATE),
        )}
      >
        {/* Plate icons are loose artwork, so a shared percentage box — not
            padding — is what makes them read as one set. Bleed icons are
            already tiles and fill the slot edge to edge. */}
        <img
          src={icon}
          alt=""
          className={clsx('object-contain', app.bleed ? 'size-full' : 'size-[62%]')}
        />
      </div>

      {/* running-app dot, as in the dock the strip is modelled on. The slot is
          always reserved so tiles with and without one stay on the same line. */}
      <span
        className={clsx(
          'mx-auto mt-1.5 block size-1 rounded-full',
          app.running ? 'bg-white/70' : 'bg-transparent',
        )}
      />
    </>
  )

  const motionProps = {
    whileHover: { y: -10, scale: 1.12 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 22 },
    className: 'group/tile relative',
  }

  if (app.href) {
    return (
      <motion.a
        {...motionProps}
        href={app.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${app.name} — ${app.purpose}`}
      >
        {tile}
      </motion.a>
    )
  }

  return <motion.div {...motionProps}>{tile}</motion.div>
}

/**
 * A macOS-dock-style strip of the tools behind the work, then a divider and the
 * places to find me. Sits at the bottom of the hero, over the cloud field, so it
 * needs its own translucent plate to stay legible against the video underneath.
 */
export function ToolDock({
  icons,
  delay = 0,
  className,
}: {
  icons: Record<string, string>
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        'flex items-end gap-1.5 rounded-[18px] border border-white/20 bg-black/25 px-2.5 py-2 backdrop-blur-xl sm:gap-2 sm:rounded-[22px] sm:px-3 sm:py-2.5 md:gap-2.5 md:rounded-[26px] md:px-4 md:py-3',
        className,
      )}
    >
      {DOCK_APPS.map((app) => (
        <DockTile key={app.id} app={app} icon={icons[app.id]} />
      ))}

      {/* Twelve tiles overflow a phone, so the social half waits for sm. */}
      <span
        aria-hidden
        className="mb-[13px] hidden h-8 w-px shrink-0 bg-white/25 sm:mx-1 sm:block md:h-10"
      />

      <div className="hidden items-end gap-2 sm:flex md:gap-2.5">
        {DOCK_SOCIALS.map((app) => (
          <DockTile key={app.id} app={app} icon={icons[app.id]} />
        ))}
      </div>
    </motion.div>
  )
}

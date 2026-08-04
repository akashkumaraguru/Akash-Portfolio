import { motion } from 'framer-motion'
import clsx from 'clsx'
import type { ToolBadge as ToolBadgeType } from '../data/badges'

export function ToolBadge({
  badge,
  icon,
  delay = 0,
}: {
  badge: ToolBadgeType
  icon: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: badge.rotate }}
      animate={{ opacity: 1, scale: 1, rotate: badge.rotate }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, scale: 1.05 }}
      className={clsx('absolute z-20 hidden lg:block', badge.position)}
    >
      <div className="flex items-center gap-2.5 rounded-[14px] border border-black/[0.08] bg-white/55 py-[9px] pl-[7px] pr-[15px] shadow-[0px_6px_20px_0px_rgba(10,10,10,0.08)] backdrop-blur-sm">
        <div className={clsx('flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-b', badge.gradient)}>
          <img src={icon} alt="" className="size-5 object-contain" />
        </div>
        <div className="flex flex-col items-start whitespace-nowrap">
          <span className="text-[10px] uppercase tracking-[0.12em] text-black/50">{badge.eyebrow}</span>
          <span className="text-[13px] font-semibold text-[#0a0a0a]">{badge.name}</span>
        </div>
      </div>
    </motion.div>
  )
}

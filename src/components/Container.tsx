import type { ReactNode } from 'react'
import clsx from 'clsx'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('mx-auto w-full max-w-[1240px] px-6 md:px-10', className)}>{children}</div>
}

export function Eyebrow({ children, index }: { children: ReactNode; index?: string }) {
  return (
    <div className="flex items-center gap-3 text-[13px] tracking-[0.14em] text-muted uppercase">
      {index && <span className="text-faint">{index}</span>}
      <span className="h-px w-8 bg-line-strong" />
      {children}
    </div>
  )
}

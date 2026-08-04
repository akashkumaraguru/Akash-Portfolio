import type { ReactNode } from 'react'
import clsx from 'clsx'
import { Magnetic } from './Magnetic'
import { ArrowUpRight } from 'lucide-react'

export function Button({
  children,
  href,
  variant = 'primary',
  icon = true,
  onClick,
  className,
}: {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: boolean
  onClick?: () => void
  className?: string
}) {
  const base =
    'group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium tracking-tight transition-colors duration-300'

  const styles = {
    primary: 'bg-paper text-ink hover:bg-accent hover:text-white',
    secondary: 'border border-line-strong text-paper hover:border-accent-soft',
    ghost: 'text-muted hover:text-paper',
  }[variant]

  const Tag = (href ? 'a' : 'button') as 'a' | 'button'

  return (
    <Magnetic className="inline-block">
      <Tag
        href={href}
        onClick={onClick}
        className={clsx(base, styles, className)}
      >
        {children}
        {icon && (
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.75}
          />
        )}
      </Tag>
    </Magnetic>
  )
}

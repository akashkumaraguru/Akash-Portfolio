import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { Eyebrow } from './Container'

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index?: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
}) {
  return (
    <div className="max-w-[720px]">
      <Reveal>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 text-h2 font-medium leading-[1.08] tracking-tight text-paper">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  )
}

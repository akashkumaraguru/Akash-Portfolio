import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import type { Project } from '../data/projects'
import { CASE_STUDY_PROJECTS } from '../data/projects'
import { Container, Eyebrow } from '../components/Container'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { ProjectCover } from '../components/ProjectCover'
import { CASE_STUDY_BASE, navigate } from '../lib/router'

const CHAPTERS: { key: keyof Project; label: string }[] = [
  { key: 'problem', label: 'Problem' },
  { key: 'research', label: 'Research' },
  { key: 'opportunity', label: 'Opportunity' },
  { key: 'aiIntegration', label: 'AI Integration' },
  { key: 'wireframes', label: 'Wireframes' },
  { key: 'userFlows', label: 'User Flows' },
  { key: 'designSystem', label: 'Design System' },
  { key: 'prototype', label: 'Prototype' },
  { key: 'frontendContribution', label: 'Frontend' },
  { key: 'businessImpact', label: 'Business Impact' },
  { key: 'lessonsLearned', label: 'Lessons Learned' },
]

/** Only the chapter crossing the upper third counts as current. */
const RAIL_ROOT_MARGIN = '-25% 0px -65% 0px'

export function ProjectCaseStudy({ project, onBack }: { project: Project; onBack: () => void }) {
  const chapters = useMemo(() => CHAPTERS.filter((c) => project[c.key]), [project])
  const scope = project.scope ?? project.tools
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 })
  const [activeChapter, setActiveChapter] = useState<string | null>(chapters[0]?.key ?? null)

  const order = CASE_STUDY_PROJECTS.length > 0 ? CASE_STUDY_PROJECTS : [project]
  const currentIndex = order.findIndex((p) => p.id === project.id)
  const next = order[(currentIndex + 1) % order.length]

  useEffect(() => {
    if (chapters.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveChapter(entry.target.id.replace('chapter-', ''))
        }
      },
      { rootMargin: RAIL_ROOT_MARGIN },
    )
    chapters.forEach((c) => {
      const el = document.getElementById(`chapter-${c.key}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [chapters])

  return (
    <motion.main
      aria-label={`${project.name} case study`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-ink"
    >
      <header className="sticky top-0 z-20 border-b border-line bg-ink/90 backdrop-blur-xl">
        <Container className="flex h-[68px] items-center justify-between gap-6">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-[14px] tracking-tight text-muted transition-colors hover:text-paper"
            aria-label="Back to case studies"
          >
            <ArrowLeft
              className="size-[18px] transition-transform group-hover:-translate-x-0.5"
              strokeWidth={1.75}
            />
            Case Study
          </button>
          <span className="hidden text-[13px] tracking-tight text-faint sm:block">
            {project.name}
          </span>
        </Container>
        {/* reading progress — the only chrome that moves while you read */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-brand"
          aria-hidden
        />
      </header>

      {/* ---- title block ---- */}
      <Container className="pt-16 md:pt-24">
        <Reveal>
          <Eyebrow index={String(currentIndex + 1).padStart(2, '0')}>{project.category}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-7 max-w-[16ch] text-[clamp(2.5rem,1.5rem+4vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.04em] text-paper">
            {project.name}
          </h1>
        </Reveal>
        {project.headline && (
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-[52ch] text-[clamp(1.1rem,0.9rem+0.7vw,1.625rem)] leading-[1.45] text-muted">
              {project.headline}
            </p>
          </Reveal>
        )}
      </Container>

      {/* ---- full-bleed artwork ---- */}
      <Reveal delay={0.18}>
        <Container className="mt-14">
          <ProjectCover
            project={project}
            className="aspect-[16/10] rounded-[20px] border border-line bg-white md:aspect-[1394/560] md:rounded-[28px]"
          />
        </Container>
      </Reveal>

      {/* ---- spec strip ---- */}
      <Container className="mt-16">
        <RevealGroup className="grid grid-cols-2 border-t border-line md:grid-cols-4">
          {[
            { label: 'Year', value: project.year },
            { label: 'Role', value: project.role },
            { label: 'Tools', value: project.tools.join(' · ') },
            { label: 'Status', value: project.status ?? project.tagline },
          ].map((item, i) => (
            <RevealItem
              key={item.label}
              className={clsx(
                'border-b border-line py-6 pr-6 md:border-b-0',
                i > 0 && 'md:border-l md:pl-6',
              )}
            >
              <dt className="text-[12px] tracking-[0.14em] text-faint uppercase">{item.label}</dt>
              <dd className="mt-2 text-[15px] leading-snug text-paper">{item.value}</dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>

      {/* ---- scope ---- */}
      <Container className="mt-16">
        <Reveal>
          <Eyebrow>Scope of work</Eyebrow>
        </Reveal>
        <RevealGroup className="mt-6 flex flex-wrap gap-3" stagger={0.04}>
          {scope.map((item) => (
            <RevealItem key={item}>
              <span className="inline-block rounded-full border border-line-strong px-4 py-2 text-[14px] text-muted">
                {item}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>

      {/* ---- chapters, with a rail that tracks where you are ---- */}
      {chapters.length > 0 ? (
        <Container className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <nav aria-label="Case study chapters" className="hidden lg:block">
            <ol className="sticky top-[108px] flex flex-col gap-3 border-l border-line pl-5">
              {chapters.map((c) => {
                const isActive = activeChapter === c.key
                return (
                  <li key={c.key} className="relative">
                    {isActive && (
                      <motion.span
                        layoutId="chapter-marker"
                        className="absolute -left-[21px] top-1/2 h-4 w-px -translate-y-1/2 bg-brand"
                      />
                    )}
                    <a
                      href={`#chapter-${c.key}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={clsx(
                        'text-[13px] tracking-[0.08em] uppercase transition-colors',
                        isActive ? 'text-brand-soft' : 'text-faint hover:text-muted',
                      )}
                    >
                      {c.label}
                    </a>
                  </li>
                )
              })}
            </ol>
          </nav>

          <div className="flex flex-col gap-16 border-t border-line pt-16 lg:border-t-0 lg:pt-0">
            {chapters.map((c, i) => (
              <Reveal key={c.key}>
                <section id={`chapter-${c.key}`} className="scroll-mt-32">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[13px] tabular-nums text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-[clamp(1.375rem,1.1rem+0.9vw,2rem)] font-medium tracking-tight text-paper">
                      {c.label}
                    </h2>
                  </div>
                  <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.75] text-muted">
                    {project[c.key] as string}
                  </p>
                </section>
              </Reveal>
            ))}
          </div>
        </Container>
      ) : (
        <Container className="mt-24">
          <div className="border-t border-line pt-10">
            <p className="max-w-[52ch] text-[17px] leading-relaxed text-muted">
              The full write-up for this project is still being put together —{' '}
              <span className="font-serif-italic text-accent-soft">
                the research, the decisions, the detours.
              </span>
            </p>
          </div>
        </Container>
      )}

      {/* ---- metrics ---- */}
      {project.metrics && project.metrics.length > 0 && (
        <Container className="mt-24">
          <Reveal>
            <Eyebrow>Outcome</Eyebrow>
          </Reveal>
          <RevealGroup className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {project.metrics.map((m) => (
              <RevealItem key={m.label} className="bg-ink p-7">
                <p className="text-[13px] tracking-[0.1em] text-faint uppercase">{m.label}</p>
                <p className="mt-3 text-[20px] leading-snug font-medium text-paper">{m.value}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      )}

      {/* ---- next case study ---- */}
      <Container className="mt-28 pb-24">
        <button
          onClick={() => navigate(`${CASE_STUDY_BASE}${next.id}`)}
          className="group flex w-full items-center justify-between gap-8 border-t border-line pt-10 text-left"
        >
          <span>
            <span className="text-[13px] tracking-[0.14em] text-faint uppercase">Next case study</span>
            <span className="mt-3 block text-[clamp(1.5rem,1.2rem+1.6vw,2.75rem)] font-medium tracking-tight text-paper transition-colors group-hover:text-brand-soft">
              {next.name}
            </span>
          </span>
          <ArrowRight
            className="size-8 shrink-0 text-muted transition-transform group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </button>
      </Container>
    </motion.main>
  )
}

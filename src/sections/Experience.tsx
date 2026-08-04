import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { RevealGroup, RevealItem } from '../components/Reveal'
import { EXPERIENCE } from '../data/experience'

export function Experience() {
  return (
    <section id="experience" className="border-t border-line py-32">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Experience"
          title={
            <>
              Design decisions, <span className="font-serif-italic text-accent-soft">shipped as code.</span>
            </>
          }
        />

        <div className="relative mt-16 border-l border-line pl-10">
          {EXPERIENCE.map((job) => (
            <div key={job.company} className="relative pb-4">
              <span className="absolute -left-[45px] top-1.5 flex h-3 w-3 items-center justify-center">
                {job.current && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                )}
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[24px] font-medium tracking-tight text-paper">
                  {job.role} <span className="text-muted">· {job.company}</span>
                </h3>
                <span className="text-[13px] tracking-wide text-faint">{job.duration}</span>
              </div>

              <RevealGroup className="mt-6 flex flex-wrap gap-3" stagger={0.05}>
                {job.responsibilities.map((r) => (
                  <RevealItem key={r}>
                    <span className="inline-block rounded-full border border-line-strong px-4 py-2 text-[14px] text-muted">
                      {r}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

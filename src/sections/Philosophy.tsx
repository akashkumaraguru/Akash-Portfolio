import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { PipelineDiagram } from '../components/PipelineDiagram'
import { RevealGroup, RevealItem } from '../components/Reveal'
import { AI_TOPICS } from '../data/philosophy'

export function Philosophy() {
  return (
    <section id="philosophy" className="border-t border-line py-32">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="AI Design Philosophy"
          title={
            <>
              AI writes the first draft.{' '}
              <span className="font-serif-italic text-accent-soft">I write the last one.</span>
            </>
          }
          description="AI clears the busywork — research synthesis, first drafts, endless variations. What ships is still a decision I make, not one I outsource."
        />

        <div className="mt-20">
          <PipelineDiagram />
        </div>

        <RevealGroup className="mt-24 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {AI_TOPICS.map((topic, i) => (
            <RevealItem key={topic.label}>
              <div className="border-t border-line pt-5">
                <span className="text-[12px] tracking-[0.1em] text-faint">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-[17px] font-medium text-paper">{topic.label}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{topic.note}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}

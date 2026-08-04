import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { RevealGroup, RevealItem } from '../components/Reveal'
import { ACHIEVEMENTS } from '../data/achievements'

export function Achievements() {
  return (
    <section id="achievements" className="border-t border-line py-32">
      <Container>
        <SectionHeading
          index="08"
          eyebrow="Achievements"
          title={
            <>
              Built, not just <span className="font-serif-italic text-accent-soft">designed.</span>
            </>
          }
          description="Things that exist in the world now, not just in a portfolio."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
          {ACHIEVEMENTS.map((a, i) => (
            <RevealItem key={a.title}>
              <div className="flex gap-5">
                <span className="font-serif-italic text-[15px] text-accent-soft">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-[19px] font-medium tracking-tight text-paper">{a.title}</h3>
                  <p className="mt-2 max-w-[46ch] text-[14px] leading-relaxed text-muted">{a.description}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}

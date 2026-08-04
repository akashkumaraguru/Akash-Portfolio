import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { TESTIMONIALS } from '../data/testimonials'

export function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-line py-32">
      <Container>
        <SectionHeading
          index="10"
          eyebrow="Testimonials"
          title={
            <>
              What shipping together <span className="font-serif-italic text-accent-soft">looks like.</span>
            </>
          }
        />

        <Reveal delay={0.1}>
          <p className="mt-4 text-[13px] italic text-faint">Placeholder quotes — swap in real feedback.</p>
        </Reveal>
      </Container>

      <Reveal delay={0.15}>
        <div className="mt-10 flex gap-8 overflow-x-auto px-6 pb-6 md:px-10 [scrollbar-width:thin]">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.attribution}
              className="w-[min(88vw,480px)] shrink-0 border-l border-line-strong pl-8"
            >
              <blockquote className="text-[20px] font-medium leading-[1.4] tracking-tight text-paper md:text-[24px]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 text-[13px] tracking-wide text-faint">{t.attribution}</figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

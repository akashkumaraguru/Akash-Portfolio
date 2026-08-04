import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { Eyebrow } from '../components/Container'
import { Button } from '../components/Button'
import { SOCIALS, RESUME_HREF, CALENDLY_HREF } from '../data/nav'

export function Contact() {
  return (
    <section id="contact" className="border-t border-line py-32">
      <Container>
        <Reveal>
          <Eyebrow index="11">Contact</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-8 max-w-[18ch] text-h1 font-medium leading-[1.05] tracking-tight text-paper">
            Got an idea? <span className="font-serif-italic text-accent-soft">Let's ship it.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button href="mailto:hello@akashkumaraguru.com">Say hello</Button>
            <Button href={CALENDLY_HREF} variant="secondary">
              Book a call
            </Button>
            <Button href={RESUME_HREF} variant="ghost" icon={false}>
              Download Resume →
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-20 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-[14px] tracking-wide text-muted transition-colors hover:text-paper"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

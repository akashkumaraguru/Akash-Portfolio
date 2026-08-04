import { motion } from 'framer-motion'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { SKILLS } from '../data/skills'

const TIER_STYLE = {
  1: 'text-[clamp(1.25rem,1rem+1.6vw,2.5rem)] text-paper',
  2: 'text-[clamp(1rem,0.9rem+0.8vw,1.5rem)] text-muted',
  3: 'text-[clamp(0.85rem,0.8rem+0.4vw,1.05rem)] text-faint',
} as const

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000
  return x - Math.floor(x)
}

export function Skills() {
  return (
    <section id="skills" className="border-t border-line py-32">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="AI Skills"
          title={
            <>
              Design tools in one hand, <span className="font-serif-italic text-accent-soft">dev tools in the other.</span>
            </>
          }
          description="Weighted by how often each one shows up in the work — from product strategy down to the terminal."
        />

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-5 py-8">
            {SKILLS.map((skill, i) => {
              const rotate = (pseudoRandom(i) - 0.5) * 6
              return (
                <motion.span
                  key={skill.name}
                  whileHover={{
                    scale: 1.12,
                    rotate,
                    color: 'var(--color-accent-soft)',
                    transition: { type: 'spring', stiffness: 300, damping: 12 },
                  }}
                  className={
                    'cursor-default select-none whitespace-nowrap font-medium leading-none ' + TIER_STYLE[skill.tier]
                  }
                >
                  {skill.name}
                </motion.span>
              )
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

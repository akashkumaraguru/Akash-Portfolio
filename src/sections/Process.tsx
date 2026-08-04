import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { PROCESS_STAGES } from '../data/process'

export function Process() {
  const [active, setActive] = useState(0)

  return (
    <section id="process" className="border-t border-line py-32">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="Design Process"
          title={
            <>
              A process that ends in <span className="font-serif-italic text-accent-soft">shipped code</span>, not
              just slides.
            </>
          }
          description="Seven stages, applied with judgment — some collapse into a day, others take weeks. Every one of them exists to get a real product out the door, not to fill a deck."
        />

        <div className="mt-16 divide-y divide-line border-y border-line">
          {PROCESS_STAGES.map((stage, i) => {
            const isOpen = active === i
            return (
              <Reveal key={stage.name} delay={i * 0.03}>
                <button
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className="group flex w-full items-start gap-6 py-7 text-left md:items-center"
                  aria-expanded={isOpen}
                >
                  <span className="w-10 shrink-0 text-[13px] text-faint">{String(i + 1).padStart(2, '0')}</span>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3
                        className={
                          'text-[22px] font-medium tracking-tight transition-colors md:text-[26px] ' +
                          (isOpen ? 'text-paper' : 'text-muted group-hover:text-paper')
                        }
                      >
                        {stage.name}
                      </h3>
                      <span className="hidden text-[14px] text-faint md:block">{stage.summary}</span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[62ch] pt-4 text-[15px] leading-relaxed text-muted">{stage.detail}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="mt-1 shrink-0 text-[20px] text-faint"
                  >
                    +
                  </motion.span>
                </button>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

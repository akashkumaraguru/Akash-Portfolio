import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Award } from 'lucide-react'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { RevealGroup, RevealItem } from '../components/Reveal'
import { EVENTS } from '../data/events'

export function Events() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="events" className="border-t border-line py-32">
      <Container>
        <SectionHeading
          index="07"
          eyebrow="Events & Community"
          title={
            <>
              Still a <span className="font-serif-italic text-accent-soft">student of the craft.</span>
            </>
          }
          description="Conferences, workshops, and hackathons that keep the work honest — proof that building well means never treating the learning as finished."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event, i) => {
            const isOpen = open === i
            return (
              <RevealItem key={event.name}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full flex-col rounded-2xl border border-line bg-panel p-6 text-left transition-colors hover:border-line-strong"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[17px] font-medium leading-snug text-paper">{event.name}</h3>
                    <span className="shrink-0 rounded-full border border-line-strong px-3 py-1 text-[11px] tracking-wide text-accent-soft">
                      {event.role}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] text-faint">
                    {event.org} · {event.location} · {event.date}
                  </p>

                  <p className="mt-4 text-[14px] leading-relaxed text-muted">{event.learnings}</p>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 border-t border-line pt-4">
                          <p className="text-[13px] tracking-[0.1em] text-faint uppercase">
                            Impact on my design thinking
                          </p>
                          <p className="mt-2 text-[14px] leading-relaxed text-muted">{event.impact}</p>
                          <div className="mt-4 flex gap-3 text-[12px] text-faint">
                            <span className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5">
                              <Camera className="size-3.5" strokeWidth={1.5} /> Photos to be added
                            </span>
                            <span className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5">
                              <Award className="size-3.5" strokeWidth={1.5} /> Certificate to be added
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span className="mt-4 text-[12px] tracking-wide text-faint">
                    {isOpen ? 'Show less' : 'Show more'}
                  </span>
                </button>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Container>
    </section>
  )
}

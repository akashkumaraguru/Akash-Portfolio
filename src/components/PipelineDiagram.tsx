import { motion } from 'framer-motion'
import { PIPELINE_STEPS } from '../data/philosophy'

export function PipelineDiagram() {
  return (
    <div className="relative">
      {/* the full row only fits from lg up; below that it stays a scroller, or it
          spills past the viewport and gives the whole page a horizontal scrollbar */}
      <div className="flex gap-3 overflow-x-auto pb-4 lg:gap-0 lg:overflow-visible lg:pb-0">
        <div className="flex min-w-max items-center gap-0 lg:w-full lg:min-w-0 lg:justify-between">
          {PIPELINE_STEPS.map((step, i) => {
            const isPivot = step === 'Human Decisions'
            return (
              <div key={step} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    'flex flex-col items-center gap-3 rounded-2xl border px-5 py-4 text-center ' +
                    (isPivot ? 'border-accent-soft/60 bg-accent-dim' : 'border-line bg-panel')
                  }
                >
                  <span className={'text-[12px] tracking-[0.1em] ' + (isPivot ? 'text-accent-soft' : 'text-faint')}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={
                      'whitespace-nowrap text-[14px] font-medium ' + (isPivot ? 'text-paper' : 'text-muted')
                    }
                  >
                    {step}
                  </span>
                </motion.div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.05, duration: 0.4 }}
                    className="mx-2 h-px w-8 origin-left bg-line-strong lg:w-full"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

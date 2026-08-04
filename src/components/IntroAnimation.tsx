import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import sky from '../assets/hero/sky-landscape.jpg'
import glow from '../assets/hero/glow.jpg'
import { HALFTONE } from '../lib/textures'

/** How long the counter takes to travel from 0 to MAX_PERCENT. */
const COUNT_DURATION = 1100
/**
 * Overlay lifetime. Kept in step with the Hero's own reveal delays (1.4s onward)
 * so the hero content animates in exactly as this panel slides away.
 */
const EXIT_AT = 1400
/** Slide-off duration. Short enough that the hero is not held behind it. */
const EXIT_DURATION = 0.6
/** The design stops at 99, never 100 — the last percent is the exit itself. */
const MAX_PERCENT = 99
const DOT_COUNT = 8
/** Seconds between neighbouring dots in the loading wave. */
const DOT_STAGGER = 0.12
/** Resting opacity of a dot — the wave lifts each one to full white in turn. */
const DOT_IDLE_OPACITY = 0.4

/** Decelerating ease so the counter sprints early and eases into 99. */
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

export function IntroAnimation() {
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [percent, setPercent] = useState(0)
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(false)
      return
    }
    setMounted(true)

    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / COUNT_DURATION, 1)
      setPercent(Math.round(easeOutCubic(elapsed) * MAX_PERCENT))
      if (elapsed < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)

    const timer = setTimeout(() => setVisible(false), EXIT_AT)
    return () => {
      clearTimeout(timer)
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = visible ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [visible])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: EXIT_DURATION, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] overflow-hidden bg-ink"
        >
          {/* cloud plate */}
          <div className="absolute inset-0 saturate-[1.28] contrast-[1.06]">
            <img src={sky} alt="" className="size-full object-cover" />
            <motion.img
              src={glow}
              alt=""
              className="absolute inset-0 h-[130%] w-full object-cover mix-blend-screen"
              initial={{ scale: 1, x: 0 }}
              animate={{ scale: [1, 1.05, 1], x: [0, 16, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* print-halftone dot screen over the photo */}
          <div className="pointer-events-none absolute inset-0" style={HALFTONE} />

          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(6,20,48,0.12) 0%, transparent 45%, rgba(6,20,48,0.22) 100%)' }}
          />

          {/* content — anchored to the bottom-left gutter like the Figma frame */}
          <div className="relative flex size-full flex-col justify-end px-[3vw] pb-[3vw] text-white">
            <motion.div
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 1, 1] }}
              className="mb-[20vh]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <div className="overflow-hidden pb-[0.08em]">
                <motion.h2
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(2rem,6.25vw,5.625rem)] font-bold leading-[1.1] tracking-[-0.04em]"
                >
                  Akash Kumaraguru
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-1 text-[clamp(1.05rem,3.33vw,3rem)] font-bold leading-tight"
              >
                Designer <span className="font-serif-italic">&amp; &lt;/Builder&gt;</span>
              </motion.p>
            </motion.div>

            <motion.div
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 1, 1] }}
              className="flex items-end justify-between text-[clamp(2.5rem,8.6vw,7.75rem)] font-bold leading-[0.8] tracking-[-0.029em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <div className="flex items-end gap-[0.22em]" aria-hidden>
                {Array.from({ length: DOT_COUNT }, (_, i) => (
                  <motion.span
                    key={i}
                    className="block size-[0.11em] bg-white"
                    initial={{ opacity: DOT_IDLE_OPACITY }}
                    animate={{ opacity: [DOT_IDLE_OPACITY, 1, DOT_IDLE_OPACITY] }}
                    transition={{
                      duration: DOT_STAGGER * DOT_COUNT,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * DOT_STAGGER,
                    }}
                  />
                ))}
              </div>

              <p aria-label={`Loading ${percent} percent`} className="tabular-nums">
                {percent}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

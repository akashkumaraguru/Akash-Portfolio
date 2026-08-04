import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

/** Elements opt in by setting data-cursor="Label" — the dot becomes that pill. */
const CURSOR_ATTRIBUTE = 'data-cursor'
/** Marks the document so CSS can hide the native pointer. */
const ACTIVE_CLASS = 'has-custom-cursor'

/** Loose enough to trail the pointer, tight enough to never feel laggy. */
const FOLLOW_SPRING = { stiffness: 700, damping: 42, mass: 0.6 }

/**
 * A dot that replaces the system pointer and swells into a labelled pill over
 * anything carrying data-cursor. Only mounts for fine pointers, so touch and
 * keyboard users keep their normal behaviour.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, FOLLOW_SPRING)
  const springY = useSpring(y, FOLLOW_SPRING)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    if (!finePointer.matches) return

    setEnabled(true)
    document.documentElement.classList.add(ACTIVE_CLASS)

    function onMove(e: PointerEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const target = e.target instanceof Element ? e.target.closest(`[${CURSOR_ATTRIBUTE}]`) : null
      setLabel(target?.getAttribute(CURSOR_ATTRIBUTE) ?? null)
    }
    // mouseleave on the root element is the one reliable "pointer left the
    // viewport" signal; pointerleave on document also fires at frame boundaries.
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      document.documentElement.classList.remove(ACTIVE_CLASS)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[999] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        layout
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.88 : 1 }}
        transition={{ layout: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }, duration: 0.2 }}
        className="flex items-center justify-center rounded-full bg-[#262626] text-white"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {label ? (
            <motion.span
              key="label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="whitespace-nowrap px-7 py-4 text-[15px] font-semibold tracking-[-0.01em]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {label}
            </motion.span>
          ) : (
            <motion.span
              key="dot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="block size-[26px]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

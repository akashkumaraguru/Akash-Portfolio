import { useEffect, useState } from 'react'

/** A run of characters that shares one style, so a phrase can mix weights. */
export type TypedSegment = { text: string; bold?: boolean }
export type TypedPhrase = TypedSegment[]

/** Per-character keystroke interval while typing forward. */
const TYPE_MS = 58
/** Backspacing reads better a little faster than typing. */
const DELETE_MS = 26
/** How long a finished phrase stays on screen before it is erased. */
const HOLD_MS = 2400
/** Beat between an erased phrase and the first key of the next one. */
const PAUSE_MS = 450

type Phase = 'waiting' | 'typing' | 'deleting'

const phraseLength = (phrase: TypedPhrase) =>
  phrase.reduce((total, segment) => total + segment.text.length, 0)

/** Trims a phrase to the first `count` characters, keeping each run's styling. */
function slicePhrase(phrase: TypedPhrase, count: number): TypedPhrase {
  const visible: TypedPhrase = []
  let remaining = count

  for (const segment of phrase) {
    if (remaining <= 0) break
    visible.push({ ...segment, text: segment.text.slice(0, remaining) })
    remaining -= segment.text.length
  }

  return visible
}

/**
 * Types each phrase out, holds it, erases it, then moves to the next — forever.
 * Honours `prefers-reduced-motion` by parking on the first phrase, fully typed,
 * so the copy is still readable without any motion.
 */
export function useTypewriter(phrases: TypedPhrase[], startDelay = 0) {
  const [animated] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [count, setCount] = useState(() => (animated ? 0 : phraseLength(phrases[0])))
  const [phase, setPhase] = useState<Phase>('waiting')

  useEffect(() => {
    if (!animated) return

    const total = phraseLength(phrases[phraseIndex])
    let delay = PAUSE_MS
    let advance = () => setPhase('typing')

    if (phase === 'waiting') {
      delay = startDelay
    } else if (phase === 'typing') {
      if (count < total) {
        delay = TYPE_MS
        advance = () => setCount((c) => c + 1)
      } else {
        delay = HOLD_MS
        advance = () => setPhase('deleting')
      }
    } else if (count > 0) {
      delay = DELETE_MS
      advance = () => setCount((c) => c - 1)
    } else {
      advance = () => {
        setPhraseIndex((i) => (i + 1) % phrases.length)
        setPhase('typing')
      }
    }

    const timer = setTimeout(advance, delay)
    return () => clearTimeout(timer)
  }, [animated, phrases, phraseIndex, phase, count, startDelay])

  return {
    segments: slicePhrase(phrases[phraseIndex], count),
    /** True while keys are landing — the caret holds steady instead of blinking. */
    isBusy: animated && phase !== 'waiting' && count > 0 && count < phraseLength(phrases[phraseIndex]),
    showCaret: animated,
  }
}

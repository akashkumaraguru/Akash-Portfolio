import { useEffect } from 'react'
import Lenis from 'lenis'

let instance: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    instance = lenis

    function raf(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    let frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      instance = null
    }
  }, [])
}

/** Jump to the top with no easing — used when a route change swaps the page. */
/**
 * Jumps by default — a route swap should land at the top, not animate there.
 * `smooth` is for controls the reader actually pressed, like "Back to top".
 */
export function scrollToTop({ smooth = false }: { smooth?: boolean } = {}) {
  if (instance) {
    instance.scrollTo(0, smooth ? { duration: 1.4 } : { immediate: true })
  } else {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset: -24, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

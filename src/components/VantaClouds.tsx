import { useEffect, useRef } from 'react'
import type { Clouds2Factory, VantaEffect } from 'vanta/dist/vanta.clouds2.min'

/** Served from public/ — Vanta samples this for the cloud turbulence. */
const TEXTURE_PATH = '/vanta/noise.png'

const CLOUD_OPTIONS = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 1,
  backgroundColor: 0x372424,
  skyColor: 0x0479c0,
  cloudColor: 0x363b48,
  speed: 1.4,
} as const

/**
 * A live WebGL cloud field.
 *
 * three + vanta are ~620kB, so they are imported dynamically: the hero paints
 * from its static plate first and the canvas fades in once the chunk arrives.
 * Mounts its own canvas filling the parent, so the caller owns size and clipping.
 * Does nothing under `prefers-reduced-motion` — the static plate stays visible.
 */
export function VantaClouds({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let effect: VantaEffect | undefined

    async function start() {
      try {
        const [three, vanta] = await Promise.all([
          import('three'),
          import('vanta/dist/vanta.clouds2.min'),
        ])
        // The published file is UMD; the default is either the factory or a wrapper.
        const exported = vanta.default
        const create: Clouds2Factory =
          typeof exported === 'function' ? exported : exported.default

        // The component may have unmounted while the chunk was in flight.
        if (cancelled || !host) return

        effect = create({ el: host, THREE: three, texturePath: TEXTURE_PATH, ...CLOUD_OPTIONS })
        host.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: 'ease-out' })
      } catch (error) {
        // No WebGL, a refused context, or a failed chunk — leave the static
        // plate showing rather than a blank hole in the hero.
        console.error('Vanta clouds failed to start', error)
      }
    }

    void start()

    return () => {
      cancelled = true
      effect?.destroy()
    }
  }, [])

  return <div ref={hostRef} className={className} aria-hidden />
}

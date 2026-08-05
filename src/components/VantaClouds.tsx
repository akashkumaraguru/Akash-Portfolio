import { useEffect, useRef, useState } from 'react'
import type { CloudsFactory, VantaEffect } from 'vanta/dist/vanta.clouds.min'

/** Served from public/ — Vanta samples this for the cloud turbulence. */
const TEXTURE_PATH = '/vanta/noise.png'

const CLOUD_OPTIONS = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  skyColor: 0x428ed7,
  sunColor: 0xbe6e04,
  sunGlareColor: 0xdc623f,
  speed: 1.9,
} as const

/**
 * A live WebGL cloud field.
 *
 * three + vanta are ~620kB, so they are imported dynamically: the hero paints
 * from its static plate first and the canvas fades in once the chunk arrives.
 * Mounts its own canvas filling the parent, so the caller owns size and clipping.
 * Does nothing under `prefers-reduced-motion` — the static plate stays visible.
 */
export function VantaClouds({
  className,
  fallbackSrc,
}: {
  className?: string
  /** Shown until the canvas is live, and left in place if it never is. */
  fallbackSrc?: string
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let effect: VantaEffect | undefined
    /**
     * Vanta fits its sky dome to the element once, at creation. If the box
     * changes afterwards — a resize, or a mobile URL bar collapsing the
     * viewport — the dome stops matching and its edge shows as a hard seam.
     */
    let observer: ResizeObserver | undefined

    async function start() {
      try {
        const [three, vanta] = await Promise.all([
          import('three'),
          import('vanta/dist/vanta.clouds.min'),
        ])
        // The published file is UMD; the default is either the factory or a wrapper.
        const exported = vanta.default
        const create: CloudsFactory =
          typeof exported === 'function' ? exported : exported.default

        // The component may have unmounted while the chunk was in flight.
        if (cancelled || !host) return

        effect = create({ el: host, THREE: three, texturePath: TEXTURE_PATH, ...CLOUD_OPTIONS })
        host.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: 'ease-out' })

        observer = new ResizeObserver(() => effect?.resize?.())
        observer.observe(host)
        setRunning(true)
      } catch (error) {
        // No WebGL, a refused context, or a failed chunk — leave the static
        // plate showing rather than a blank hole in the hero.
        console.error('Vanta clouds failed to start', error)
      }
    }

    void start()

    return () => {
      cancelled = true
      observer?.disconnect()
      effect?.destroy()
    }
  }, [])

  return (
    <div className={className} aria-hidden>
      {/* Sits behind the canvas and is dropped once the canvas is live: the
          canvas is not fully opaque, so leaving the photo underneath blends its
          cloud edges through as a hard diagonal seam. */}
      {fallbackSrc && !running && (
        <img src={fallbackSrc} alt="" className="absolute inset-0 size-full object-cover" />
      )}
      <div ref={hostRef} className="absolute inset-0" />
    </div>
  )
}

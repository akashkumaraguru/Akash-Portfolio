/**
 * Vanta ships no types. Only the surface we actually use is declared here:
 * the factory returns an effect handle whose `destroy()` tears down the WebGL
 * context — skipping it leaks a renderer per mount.
 */
declare module 'vanta/dist/vanta.clouds2.min' {
  export type VantaEffect = { destroy: () => void; resize?: () => void }

  export type Clouds2Options = {
    el: HTMLElement
    THREE: unknown
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    scale?: number
    backgroundColor?: number
    skyColor?: number
    cloudColor?: number
    speed?: number
    texturePath?: string
  }

  export type Clouds2Factory = (options: Clouds2Options) => VantaEffect

  /**
   * The published file is a UMD bundle. Depending on the interop path the
   * default export is either the factory itself or a wrapper holding it, so the
   * consumer has to unwrap before calling.
   */
  const CLOUDS2: Clouds2Factory | { default: Clouds2Factory }
  export default CLOUDS2
}

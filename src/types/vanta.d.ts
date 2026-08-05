/**
 * Vanta ships no types. Only the surface we actually use is declared here:
 * the factory returns an effect handle whose `destroy()` tears down the WebGL
 * context — skipping it leaks a renderer per mount.
 */
declare module 'vanta/dist/vanta.clouds.min' {
  export type VantaEffect = { destroy: () => void; resize?: () => void }

  export type CloudsOptions = {
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
    cloudShadowColor?: number
    sunColor?: number
    sunGlareColor?: number
    sunlightColor?: number
    speed?: number
    texturePath?: string
  }

  export type CloudsFactory = (options: CloudsOptions) => VantaEffect

  /**
   * The published file is a UMD bundle. Depending on the interop path the
   * default export is either the factory itself or a wrapper holding it, so the
   * consumer has to unwrap before calling.
   */
  const CLOUDS: CloudsFactory | { default: CloudsFactory }
  export default CLOUDS
}

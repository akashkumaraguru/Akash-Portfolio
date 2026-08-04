import { useEffect, useState } from 'react'

/** Case studies live at /case-study/<project id>. */
export const CASE_STUDY_BASE = '/case-study/'
export const HOME_PATH = '/'

/**
 * A one-route router. The site has exactly one dynamic page, so this is the
 * History API directly rather than a routing dependency: push a path, tell every
 * listener, and let the browser's own back/forward do the rest.
 */
export function usePathname() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    function sync() {
      setPathname(window.location.pathname)
    }
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  return pathname
}

export function navigate(to: string) {
  if (to === window.location.pathname) return
  window.history.pushState({}, '', to)
  // pushState fires no event of its own; usePathname listens for this one.
  window.dispatchEvent(new PopStateEvent('popstate'))
}

/**
 * Step back if this page was opened from within the site, so the visitor lands
 * on the card they came from. Deep links have nothing to go back to.
 */
export function goBack(fallback = HOME_PATH) {
  if (window.history.length > 1) {
    window.history.back()
    return
  }
  navigate(fallback)
}

/** The project id in /case-study/<id>, or null on any other path. */
export function caseStudyIdFrom(pathname: string) {
  if (!pathname.startsWith(CASE_STUDY_BASE)) return null
  return pathname.slice(CASE_STUDY_BASE.length).replace(/\/$/, '') || null
}

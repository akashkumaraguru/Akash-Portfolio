import { useEffect } from 'react'
import { useLenis, scrollToTop } from './lib/lenis'
import { caseStudyIdFrom, goBack, usePathname } from './lib/router'
import { PROJECTS } from './data/projects'
import { ProjectCaseStudy } from './sections/ProjectCaseStudy'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { IntroAnimation } from './components/IntroAnimation'
import { Hero } from './sections/Hero'
import { SkillTicker } from './sections/SkillTicker'
import { Statement } from './sections/Statement'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Meetups } from './sections/Meetups'
import { About } from './sections/About'

function App() {
  useLenis()
  const pathname = usePathname()
  const caseStudy = PROJECTS.find((p) => p.id === caseStudyIdFrom(pathname)) ?? null

  // A route swap replaces the whole document; start it at the top either way.
  useEffect(() => {
    scrollToTop()
  }, [pathname])

  // The case study is its own page: no site nav, no intro panel, no footer.
  if (caseStudy) {
    return (
      <>
        <Cursor />
        <ProjectCaseStudy project={caseStudy} onBack={() => goBack()} />
      </>
    )
  }

  return (
    <>
      <Cursor />
      <IntroAnimation />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-paper px-5 py-2.5 text-[14px] font-medium text-ink transition-transform focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        <SkillTicker />
        <Statement />
        <Projects />
        <Skills />
        <Meetups />
        <About />
      </main>
      <Footer />
    </>
  )
}

export default App

import { Container } from './Container'
import { SOCIALS } from '../data/nav'
import { scrollToTop } from '../lib/lenis'

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-center gap-6 text-[13px] text-faint md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} Akash Kumaraguru. Design × AI × Product Thinking.</span>
        <div className="flex flex-wrap items-center gap-6">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} className="transition-colors hover:text-paper">
              {s.label}
            </a>
          ))}
          {/* Goes to the document top rather than a section id: the first
              section on the page changes as the hero is reworked. */}
          <button
            onClick={() => scrollToTop({ smooth: true })}
            className="transition-colors hover:text-paper"
          >
            Back to top
          </button>
        </div>
      </Container>
    </footer>
  )
}

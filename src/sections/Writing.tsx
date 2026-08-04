import { ArrowUpRight } from 'lucide-react'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { RevealGroup, RevealItem } from '../components/Reveal'
import { ARTICLES } from '../data/writing'

export function Writing() {
  return (
    <section id="writing" className="border-t border-line py-32">
      <Container>
        <SectionHeading
          index="09"
          eyebrow="Writing"
          title={
            <>
              Notes from <span className="font-serif-italic text-accent-soft">the build.</span>
            </>
          }
          description="What I learn by actually shipping — on AI, design systems, and the gap between a Figma file and a real product. Drafts in progress."
        />

        <RevealGroup className="mt-16 divide-y divide-line border-t border-line">
          {ARTICLES.map((article, i) => (
            <RevealItem key={article.title}>
              <a href="#" className="group flex items-center gap-6 py-7">
                <span className="w-10 shrink-0 text-[13px] text-faint">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1">
                  <h3 className="text-[19px] font-medium tracking-tight text-paper transition-colors group-hover:text-accent-soft md:text-[22px]">
                    {article.title}
                  </h3>
                  <p className="mt-1.5 max-w-[58ch] text-[14px] text-muted">{article.dek}</p>
                </div>
                <span className="hidden shrink-0 text-[12px] tracking-wide text-faint sm:block">{article.tag}</span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-soft"
                  strokeWidth={1.75}
                />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}

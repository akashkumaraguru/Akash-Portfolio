import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { RevealGroup, RevealItem } from '../components/Reveal'
import { Button } from '../components/Button'

const COLORS = [
  { name: 'ink', hex: '#FAFAFA', usage: 'Base surface' },
  { name: 'panel', hex: '#F1F1F3', usage: 'Raised surface' },
  { name: 'paper', hex: '#0E0E10', usage: 'Primary text' },
  { name: 'muted', hex: '#56565E', usage: 'Secondary text' },
  { name: 'accent', hex: '#5850EC', usage: 'Interactive' },
  { name: 'accent-soft', hex: '#4235C7', usage: 'Accent text' },
]

const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96]

const CARD = 'rounded-2xl border border-line bg-panel p-7'

export function DesignSystems() {
  return (
    <section id="systems" className="border-t border-line py-32">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Design Systems"
          title={
            <>
              The same token in Figma <span className="font-serif-italic text-accent-soft">and in production.</span>
            </>
          }
          description="No translation layer between design and code. This section is rendered from the exact tokens listed below — a working demo, not a mockup of one."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Tokens */}
          <RevealItem className="md:col-span-2">
            <div className={CARD}>
              <p className="text-[13px] tracking-[0.1em] text-faint uppercase">Design Tokens</p>
              <pre className="mt-5 overflow-x-auto rounded-xl bg-ink p-5 text-[13px] leading-relaxed text-muted">
                <code>{`--color-accent: #5850EC;
--font-sans: 'Monorope', monospace;
--font-serif: 'Awesome Serif', serif;
--text-h1: clamp(2.25rem, 2rem + 2.4vw, 4.25rem);
--radius-panel: 1rem;`}</code>
              </pre>
            </div>
          </RevealItem>

          {/* Accessibility */}
          <RevealItem>
            <div className={CARD + ' flex flex-col justify-between'}>
              <p className="text-[13px] tracking-[0.1em] text-faint uppercase">Accessibility</p>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-ink p-5">
                <span className="text-[15px] text-paper">Paper on Ink</span>
                <span className="rounded-full border border-line-strong px-3 py-1 text-[12px] text-accent-soft">
                  AAA
                </span>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-muted">
                Every text/background pairing is checked against WCAG contrast minimums before it ships.
              </p>
            </div>
          </RevealItem>

          {/* Semantic colours */}
          <RevealItem>
            <div className={CARD}>
              <p className="text-[13px] tracking-[0.1em] text-faint uppercase">Semantic Colours</p>
              <div className="mt-5 flex flex-col gap-3">
                {COLORS.map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <span
                      className="h-7 w-7 shrink-0 rounded-full border border-line-strong"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="flex flex-1 items-baseline justify-between text-[13px]">
                      <span className="text-paper">{c.name}</span>
                      <span className="text-faint">{c.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>

          {/* Typography scale */}
          <RevealItem className="md:col-span-2">
            <div className={CARD}>
              <p className="text-[13px] tracking-[0.1em] text-faint uppercase">Typography Scale</p>
              <div className="mt-5 flex flex-col gap-4">
                <div className="flex items-baseline gap-4 border-b border-line pb-4">
                  <span className="w-16 shrink-0 text-[12px] text-faint">Display</span>
                  <span className="truncate text-[clamp(1.75rem,1.4rem+2vw,3rem)] font-medium text-paper">Aa</span>
                </div>
                <div className="flex items-baseline gap-4 border-b border-line pb-4">
                  <span className="w-16 shrink-0 text-[12px] text-faint">H1</span>
                  <span className="text-h3 font-medium text-paper">Building intelligent products</span>
                </div>
                <div className="flex items-baseline gap-4 border-b border-line pb-4">
                  <span className="w-16 shrink-0 text-[12px] text-faint">Body</span>
                  <span className="text-[16px] text-muted">Systems thinking applied to every surface.</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="w-16 shrink-0 text-[12px] text-faint">Caption</span>
                  <span className="text-[13px] tracking-wide text-faint">Index · Metadata · Labels</span>
                </div>
              </div>
            </div>
          </RevealItem>

          {/* Spacing */}
          <RevealItem>
            <div className={CARD}>
              <p className="text-[13px] tracking-[0.1em] text-faint uppercase">Spacing Scale</p>
              <div className="mt-5 flex flex-col gap-2.5">
                {SPACING.map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className="w-7 shrink-0 text-[12px] text-faint">{s}</span>
                    <span className="h-2 rounded-full bg-accent-dim" style={{ width: `${s * 1.6}px` }} />
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>

          {/* Components / variants */}
          <RevealItem className="md:col-span-2">
            <div className={CARD}>
              <p className="text-[13px] tracking-[0.1em] text-faint uppercase">Components &amp; Variants</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Button icon={false}>Primary</Button>
                <Button variant="secondary" icon={false}>
                  Secondary
                </Button>
                <Button variant="ghost" icon={false}>
                  Ghost
                </Button>
                <span className="rounded-full border border-line px-4 py-1.5 text-[13px] text-faint opacity-50">
                  Disabled
                </span>
              </div>
            </div>
          </RevealItem>

          {/* Responsive */}
          <RevealItem>
            <div className={CARD}>
              <p className="text-[13px] tracking-[0.1em] text-faint uppercase">Responsive Design</p>
              <div className="mt-5 flex items-end gap-4">
                <div className="h-10 w-6 rounded-sm border border-line-strong" />
                <div className="h-14 w-10 rounded-sm border border-line-strong" />
                <div className="h-16 w-16 rounded-sm border border-line-strong" />
              </div>
              <p className="mt-4 text-[13px] text-muted">Mobile · Tablet · Desktop — one system, fluid tokens.</p>
            </div>
          </RevealItem>

          {/* Handoff */}
          <RevealItem className="md:col-span-2">
            <div className={CARD}>
              <p className="text-[13px] tracking-[0.1em] text-faint uppercase">Developer Handoff</p>
              <pre className="mt-5 overflow-x-auto rounded-xl bg-ink p-5 text-[13px] leading-relaxed text-muted">
                <code>{`<Button variant="primary">View Projects</Button>
// className="bg-paper text-ink hover:bg-accent" — tokens, not hex`}</code>
              </pre>
            </div>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  )
}

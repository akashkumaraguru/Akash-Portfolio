import { CASE_STUDY_PROJECTS } from '../data/projects'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { StackedCaseStudy } from '../components/StackedCaseStudy'
import { CASE_STUDY_BASE, navigate } from '../lib/router'
import { LINE_GRID } from '../lib/textures'

export function Projects() {
  return (
    // Light top padding: the statement above already ends on ~220px of its own,
    // so a full pt-32 here read as a gap rather than a section break.
    <section id="work" className="relative bg-white pt-14 pb-24 md:pb-0">
      {/* Backdrop grid. First in DOM and with no z-index of its own: a negative
          z-index would drop it behind the section's own background, and giving
          the section `isolate` to fix that would make it the scroll container
          for the sticky cards and break the stack. The clip lives here, not on
          the section, for the same reason. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={LINE_GRID}
      />

      <Container className="relative">
        <SectionHeading
          index="02"
          eyebrow="Case study"
          title="Turning complexity into clarity."
          description="Explore the products I've crafted through research, product thinking, and iterative design focused on creating meaningful experiences and measurable impact."
        />
      </Container>

      {/* The heading scrolls away, then each case study pins in turn — every
          panel lands on the same spot, so one replaces the next. */}
      <div className="relative grid gap-14 px-6 md:mt-6 md:gap-2 md:px-0">
        {CASE_STUDY_PROJECTS.map((project, i) => (
          <StackedCaseStudy
            key={project.id}
            project={project}
            index={i}
            onOpen={() => navigate(`${CASE_STUDY_BASE}${project.id}`)}
          />
        ))}
      </div>
    </section>
  )
}

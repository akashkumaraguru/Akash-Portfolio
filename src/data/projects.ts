import surfSellerHub from '../assets/projects/surf-seller-hub.png'
import niramKalavai from '../assets/projects/niram-kalavai.png'
import svgPathSplitter from '../assets/projects/svg-path-splitter.png'
import katalyst from '../assets/projects/katalyst.svg'
import mockupSeatSelection from '../assets/projects/mockups/seat-selection.png'
import mockupSignIn from '../assets/projects/mockups/sign-in.png'
import mockupTicketSummary from '../assets/projects/mockups/ticket-summary.png'
import mockupHome from '../assets/projects/mockups/home.png'
import mockupSplash from '../assets/projects/mockups/splash.png'
import mockupEvents from '../assets/projects/mockups/events.png'
import mockupShowtimes from '../assets/projects/mockups/showtimes.png'
import mockupFilter from '../assets/projects/mockups/filter.png'

/** The four columns of phone screens that scroll behind the ticketing card. */
const TICKETING_MOCKUP_COLUMNS = [
  [mockupSeatSelection, mockupSignIn, mockupTicketSummary],
  [mockupHome, mockupSplash, mockupEvents],
  [mockupSignIn, mockupShowtimes, mockupFilter],
  [mockupTicketSummary, mockupSeatSelection, mockupSignIn],
]

export type Project = {
  id: string
  name: string
  tagline: string
  category: string
  year: string
  role: string
  tools: string[]

  /* ---- card face ---- */
  /** Screenshot collage. Without one the card falls back to a generated tile. */
  cover?: string
  /** Logos need breathing room; screenshots should bleed to the edges. */
  coverFit?: 'cover' | 'contain'
  /** Columns of phone screenshots that scroll behind the card, newest first. */
  coverMockups?: string[][]
  /** Solid blue pill in the cover's top-right, e.g. "Figma Plugin". */
  badge?: string
  /** Outlined pill on the card, e.g. "Live on playstore". Omitted when absent. */
  status?: string
  /** Full sentence headline on the card. Falls back to `tagline`. */
  headline?: string
  /** "Scope of Work" list. Falls back to `tools`. */
  scope?: string[]

  /* ---- long-form case study; sections render only when present ---- */
  problem?: string
  research?: string
  opportunity?: string
  aiIntegration?: string
  wireframes?: string
  userFlows?: string
  designSystem?: string
  prototype?: string
  frontendContribution?: string
  businessImpact?: string
  lessonsLearned?: string
  metrics?: { label: string; value: string }[]
}

export const PROJECTS: Project[] = [
  {
    id: 'surf-seller-hub',
    name: 'Surf Seller Hub',
    tagline: 'Seller operations app for a B2B marketplace',
    category: 'B2B · Android App',
    status: 'Live on playstore',
    headline:
      'Redesigned the Surf Seller Hub App to Simplify Tasks for Non-Tech-Savvy Sellers',
    scope: [
      'UX/UI Design',
      'UX Research',
      'Prototyping',
      'Responsive Design',
      'Design System',
      'Developer Handoff',
    ],
    cover: surfSellerHub,
    year: '2024',
    role: 'Product Designer',
    tools: ['Figma', 'FigJam'],
  },
  {
    id: 'niram-kalavai',
    name: 'Niram Kalavai',
    tagline: 'AI-powered colour and gradient generation tool',
    category: 'AI Tool · Design Utility',
    headline:
      'Built Niram Kalavai from the ground up, combining product design, frontend development, and developer-friendly features into a single tool.',
    scope: ['UX Design', 'UI Design', 'NextJs', 'Tailwind CSS', 'Github', 'Vercel'],
    cover: niramKalavai,
    coverFit: 'contain',
    badge: 'Design & Developed',
    year: '2024',
    role: 'Product Designer · AI Workflow · Frontend',
    tools: ['Figma', 'React', 'OpenAI', 'Tailwind CSS'],
    problem:
      'Designers lose disproportionate time hand-tuning colour palettes and gradients that feel cohesive across a product, bouncing between inspiration boards and trial-and-error in design tools.',
    research:
      'Interviewed designers and reviewed existing colour tools to map where friction lived — mostly in translating a mood or brand word into an accessible, production-ready palette.',
    opportunity:
      'A prompt-driven generator could compress that loop: describe an intent in plain language and get palettes and gradients that are already contrast-checked and export-ready.',
    aiIntegration:
      'An LLM interprets natural-language prompts into colour theory constraints (hue relationships, mood, contrast targets), which a deterministic colour engine then renders into palettes — AI drives ideation, math guarantees correctness.',
    wireframes:
      'Low-fidelity flows explored prompt-first vs. control-first entry points; prompt-first won for speed, with manual controls surfaced progressively for fine-tuning.',
    userFlows:
      'Prompt → generated palette set → refine (lock a colour, nudge hue/saturation) → export (CSS variables, Tailwind config, Figma variables).',
    designSystem:
      'Built a compact token-based UI kit for the tool itself — swatches, sliders, and export cards — so the product demonstrates the same design-system thinking it helps others apply.',
    prototype:
      'Interactive Figma prototype validated the prompt-to-palette loop before frontend build; motion specs defined for palette transitions.',
    frontendContribution:
      'Implemented the production UI in React and Tailwind, including the live palette preview canvas and one-click export to code.',
    businessImpact:
      'Positioned as a portfolio-defining AI tool demonstrating end-to-end AI product thinking — from prompt design to shippable frontend.',
    lessonsLearned:
      'Constraining AI output with deterministic rules (accessibility, contrast) produced far more trustworthy results than letting the model generate raw hex values directly.',
    metrics: [
      { label: 'Time to usable palette', value: 'Prompt → export in under 30s' },
      { label: 'Accessibility', value: 'WCAG AA contrast enforced by default' },
      { label: 'Export formats', value: 'CSS · Tailwind · Figma variables' },
    ],
  },
  {
    id: 'gnapi-healthcare',
    name: 'Gnapi Healthcare',
    tagline: 'Clinic Management System',
    category: 'Healthcare SaaS',
    year: '2023 — Ongoing',
    role: 'Product Designer · Design Systems · Frontend Collaboration',
    tools: ['Figma', 'FigJam', 'React', 'TypeScript'],
    problem:
      'Small and mid-size clinics were running scheduling, records, and billing across disconnected tools, creating friction for front-desk staff and inconsistent records for clinicians.',
    research:
      'Shadowed clinic front-desk workflows and interviewed practitioners to understand the real sequence of a patient visit, from booking to billing, and where handoffs broke down.',
    opportunity:
      'A single, role-aware system — receptionist, doctor, admin — could remove duplicate data entry and give each role only the surface area they need.',
    aiIntegration:
      'AI-assisted drafting for clinical notes and smart scheduling suggestions that account for practitioner load and patient history, kept firmly in a human-in-the-loop review step.',
    wireframes:
      'Role-based wireframes for reception, consultation, and admin dashboards, validated against real clinic scripts before high-fidelity design.',
    userFlows:
      'Patient intake → appointment scheduling → consultation & notes → prescription/billing → records archive, each flow scoped to the minimum steps per role.',
    designSystem:
      'Established a healthcare-grade design system: accessible colour tokens for clinical states (urgent, routine, follow-up), dense data-table components, and form patterns built for speed under time pressure.',
    prototype:
      'Clickable end-to-end prototype used in stakeholder and clinician review cycles before development sign-off.',
    frontendContribution:
      'Partnered directly with engineering to implement core UI components in React/TypeScript, ensuring design tokens shipped as the actual source of truth in code.',
    businessImpact:
      'Consolidated three disconnected tools into one platform, reducing context-switching for clinic staff and giving the business a single scalable product to sell across clinics.',
    lessonsLearned:
      'In healthcare, trust is a design material — every state, error, and confirmation had to be unambiguous, since mistakes here carry real-world weight.',
    metrics: [
      { label: 'Workflows unified', value: '3 tools → 1 platform' },
      { label: 'Roles supported', value: 'Reception · Clinician · Admin' },
      { label: 'Status', value: 'Live in production clinics' },
    ],
  },
  {
    id: 'ticketspi',
    name: 'TicketsPi',
    tagline: 'Event Ticketing Platform',
    category: 'Marketplace · SaaS',
    headline:
      'Improved the end-to-end booking experience by reducing user friction, decreasing ticket booking drop-offs, enhancing first-time user activation.',
    scope: [
      'Heuristic Evaluation',
      'UX Research',
      'Prototyping',
      'Responsive Design',
      'Design System',
      'Developer Handoff',
      'Mobile Application',
    ],
    coverMockups: TICKETING_MOCKUP_COLUMNS,
    year: '2023',
    role: 'Product Designer',
    tools: ['Figma', 'FigJam'],
    problem:
      'Independent event organisers needed a ticketing platform that felt as polished as major players, without the enterprise overhead or fees.',
    research:
      'Compared organiser workflows across existing ticketing platforms to isolate the smallest set of features that covered 90% of independent-organiser needs.',
    opportunity:
      'A streamlined organiser dashboard paired with a fast, low-friction checkout could win on speed and clarity rather than feature volume.',
    aiIntegration:
      'AI-assisted copy suggestions for event listings and demand-based pricing prompts to help organisers price tiers with more confidence.',
    wireframes:
      'Parallel wireframe tracks for the organiser dashboard and the attendee checkout flow, tested independently for their very different pacing needs.',
    userFlows:
      'Organiser: create event → configure tickets/tiers → publish → track sales. Attendee: discover event → select tickets → checkout → receive pass.',
    designSystem:
      'Componentised ticket cards, tier selectors, and checkout steps for reuse across web and future mobile surfaces.',
    prototype:
      'High-fidelity prototype used to test checkout drop-off points, particularly around ticket-tier comparison.',
    frontendContribution:
      'Contributed component-level frontend polish and interaction detail alongside the engineering team.',
    businessImpact:
      'Delivered a checkout experience built to minimise drop-off at the highest-friction step in any ticketing product — payment.',
    lessonsLearned:
      'For marketplace products, the two sides of the platform (organiser vs. attendee) need entirely separate design rhythms — one is a workspace, the other is a moment.',
    metrics: [
      { label: 'Core flows', value: 'Organiser dashboard · Attendee checkout' },
      { label: 'Design focus', value: 'Checkout drop-off reduction' },
    ],
  },
  {
    id: 'onion',
    name: 'Onion',
    tagline: 'Test Management Platform',
    category: 'Developer Tooling · SaaS',
    year: '2023',
    role: 'Product Designer',
    tools: ['Figma', 'FigJam'],
    problem:
      'QA teams were tracking test cases, runs, and bugs across spreadsheets and disconnected tools, losing traceability between a requirement and its test coverage.',
    research:
      'Worked with QA engineers to map how test cases are authored, executed, and linked back to requirements and defects in practice.',
    opportunity:
      'A single structured system connecting requirements → test cases → runs → defects would give teams real traceability instead of tribal knowledge.',
    aiIntegration:
      'AI-assisted test case generation from requirement text, giving QA engineers a first draft to edit rather than a blank page.',
    wireframes:
      'Information-dense wireframes for test-case libraries and run dashboards, prioritising scanability for engineers working through hundreds of cases.',
    userFlows:
      'Define requirement → generate/author test cases → execute run → log defect → trace back to requirement.',
    designSystem:
      'Dense, developer-tool-appropriate UI kit: monospace-friendly tables, status chips, and keyboard-first interaction patterns.',
    prototype:
      'Prototype used internally to validate the traceability model before build.',
    frontendContribution:
      'Provided detailed component specs and interaction states for engineering handoff.',
    businessImpact:
      'Gave QA teams a single source of truth connecting requirements to coverage, reducing time spent reconciling spreadsheets.',
    lessonsLearned:
      'Developer tools reward density and speed over decoration — every added visual element has to earn its place against raw information clarity.',
    metrics: [
      { label: 'Traceability', value: 'Requirement → Test → Defect, linked' },
      { label: 'Design focus', value: 'Density without clutter' },
    ],
  },
  {
    id: 'databridge',
    name: 'DataBridge',
    tagline: 'Data integration and pipeline platform',
    category: 'Data Infrastructure · SaaS',
    year: '2022',
    role: 'Product Designer',
    tools: ['Figma', 'FigJam'],
    problem:
      'Teams needed a clearer way to connect, monitor, and troubleshoot data pipelines spanning multiple sources without deep engineering involvement for every change.',
    research:
      'Studied how data and ops teams currently configure integrations, focusing on where non-engineers got stuck and had to escalate to engineering.',
    opportunity:
      'A visual pipeline builder with clear status and error states could let more of the team self-serve integration changes safely.',
    aiIntegration:
      'AI-assisted schema mapping suggestions when connecting a new data source, cutting down manual field-matching work.',
    wireframes:
      'Wireframed a node-based pipeline canvas alongside a simpler guided-setup mode for common integration patterns.',
    userFlows:
      'Connect source → map fields → configure sync rules → monitor pipeline health → resolve errors.',
    designSystem:
      'Status-driven visual language (healthy, degraded, failed) applied consistently across canvas nodes, tables, and notifications.',
    prototype:
      'Prototype validated the guided-setup path against the advanced canvas mode with target users of both skill levels.',
    frontendContribution:
      'Defined interaction and state specs for the pipeline canvas for engineering implementation.',
    businessImpact:
      'Reduced reliance on engineering for routine integration changes by giving ops teams a self-serve path.',
    lessonsLearned:
      'Progressive disclosure mattered more than raw power here — most users needed the guided path, not the full canvas.',
    metrics: [
      { label: 'Design focus', value: 'Self-serve integration setup' },
      { label: 'States mapped', value: 'Healthy · Degraded · Failed' },
    ],
  },
  {
    id: 'fleet-management',
    name: 'Fleet Management Platform',
    tagline: 'Operations platform for vehicle fleet tracking and dispatch',
    category: 'Logistics · Operations SaaS',
    year: '2022',
    role: 'Product Designer',
    tools: ['Figma', 'FigJam'],
    problem:
      'Fleet operators needed real-time visibility into vehicle status, driver assignments, and maintenance schedules to reduce downtime and dispatch delays.',
    research:
      'Reviewed dispatcher workflows to understand decision-making under time pressure — which data mattered in the first five seconds of a screen.',
    opportunity:
      'A live operations dashboard prioritising the handful of signals that actually drive dispatch decisions, with detail available on demand rather than by default.',
    aiIntegration:
      'AI-assisted route and dispatch suggestions based on vehicle location, driver availability, and job priority.',
    wireframes:
      'Wireframed a map-first dashboard with a collapsible detail panel, tested against real dispatcher scenarios.',
    userFlows:
      'Monitor fleet map → assign job to available driver → track job status → flag maintenance need → schedule service.',
    designSystem:
      'Built map-overlay components, vehicle-status chips, and a dispatch queue pattern reusable across operations views.',
    prototype:
      'Prototype tested with dispatchers to confirm the map-first layout reduced time-to-decision versus the team’s prior tool.',
    frontendContribution:
      'Delivered detailed specs and light frontend support for the dashboard’s data-dense components.',
    businessImpact:
      'Gave operations teams a single live view of the fleet, aimed at reducing dispatch delays and missed maintenance windows.',
    lessonsLearned:
      'For operational, real-time tools, information hierarchy under time pressure matters more than visual richness — clarity is the feature.',
    metrics: [
      { label: 'Design focus', value: 'Time-to-decision for dispatch' },
      { label: 'Core view', value: 'Live map-first operations dashboard' },
    ],
  },
  {
    id: 'katalyst',
    name: 'Katalyst',
    tagline: 'Testing ecosystem designed from zero to one',
    category: 'Developer Tooling · SaaS',
    headline:
      'Designed Katalyst from 0 → 1, transforming an idea into a comprehensive testing ecosystem. Owned the entire product design journey from discovery and strategy to launch-ready interfaces.',
    scope: [
      'UX Research & Ideation',
      'Prototyping',
      'Responsive Design',
      'Design System',
      'Developer Handoff',
    ],
    cover: katalyst,
    coverFit: 'contain',
    year: '2024',
    role: 'Product Designer',
    tools: ['Figma', 'FigJam'],
  },
  {
    id: 'svg-path-splitter',
    name: 'SVG Path Splitter',
    tagline: 'Figma plugin for splitting complex SVG paths',
    category: 'Figma Plugin · Design Utility',
    headline:
      'Designed and developed a Figma plugin that helps designers split complex SVG paths into editable segments, simplifying icon editing and vector workflows.',
    scope: ['UX Design', 'Java Script'],
    cover: svgPathSplitter,
    coverFit: 'contain',
    badge: 'Figma Plugin',
    year: '2024',
    role: 'Product Designer · Frontend',
    tools: ['Figma', 'JavaScript'],
  },
]

/**
 * The case-study grid, in display order. Only these four are shown; the rest of
 * PROJECTS stays available for case-study pages and future sections.
 */
export const CASE_STUDY_ORDER = ['ticketspi', 'katalyst', 'niram-kalavai', 'svg-path-splitter']

export const CASE_STUDY_PROJECTS = CASE_STUDY_ORDER.map((id) =>
  PROJECTS.find((p) => p.id === id),
).filter((p): p is Project => p !== undefined)

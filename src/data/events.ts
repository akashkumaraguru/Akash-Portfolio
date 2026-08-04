export type EventItem = {
  name: string
  org: string
  location: string
  date: string
  role: string
  learnings: string
  impact: string
}

export const EVENTS: EventItem[] = [
  {
    name: 'Designathon',
    org: 'Lollypop Design Studio',
    location: 'Add location',
    date: 'Add date',
    role: 'Finalist — Top 6',
    learnings: 'Designing under a hard deadline forces ruthless prioritisation of what actually matters to the user.',
    impact: 'Sharpened how quickly I can move from brief to a defensible design direction.',
  },
  {
    name: 'Google I/O Connect',
    org: 'Google Developer Groups',
    location: 'Add location',
    date: 'Add date',
    role: 'Attendee',
    learnings: 'Saw how fast AI tooling is reshaping product and developer workflows in practice, not just in theory.',
    impact: 'Reinforced treating AI as a design material, not a bolt-on feature.',
  },
  {
    name: 'Friends of Figma — Config',
    org: 'Friends of Figma',
    location: 'Add location',
    date: 'Add date',
    role: 'Attendee',
    learnings: 'Direct exposure to how top product teams structure design systems and variables at scale.',
    impact: 'Shaped the token-first approach used across my own design system work.',
  },
  {
    name: 'Build with AI',
    org: 'Google Developer Groups',
    location: 'Add location',
    date: 'Add date',
    role: 'Attendee',
    learnings: 'Hands-on exposure to building real product features on top of modern LLM APIs.',
    impact: 'Directly informs how I scope AI Integration in my own project case studies.',
  },
  {
    name: 'DevFest',
    org: 'Google Developer Groups',
    location: 'Add location',
    date: 'Add date',
    role: 'Attendee',
    learnings: 'Cross-disciplinary talks connecting engineering practice back to product and design decisions.',
    impact: 'Keeps my frontend collaboration grounded in current engineering practice.',
  },
  {
    name: 'UX Community Meetup',
    org: 'Local UX Community',
    location: 'Add location',
    date: 'Add date',
    role: 'Attendee',
    learnings: 'Peer critique surfaces blind spots that internal team reviews often miss.',
    impact: 'Regular check against my own assumptions outside of one company\'s context.',
  },
  {
    name: 'Product Design Workshop',
    org: 'Design Community',
    location: 'Add location',
    date: 'Add date',
    role: 'Participant',
    learnings: 'Structured practice applying design thinking frameworks to unfamiliar problem spaces.',
    impact: 'Added repeatable frameworks to how I run early-stage Discover work.',
  },
  {
    name: 'AI Conference',
    org: 'AI Community',
    location: 'Add location',
    date: 'Add date',
    role: 'Attendee',
    learnings: 'Broader view of where AI product patterns are heading beyond any single tool.',
    impact: 'Keeps the AI Design Philosophy section grounded in the wider field, not one vendor.',
  },
  {
    name: 'Hackathon',
    org: 'Various',
    location: 'Add location',
    date: 'Add date',
    role: 'Participant',
    learnings: 'Compressed timelines make you design and ship the smallest true version of an idea.',
    impact: 'The instinct behind how quickly I move from prototype to validation.',
  },
  {
    name: 'Design Talk',
    org: 'Design Community',
    location: 'Add location',
    date: 'Add date',
    role: 'Attendee',
    learnings: 'Exposure to how senior designers narrate trade-offs, not just final decisions.',
    impact: 'Influences how each project case study here is structured around reasoning, not just outcomes.',
  },
]

import antigravityIcon from '../assets/hero/antigravity-icon.svg'
import githubIcon from '../assets/hero/github-icon.svg'
import xcodeIcon from '../assets/hero/xcode-icon.svg'
// Full-colour marks, kept apart from the hero's set: the hero puts Claude and
// Gemini on coloured plates and so needs white cut-outs of them, whereas these
// panels want the real artwork.
import figmaIcon from '../assets/tools/figma.svg'
import framerIcon from '../assets/tools/framer.svg'
import claudeIcon from '../assets/tools/claude.svg'
import geminiIcon from '../assets/tools/gemini.svg'
import adobeIcon from '../assets/tools/adobe.svg'
import chatgptIcon from '../assets/tools/chatgpt.svg'
import vscodeIcon from '../assets/tools/vscode.svg'
import cursorIcon from '../assets/tools/cursor.svg'
import terminalIcon from '../assets/tools/terminal.svg'
import vercelIcon from '../assets/tools/vercel.svg'

/**
 * Everything in the Tools panel — design, build and ship, in that order.
 *
 * The marks the repo has are imported and bundled. The rest are trademarked
 * artwork it does not have yet, referenced by public/ path so a missing file
 * 404s quietly instead of breaking the build, and appears the moment it is
 * dropped in. See public/skills/tools/README.md.
 */
export type SkillTool = {
  id: string
  name: string
  icon: string
  /** Marks the ones whose artwork needs a dark plate rather than the light default. */
  dark?: boolean
}

/** Icons the repo does not have, resolved at runtime rather than bundled. */
const pending = (id: string) => `/skills/tools/${id}.svg`

export const SKILL_TOOLS: SkillTool[] = [
  { id: 'figma', name: 'Figma', icon: figmaIcon, dark: true },
  { id: 'framer', name: 'Framer', icon: framerIcon },
  { id: 'vscode', name: 'VS Code', icon: vscodeIcon },
  // Solid black artwork, so it needs the light plate — on the dark one it
  // disappeared entirely.
  { id: 'cursor', name: 'Cursor', icon: cursorIcon },
  { id: 'miro', name: 'Miro', icon: pending('miro') },
  { id: 'adobe', name: 'Creative Cloud', icon: adobeIcon },
  { id: 'photoshop', name: 'Photoshop', icon: pending('photoshop'), dark: true },
  { id: 'illustrator', name: 'Illustrator', icon: pending('illustrator'), dark: true },
  { id: 'premiere', name: 'Premiere Pro', icon: pending('premiere'), dark: true },
  { id: 'claude', name: 'Claude', icon: claudeIcon, dark: true },
  { id: 'gemini', name: 'Gemini', icon: geminiIcon, dark: true },
  // Its artwork is set in currentColor, which an <img> resolves to black rather
  // than inheriting from the page — so it needs the light plate too.
  { id: 'chatgpt', name: 'ChatGPT', icon: chatgptIcon },
  { id: 'antigravity', name: 'Antigravity', icon: antigravityIcon, dark: true },
  // ship
  { id: 'github', name: 'GitHub', icon: githubIcon, dark: true },
  { id: 'terminal', name: 'Terminal', icon: terminalIcon },
  { id: 'xcode', name: 'Xcode', icon: xcodeIcon },
  { id: 'vercel', name: 'Vercel', icon: vercelIcon },
]

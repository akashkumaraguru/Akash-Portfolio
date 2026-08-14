# Dock tool icons

The Tools panel in the Skills bento, driven by `src/data/skillsDock.ts`.

Most marks are bundled from `src/assets/`. Anything still missing is referenced
from **this folder** by path, so a missing file 404s quietly instead of breaking
the build — the tile shows the tool's first two letters until the file lands.

## Still needed

| file | tool |
|---|---|
| `miro.svg` | Miro |
| `photoshop.svg` | Photoshop |
| `illustrator.svg` | Illustrator |
| `premiere.svg` | Premiere Pro |

## Bundled already

`src/assets/tools/` — Figma, VS Code, Cursor, Adobe, Claude, Gemini, ChatGPT,
Terminal, Vercel. Plus Antigravity, GitHub and Xcode from `src/assets/hero/`.

**These are kept separate from the hero's icon set on purpose.** The hero puts
Claude and Gemini on coloured plates, so it needs white cut-outs of them; the
Claude mark here is `#d97757`, which would vanish on the hero's orange plate.
Never point the two at the same file.

## Adding one

Drop the SVG in with the filename above and it appears. Then check the plate:
`dark` on its entry in `skillsDock.ts` puts it on a near-black tile, otherwise it
gets the light one. Judge by the artwork's own colour, not the brand's —

- solid black marks (Cursor, Vercel, Terminal) need the **light** plate
- white or multi-colour marks (Gemini, Figma, GitHub) need the **dark** one
- artwork set in `currentColor` (ChatGPT) resolves to black inside an `<img>`,
  since an external SVG does not inherit page CSS — treat it as black

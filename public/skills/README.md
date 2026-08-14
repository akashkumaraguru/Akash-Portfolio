# Skills section assets

Frame: Figma `Design-Others`, node **1185:12792** ("Skills"), 1430 × 1030.

`src/sections/Skills.tsx` reproduces that frame as an aspect-locked box with every
child positioned as a fraction of it, taken straight from the node metadata. All
four rasters below are referenced by path, so a missing one hides itself rather
than breaking the build or showing a broken-image glyph.

| file | Figma node | size in frame | status |
|---|---|---|---|
| `mac-screen.png` | `1185:12804` (image 155) | x160 y239, 1093 × 710 | **missing** |
| `callout-skills.png` | `1185:12806` (image 153) | x6 y482, 154 × 112 | **missing** |
| `callout-tools.png` | `1185:12805` (image 153) | x6 y844, 154 × 112 | present |
| `callout-desktop.png` | `1186:12810` (image 152) | x1242 y564, 188 × 113 | present |

**Why the two missing ones cannot be generated:** the Dev Mode MCP server is set
to write assets to disk without a path, so `get_design_context` fails with
_"Path for asset writes as tool argument is required for write-to-disk option"_
and no asset URLs come back. `get_metadata` and `get_screenshot` still work,
which is why the geometry above is exact. Fix that setting in Figma desktop
(**Preferences → Dev Mode MCP Server**) and they can be pulled directly.

`callout-skills.png` is handwriting and cannot be set in a font — it has to come
out of Figma as artwork.

## Where the two present callouts came from

They were **extracted from `desktop.png`**, which carries the same two callouts
in the same hand, baked into the older composition:

- `callout-tools` — sits on the transparent plate outside the Mac window, so it
  was lifted straight from the alpha channel. Cropped at x=430 rather than the
  window edge at 434, so the window's antialiased border does not come with it
  and read as a stray rule. Costs the very tip of the arrow head.
- `callout-desktop` — overlaps the window, so alpha alone would have cut off the
  "A" and the whole arrow. Separated by darkness instead: the ink sits at ~4
  luminance and the screen behind it at ~100, so a cut at 25–80 keeps the
  strokes and drops the plate. Complete, no clipping.

Both are tight crops around the ink, so their aspect ratios differ from the Figma
node boxes (which include padding). They are placed with `object-contain`, which
centres them in the correct box.

## Also present

### `desktop.png`, `mac-menubar.png`

From the **previous** version of this frame (node `1164:6804`) — a different
composition, 1436 × 649, desert wallpaper, callouts baked into the artwork.
`mac-menubar.png` was cropped out of it at the window bounds.

Neither is referenced by `Skills.tsx` any more, but **do not delete `desktop.png`
until `callout-skills.png` lands** — it is the source the other two callouts were
extracted from.

## Related, elsewhere in the repo

- **`public/skills/tools/`** — the dock icons. See that folder's README; six
  marks are still missing.
- **`public/fonts/oooh-baby-latin.woff2`** — was used for a live "Skills"
  callout in the previous frame. This frame ships all three callouts as artwork,
  so nothing currently uses it.

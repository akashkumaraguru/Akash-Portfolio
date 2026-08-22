# Meetup Diary photos

The collages in the Meetup Diary section (`src/sections/Meetups.tsx`), from Figma
node `1194:2524`.

## Layout

One folder per event, named for its `id` in `src/data/meetups.ts`. Photos are
numbered from 1:

```
public/meetups/<event-id>/1.jpg, 2.jpg, …
```

`photos` on the event says how many the card expects. A file that is not there
drops its grid cell rather than leaving an empty box, so the section is safe to
ship half-populated.

## Expected

| folder | photos | event |
|---|---|---|
| `madrasters` | 4 | Madrasters Core member |
| `lollypop-designathon` | 6 | Lollypop Designathon 2025 |
| `devfest-2025` | 5 | Google Developer Devfest - 2025 |
| `the-clan` | 3 | The Clan Event |
| `umo` | 4 | UMO Design Event |
| `design-led-transformation` | 6 | Future of Design-Led Enterprise Transformation |
| `cubbon-design` | 4 | Cubbon Design Casual meetup |
| `friends-of-figma-navi` | 4 | Friends of Figma X Navi |
| `figma-config-watch-party` | 5 | Figma Config Watch party |
| `shoptalk-school` | 4 | Shoptalk School Design Edition |
| `google-connect-io` | 5 | Google Connect IO Extended |

50 photos in all.

**Why they are not here:** the Dev Mode MCP server is set to write assets to disk
without a path, so `get_design_context` fails with _"Path for asset writes as
tool argument is required for write-to-disk option"_ and returns no asset URLs.
`get_metadata` and `get_screenshot` work, which is where the card structure and
copy came from. Fix that in Figma desktop (**Preferences → Dev Mode MCP Server**)
and all 50 can be pulled straight out.

## Also missing

Every card links to a LinkedIn post, but no URLs were in the frame. Add `href`
to an event in `src/data/meetups.ts` and its button becomes a real link; without
one the button renders dimmed and inert rather than pointing nowhere.

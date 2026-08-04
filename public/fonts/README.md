# Brand fonts

The type system is two families — **Monorope** (UI / labels / headings) and
**Awesome Serif** (display + the italic accent used in every section heading).

Neither ships on a free CDN (both are licensed faces from the Framer library),
so the binaries are intentionally not committed. Export `woff2` from your
licensed copies and drop them here with these exact names:

| File                                | Family        | Axis / style        |
| ----------------------------------- | ------------- | ------------------- |
| `Monorope-Variable.woff2`           | Monorope      | `wght` 200–800      |
| `AwesomeSerif-Variable.woff2`       | Awesome Serif | `wght` 300–900      |
| `AwesomeSerif-VariableItalic.woff2` | Awesome Serif | `wght` 300–900 ital |

The `@font-face` rules live in [`src/index.css`](../../src/index.css). No other
change is needed — the whole site reads the `--font-*` tokens.

If you only have static weights, replace each `@font-face` with one block per
weight (400 / 500 / 600 / 700) and drop the variable `font-weight` range.

## Until the files land

The stacks fall back to **Manrope** (Monorope's proportional sibling) and
**Fraunces** (a high-contrast serif), both already preloaded in `index.html`,
so the layout and rhythm stay correct — only the exact letterforms differ.

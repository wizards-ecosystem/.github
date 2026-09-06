# The Wizard's Ecosystem brand package

This directory is the canonical distributable identity package for The Wizard's
Ecosystem. The approved direction combines the sharp shared signature from brand option
1 with the watercolor project lettering and illustrated treatment from brand option 2.

The family rule is simple: use the same `The Wizard's` signature every time, then pair it
with the project's own artwork and accent. Never regenerate, retype, recolor, or redraw
the family signature for an individual project.

## Choose the right asset

| Asset | Use | Background |
| --- | --- | --- |
| `signature/the-wizards.svg` | Shared family signature | Light surfaces |
| `signature/the-wizards-reversed.svg` | Shared signature only | Dark surfaces |
| `<project>/<project>-art.png` | Project word and watercolor drawing without the signature | Compositing on light surfaces |
| `<project>/<project>-lockup.png` | Transparent complete lockup | Light surfaces |
| `<project>/<project>-header.png` | README and documentation header, 1200 x 480 | Ready to use |
| `<project>/<project>-social.png` | Social preview, 1200 x 630 | Ready to use |
| `<project>/<project>-icon.svg` | Favicons and compact product chrome | Ready to use |
| `<project>/<project>-avatar.png` | Repository or organization avatar, 500 x 500 | Ready to use |

The watercolor art is intentionally raster. The signature and compact marks are true
vector assets. There are no SVG wrappers that pretend embedded PNG artwork is a vector
master.

## Usage rules

- Keep the signature charcoal on light surfaces and soft white on dark surfaces.
- Put full watercolor lockups on the soft-white canvas (`#F7F6F2`) or a near-white
  untextured surface. On dark UI, use the compact mark or place the header on its own
  light card.
- Display a full header at 600 CSS pixels wide or more when practical. Below 360 pixels,
  prefer the compact mark plus a typeset product name.
- Display the shared signature at least 180 CSS pixels wide. Display compact marks at
  least 24 x 24 CSS pixels.
- Keep clear space around a lockup equal to the height of the lowercase `e` in the
  signature. Do not crop flourishes or watercolor edges.
- Do not add drop shadows, gradients, glow, parchment distress, or project-colored
  signatures.
- Use the full project name in headings and first mentions. Keep package names, commands,
  binary names, and repository slugs unchanged.

## Color and type

[`tokens.css`](tokens.css) and [`tokens.json`](tokens.json) define the shared semantic
surfaces, text, focus, status colors, and each project's light/dark accent pair. Every
listed text/accent pair was checked against the corresponding canvas at 4.5:1 or better.

Use Newsreader for editorial display text and Instrument Sans for interface text. The
font files and their SIL Open Font License texts are in [`fonts/`](fonts/). Code and
terminal content keeps the product's established monospace stack.

## Rebuild and verify

The build is self-contained. It reads only files inside this package and writes only the
documented generated exports.

```sh
cd brand/tooling
npm ci
npm run build
npm run check
```

The check validates dimensions, alpha requirements, size budgets, accessible SVG titles,
vector signature integrity, and project-specific compact marks. SHA-256 identities and
dimensions are recorded in [`manifest.json`](manifest.json).

The generated outputs are deterministic for the checked-in source images and pinned
toolchain. The four approved project drawings (Ink, Lyre, Brush, Pick) are mechanically
isolated from the approved sheet. OS, Conclave, Courier, and the ecosystem lockup use the
approved extension drawings in [`source/`](source/). See [`PROVENANCE.md`](PROVENANCE.md)
for the complete production record.

## Artwork policy

These marks identify projects in The Wizard's Ecosystem. The software licenses in the
individual repositories do not automatically grant permission to present a derivative
project as an official ecosystem project. A standalone trademark/artwork policy has not
yet been recorded; keep external redistribution and derivative branding out of release
claims until the maintainer records one.

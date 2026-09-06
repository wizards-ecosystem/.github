# The Wizard's Ecosystem brand

Status: canonical v1, approved and produced 2026-09-05.

This document is the authority for naming, visual identity, voice, and status language
across The Wizard's Ecosystem. The distributable artwork, semantic tokens, build tools,
and production guidance live in [`brand/`](brand/).

> Software that carries its own guarantees and runs on your machine.

## Brand idea

The Wizard's Ecosystem is a singular toolsmith studio of free, local-first software. It
should feel human before it feels technical, then reveal rigor on inspection. The useful
tensions are old-world soul with modern execution, warmth with precision, and distinct
projects made by one recognizable hand.

The wizard identity lives in names, calligraphy, tangible tools, material cues, and a
little wit. It does not require fantasy scenery, occult symbols, glowing effects, or a
purple-everything palette.

Permanent brand truths:

- Free and open source by design. The behavior should feel inspectable and user-owned.
- Local-first by design. Prefer tangible instruments over cloud or network metaphors.
- Evidence-bound. Public claims never outrun retained evidence.
- Serious work without a serious face. Personality is welcome; safety and status stay
  unmistakable.

## Naming

Write the organization name exactly as **The Wizard's Ecosystem**. After first mention,
use **the ecosystem** in running prose.

| Display name | Repository or package | Note |
| --- | --- | --- |
| **The Wizard's Ink** | `wizards-ink` | The project and home of the Wizzy language |
| **The Wizard's OS** | `the-wizards-os` | The operating system |
| **The Wizard's Conclave** | `wizards-conclave` | The orchestrator |
| **The Wizard's Courier** | `wizards-courier` | The durable job vendor |
| **The Wizard's Lyre** | `wizards-lyre` | The music studio |
| **The Wizard's Brush** | `wizards-brush` | The image and video studio |
| **The Wizard's Pick** | `wizards-pick` | The security tool |
| **The Wizard's Familiar** | `wizards-familiar` | The local coding agent |

Use the full display name in a title, heading, or first prose mention. Afterwards, use the
project word: Ink, OS, Conclave, Courier, Lyre, Brush, Pick, or Familiar. Slugs, commands, package
names, binary names, and file paths do not take apostrophes.

Wizzy is the language. The Wizard's Ink is its project and repository. Do not replace
language-context uses of `Wizzy` with the project name.

## Identity architecture

Every identity has two layers:

1. the one fixed `The Wizard's` family signature;
2. the project's own watercolor word and recognizable tool drawing.

The approved direction uses option 1's fine, sharp family signature with option 2's
softer project lettering, illustrations, pigment, colors, and flourishes. The signature
is never retyped, regenerated, or recolored per project. Project marks are related by
medium and motion, not by swapping one generic icon's color.

Use the checked-in assets according to [`brand/README.md`](brand/README.md). The signature
and compact marks are vector artwork. Watercolor artwork and complete lockups are raster
PNG assets by design.

## Color

The foundation is warm and neutral:

| Role | Light | Dark |
| --- | --- | --- |
| Canvas | `#F7F6F2` | `#232522` |
| Surface | `#FFFFFF` | `#2D302C` |
| Muted surface | `#ECE8DF` | `#383B36` |
| Text | `#272522` | `#F7F6F2` |
| Muted text | `#625F59` | `#C9C4BA` |
| Line | `#D8D3C9` | `#4A4D47` |
| Focus | `#285E63` | `#E3C477` |

Project accents:

| Project | Light canvas | Dark canvas |
| --- | --- | --- |
| Ecosystem | `#6F4738` | `#D8CFC3` |
| Ink | `#7A303B` | `#E2A3AC` |
| OS | `#485F79` | `#A9C0D8` |
| Conclave | `#65516D` | `#C9B0D3` |
| Courier | `#85621D` | `#E3C477` |
| Lyre | `#456348` | `#AFC9AE` |
| Brush | `#994D34` | `#E5AD99` |
| Pick | `#285E63` | `#95C6CA` |

Familiar has no accent pair yet. Its artwork has not been produced, so it ships with
the shared signature until that family exists.

These are semantic pairs, not interchangeable decoration. The light values meet or
exceed 4.5:1 against the light canvas; the dark companions do the same against the dark
canvas. Color never carries status alone. Exact machine-readable values live in
[`brand/tokens.json`](brand/tokens.json) and [`brand/tokens.css`](brand/tokens.css).

## Type and material

- Newsreader is the editorial and display face.
- Instrument Sans is the interface face.
- Product code and terminal content retain an established monospace stack.

Use the supplied local font files where a product needs self-contained web assets. A
system-serif fallback is acceptable in repository prose and generated documents.

Texture should be visible but refined: watercolor pigment, ink tooth, subtle paper fiber,
and controlled dry-brush edges. Do not bake paper texture into the vector signature or
compact marks. Avoid parchment aging, distress, burned edges, heavy glow, and fantasy
effects.

## Interface application

Interfaces are capable instruments, not branded posters. Apply the palette, typography,
focus treatment, compact mark, and small material details while preserving established
behavior and information density.

- Decorative artwork stays outside dense controls and generated-media overlays.
- Light documentation surfaces use the watercolor header. Dark products use the compact
  mark in chrome and keep full watercolor artwork on a dedicated light surface.
- Focus is obvious, keyboard-reachable, and not encoded by color alone.
- Corners are modest. Prefer fine rules and clear grouping to pill-shaped decoration.
- Motion is calm and functional. Reduced-motion preferences always win.

## Voice

Public wording never outruns the strongest retained evidence.

- Name what is built, what is specified, and what is gated.
- Name the dependency or record that holds a gate.
- Prefer a concrete number or artifact over an impression.
- Avoid hype: revolutionary, seamless, magical, blazing, effortless.
- Write plainly for an engineer who will check.
- Use sentence case in headings.
- Keep humor away from safety, authorization, status, and failure messages.

Projects with ASCII-only rules keep straight punctuation and ASCII separators. Other
surfaces may use typographic punctuation when their local style allows it.

## Status vocabulary

| Word | Meaning |
| --- | --- |
| **Working** | It runs and is used; it is not finished. |
| **Frozen** | It runs and is not being extended because a successor is coming. |
| **Specified** | It is designed and pinned by a conformance corpus; no implementation exists. |
| **Gated** | It is blocked on a named dependency with a written gate. |

Pair status with visibility when relevant: Working, private. Specified, private. Working,
public. Version numbers do not replace these words.

## Governance and production

The artwork manifest identifies exact outputs. The production build and asset validator
are pinned under `brand/tooling/`. Source and generation history are in
[`brand/PROVENANCE.md`](brand/PROVENANCE.md).

Do not silently modify a master asset. Change the source or builder, rebuild all families,
run the validator, visually inspect every header/icon, and record the change in provenance.
A standalone trademark/artwork policy is still an explicit maintainer decision; do not
imply that a software license makes derivative branding official.

# The Wizard's Ecosystem brand

Status: canonical v3, refreshed 2026-09-08. Replaces the opaque banner treatment.

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
| **The Wizard's OS** | `wizards-os` | The operating system |
| **The Wizard's Conclave** | `wizards-conclave` | The orchestrator |
| **The Wizard's Courier** | `wizards-courier` | The durable job vendor |
| **The Wizard's Lyre** | `wizards-lyre` | The music studio |
| **The Wizard's Brush** | `wizards-brush` | The image and video studio |
| **The Wizard's Pick** | `wizards-pick` | The security tool |
| **The Wizard's Familiar** | `wizards-familiar` | The local coding agent |
| **The Wizard's Herald** | `wizards-herald` | The local job-application workspace |
| **The Wizard's Press** | `wizards-press` | Internal publishing infrastructure; specified, not built |
| **The Wizard's Charter** | `wizards-charter` | Internal project assessment; specified, not built |

Use the full display name in a title, heading, or first prose mention. Afterwards, use the
project word: Ink, OS, Conclave, Courier, Lyre, Brush, Pick, Familiar, Herald, Press, or Charter. Slugs, commands, package
names, binary names, and file paths do not take apostrophes.

Wizzy is the language. The Wizard's Ink is its project and repository. Do not replace
language-context uses of `Wizzy` with the project name.

## Identity architecture

Each identity combines the fixed `The Wizard's` calligraphic signature, an outlined
Newsreader italic project word, and a distinct instrument mark. The horizontal logo is
the title on repository pages and the identity in application headers. It has no
background, frame, shadow, or surrounding card. Light and dark exports preserve the
same geometry and use the corresponding neutral and project pigments.

The signature geometry is never retyped or regenerated. The original watercolor
drawings remain available as large editorial illustrations; they are not UI headers.
All twelve identities have a vector logo and a compact mark, including the internal
tools. Artwork availability says nothing about product readiness.

Use the exports in [`brand/README.md`](brand/README.md) and inspect the complete family
in the [identity collection](brand/index.html).

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
| Familiar | `#52634A` | `#BACBAD` |
| Herald | `#824631` | `#E4B098` |
| Press | `#4D596D` | `#BAC6DD` |
| Charter | `#70582E` | `#D9C297` |

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
- Repository logos replace the title heading; do not add a duplicate title below them.
- Application logos sit in the existing header, normally 44-56 CSS pixels high. Use a
  compact mark in a narrow rail. Keep page titles as real text.
- Select light or dark artwork from the actual application theme. Automatic SVGs are
  for browser favicons; a manually selected application theme takes precedence in UI.
- Never put a pale card behind a logo. Social previews and avatar uploads have their own
  opaque exports because those surfaces require a complete image.
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
run the validator, visually inspect every logo/icon, and record the change in provenance.
A standalone trademark/artwork policy is still an explicit maintainer decision; do not
imply that a software license makes derivative branding official.

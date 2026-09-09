# Production artwork provenance

## Vector refresh, 2026-09-08

The owner requested backgroundless logos that occupy the header, consistent icons across
every service, and removal of stale banner guidance. Version 3 retains the exact shared
signature paths and the eight original watercolor illustration exports. Primary logos
now pair that signature with paths shaped from the bundled Newsreader italic face and
the project's instrument mark. No font installation or raster embedding is required.

Familiar (an attentive cat), Herald (a horn), Press (a screw press), and Charter (a
decision scroll) extend the vector family. Their accent pairs are recorded in the
manifest and checked for contrast. These identities do not imply a software release.
Light, dark, and browser-theme variants share geometry. Only social and avatar exports
carry opaque canvases. The 1200 x 480 banner exports are retired.

Production uses the pinned Sharp and Fontkit toolchain. No new AI-generated bitmap
artwork was needed for this vector extension. Existing watercolor pixels and their
reconstruction remain unchanged. Current usage lives in README.md and ../BRAND.md.

## Original illustration production, 2026-09-05

Approved reference: `source/approved-sheet.png` (the local
`brand-option-03-combined.png`), approved by Isaac 2026-09-05. The direction is
option 1's family signature with option 2's project lettering, drawings, pigment, and
watercolor treatment.

The initial built-in imagegen extraction attempts are retained outside this public
package in the private repository's `brand/archive/production-drafts/` directory. They
were rejected because several returned baked checkerboards, false transparency, or dark
halos. They are not production masters.

The production pipeline is recorded in `tooling/build-assets.mjs`:

- `The Wizard's` is mechanically isolated from the approved sheet and traced once to a
  true charcoal SVG. Every lockup uses the same rasterization of that master.
- Ink, Lyre, Brush, and Pick are mechanically isolated from the approved sheet. Their
  original lettering and drawings are not regenerated.
- OS, Conclave, Courier, and Ecosystem use white-background generated extension drawings
  in `source/`, then the build reconstructs alpha and composites the fixed signature.
- Watercolor assets are distributed as PNGs. Only the signature and compact marks are
  described as vector artwork.
- `manifest.json` records the output dimensions and SHA-256 identities.

No CLI/API fallback was used. Generated sources were created or corrected with the
built-in image generation tool. The fixed signature is composed downstream; project
artwork contains no family signature.

## signature

```text
Use case: background-extraction / identity-preserve. Isolate ONLY the sharp black "The Wizard's" signature from the TOP LEFT (above Lyre) of the approved reference sheet. Preserve that exact letter construction and all its strokes, including its long thin T crossbar, tall sharp W and taut pointed terminals. Remove everything else: project names, instrument, watercolor, dividers, sheet title, surface. Output just this one signature, enlarged cleanly, sharp charcoal #272522 artwork on genuinely transparent alpha background, centered with clear space, landscape 1536x1024. No redesign, added flourish, extra text, font substitution or tracing effect. This becomes the one shared production signature.
```

## lyre-art

```text
Use case: background-extraction / identity-preserve. Extract ONLY the approved LYRE colored project word and its entire integrated drawing from the reference. Preserve the original project lettering, exact drawing geometry, color, fine edges, watercolor tonal variation and flourishes as faithfully as possible. Match the approved reference's fine original italic project lettering, delicate ink drawing with translucent watercolor, expressive flowing flourishes and ample clear space. Preserve spelling. No The Wizard's signature: it will be composited from one fixed master separately. Transparent background with genuine alpha; no paper/background texture, headings, sheet lines, labels, captions, borders or shadows. One isolated project wordmark plus its drawing. Keep all artwork inside the canvas with generous clear space. Landscape 1536x1024. Remove the black "The Wizard's" line completely. The output must contain only "Lyre" and its drawing, not the other projects.
```

## pick-art

```text
Use case: background-extraction / identity-preserve. Extract ONLY the approved PICK colored project word and its entire integrated drawing from the reference. Preserve the original project lettering, exact drawing geometry, color, fine edges, watercolor tonal variation and flourishes as faithfully as possible. Match the approved reference's fine original italic project lettering, delicate ink drawing with translucent watercolor, expressive flowing flourishes and ample clear space. Preserve spelling. No The Wizard's signature: it will be composited from one fixed master separately. Transparent background with genuine alpha; no paper/background texture, headings, sheet lines, labels, captions, borders or shadows. One isolated project wordmark plus its drawing. Keep all artwork inside the canvas with generous clear space. Landscape 1536x1024. Remove the black "The Wizard's" line completely. The output must contain only "Pick" and its drawing, not the other projects.
```

## brush-art

```text
Use case: background-extraction / identity-preserve. Extract ONLY the approved BRUSH colored project word and its entire integrated drawing from the reference. Preserve the original project lettering, exact drawing geometry, color, fine edges, watercolor tonal variation and flourishes as faithfully as possible. Match the approved reference's fine original italic project lettering, delicate ink drawing with translucent watercolor, expressive flowing flourishes and ample clear space. Preserve spelling. No The Wizard's signature: it will be composited from one fixed master separately. Transparent background with genuine alpha; no paper/background texture, headings, sheet lines, labels, captions, borders or shadows. One isolated project wordmark plus its drawing. Keep all artwork inside the canvas with generous clear space. Landscape 1536x1024. Remove the black "The Wizard's" line completely. The output must contain only "Brush" and its drawing, not the other projects.
```

## ink-art

```text
Use case: background-extraction / identity-preserve. Extract ONLY the approved INK colored project word and its entire integrated drawing from the reference. Preserve the original project lettering, exact drawing geometry, color, fine edges, watercolor tonal variation and flourishes as faithfully as possible. Match the approved reference's fine original italic project lettering, delicate ink drawing with translucent watercolor, expressive flowing flourishes and ample clear space. Preserve spelling. No The Wizard's signature: it will be composited from one fixed master separately. Transparent background with genuine alpha; no paper/background texture, headings, sheet lines, labels, captions, borders or shadows. One isolated project wordmark plus its drawing. Keep all artwork inside the canvas with generous clear space. Landscape 1536x1024. Remove the black "The Wizard's" line completely. The output must contain only "Ink" and its drawing, not the other projects.
```

## os-art

```text
Use case: logo-brand. Extend the approved family with a custom project word "OS" in slate blue #485F79. A circular open mechanism, a finely drawn brass-and-slate armillary-style instrument with two open nested supporting arcs and a small central axis, softly washed in slate blue, expresses foundation, containment and system structure. The O follows an open circular gesture; the S sweeps underneath the drawing. Recognizable handmade precision instrument, restrained and delicate, no computer chip, power button, mountains, planets or mystical geometry. Match the approved reference's fine original italic project lettering, delicate ink drawing with translucent watercolor, expressive flowing flourishes and ample clear space. Preserve spelling. No The Wizard's signature: it will be composited from one fixed master separately. Transparent background with genuine alpha; no paper/background texture, headings, sheet lines, labels, captions, borders or shadows. One isolated project wordmark plus its drawing. Keep all artwork inside the canvas with generous clear space. Landscape 1536x1024.
```

The first OS source rendered its open O as a C and failed the readability check. On
2026-09-05 the built-in image generation tool edited that source with this production
correction prompt; the corrected white-background result is `source/os-art.png`:

```text
Use case: precise-object-edit
Asset type: production watercolor project wordmark source
Input images: Image 1 is the edit target.
Primary request: Correct only the blue calligraphic project letters so they read exactly "OS". The first letter must be an unmistakable uppercase O, fully closed enough to never read as C, followed by the existing uppercase S. Spell the text O-S.
Constraints: Preserve the armillary-sphere illustration exactly, preserve the blue watercolor texture, flourishes, layout, scale, pure white background, all object details, and all other pixels as closely as possible. Change only the first blue letter from C-like to a clearly readable O. Keep the entire artwork fully inside the canvas with generous margins. No signature, no extra words, no extra letters, no watermark, no checkerboard, no paper texture, no shadow.
Style/medium: refined pen-and-ink with restrained watercolor wash, matching the edit target.
```

## conclave-art

```text
Use case: logo-brand. Extend the approved family with custom project word "Conclave" in muted mulberry #65516D. A fine ink and watercolor drawing of three slender pen nibs / writing instruments arranged toward one shared open manuscript leaf, their gently converging ink trails joining the word's last flourish, expresses several minds working on one artifact. Beautiful tangible toolsmith composition, just one small open leaf and three tips, ample air. No people, chat bubbles, network diagrams or corporate icons. Match the approved reference's fine original italic project lettering, delicate ink drawing with translucent watercolor, expressive flowing flourishes and ample clear space. Preserve spelling. No The Wizard's signature: it will be composited from one fixed master separately. Transparent background with genuine alpha; no paper/background texture, headings, sheet lines, labels, captions, borders or shadows. One isolated project wordmark plus its drawing. Keep all artwork inside the canvas with generous clear space. Landscape 1536x1024.
```

## courier-art

```text
Use case: logo-brand. Extend the approved family with custom project word "Courier" in burnished ochre #85621D. A small beautifully ink-drawn folded dispatch with a tied slender cord, its long trailing loop weaving through the final r and traveling under the word, expresses durable delivery and return. Gentle ochre and charcoal watercolor shading, a real paper fold as an object, expressive winding cord. No stamp text, vehicles, wings, speedlines or generic envelope icon. Match the approved reference's fine original italic project lettering, delicate ink drawing with translucent watercolor, expressive flowing flourishes and ample clear space. Preserve spelling. No The Wizard's signature: it will be composited from one fixed master separately. Transparent background with genuine alpha; no paper/background texture, headings, sheet lines, labels, captions, borders or shadows. One isolated project wordmark plus its drawing. Keep all artwork inside the canvas with generous clear space. Landscape 1536x1024.
```

## ecosystem-art

```text
Use case: logo-brand. Extend the approved family with custom project word "Ecosystem" in charcoal #272522 and a restrained tiny moss/oxblood accent. A modest illustrated toolmaker's bundle: a pen nib, a fine brush, and a curved stringed instrument fragment, joined by one loose flowing ink line beneath the elegant readable word. Open airy composition, evokes tools from one maker without crowding or copying four logos together. Fine ink with translucent restrained watercolor exactly like reference. No landscape, mountains, wizard character, crest or seal. Match the approved reference's fine original italic project lettering, delicate ink drawing with translucent watercolor, expressive flowing flourishes and ample clear space. Preserve spelling. No The Wizard's signature: it will be composited from one fixed master separately. Transparent background with genuine alpha; no paper/background texture, headings, sheet lines, labels, captions, borders or shadows. One isolated project wordmark plus its drawing. Keep all artwork inside the canvas with generous clear space. Landscape 1536x1024.
```

The first extension sources for OS, Conclave, Courier, and Ecosystem returned simulated
checkerboards rather than usable alpha. A later built-in edit replaced those backgrounds
with uniform white while preserving the colored word, drawing, and watercolor. That
correction was not retained as an exact prompt transcript in the originating session;
the contemporaneous handoff records the instruction as: replace every checkerboard
square and simulated transparency region with pure `#FFFFFF`, preserve all foreground
art, add no texture, shadow, or object, and keep dimensions and placement. The checked-in
white sources and deterministic alpha reconstruction are the retained production record.

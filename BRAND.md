# Brand

How the ecosystem and its projects are named, written, and drawn. Decided 2026-09-05.
This document is the authority; where a repository disagrees, the repository is out of
date.

## The name

**The Wizard's Ecosystem.**

Not a company — there isn't one. This is a family of interoperating free-software
projects with one maintainer. "Ecosystem" names breadth and interoperation, and it is
chosen for the shape this becomes rather than only the shape it has today.

The GitHub login is `wizards-ecosystem`, so the display name and the login are the same
string. That consistency is deliberate: for a FOSS project, being one findable name
everywhere is worth more than being clever.

Write it **The Wizard's Ecosystem** in full, **the ecosystem** in running prose after
first mention. Never *Wizards Ecosystem*, never *TWE*.

## Naming model

Every project is **The Wizard's ___**. The possessive is typographical and always
present in the display name.

| Display name | Repository / package | Note |
| --- | --- | --- |
| **The Wizard's Ink** | `wizards-ink` | The project. **Wizzy** is the language it produces. |
| **The Wizard's OS** | `the-wizards-os` | Already correct — 197 references predate the convention. |
| **The Wizard's Conclave** | `wizards-conclave` | |
| **The Wizard's Courier** | `wizards-courier` | |
| **The Wizard's Lyre** | `wizards-lyre` | |
| **The Wizard's Brush** | `wizards-brush` | |
| **The Wizard's Pick** | `wizards-pick` | |

### Ink and Wizzy

**The Wizard's Ink is the project; Wizzy is the language.** The ink is the medium, Wizzy
is what you write with it. This parallels `rust-lang/rust` — the repository and the
language are named separately and both are correct.

Wizzy is the primary name in all language contexts: the compiler, the tooling, the
`.wzi` extension, the documentation, error messages. All 3,366 existing `Wizzy`
references are correct and **must not be changed**. Use "The Wizard's Ink" when you mean
the repository or the project, not the language.

### How to write a project name

- **First mention** in a document, and any title or heading: the full name — **The
  Wizard's Lyre**.
- **Afterwards**: the bare product word — *Lyre*, *Conclave*, *Brush*. The reader knows
  what they're reading by then.
- **Never** *Wizards Lyre*, *Wizard's Lyre* (no article), or the slug `wizards-lyre` as a
  display name.

The possessive never touches a URL, a package name, or a command, because those are all
slugs. The apostrophe lives only in prose.

## Machine names

Repository slugs, package names, and binaries are **fully consistent already and are not
changing**:

`wizards-ink` · `wizards-conclave` · `wizards-courier` · `wizards-lyre` ·
`wizards-brush` · `wizards-pick` · `the-wizards-os`

Binaries: `wzi` · `wizc` · `wizrt` · `wizrun` · `lyre`

### Registry status — verified 2026-09-05

The `wizards-*` namespace is **free across every registry**, verified with controls in
both directions.

| Name | crates.io | npm | PyPI |
| --- | --- | --- | --- |
| `wizards-ink` `-conclave` `-courier` `-lyre` `-brush` `-pick` | free | free | free |
| `wizzy` | free | **taken** | free |
| `wizards` *(bare)* | free | **taken** | **taken** |
| `wzi` · `wizc` | **reserved 2026-08-29 by `limbwizard`** | free | — |
| `wizrt` · `wizrun` | free | free | — |

**Reserve names before you need them.** `wzi` and `wizc` were reserved on 2026-08-29;
`wizrt`, `wizrun`, and `wizzy` were not, and remain open on crates.io. A half-reserved
toolchain is the state most likely to get sniped.

This namespace is the ecosystem's most valuable naming asset — coherent, distinctive, and
unclaimed everywhere that matters. It is also what makes the projects findable, which for
free software *is* the distribution channel.

## Palette

Promoted from Wizzy's documentation site, which already had a deliberate system. Projects
adopt these as they touch their own styling; there is no urgency to restyle working
software.

### Core

| Token | Hex | Use |
| --- | --- | --- |
| `--wz-ink` | `#100d15` | The ground. Dark backgrounds, deepest surface. |
| `--wz-violet` | `#241345` | The mark's field. Raised dark surfaces. |
| `--wz-arcane` | `#bd94ef` | Accent on dark. Links, active state. |
| `--wz-arcane-deep` | `#5d32a8` | Accent on light. Same role, light ground. |
| `--wz-gold` | `#f2b85e` | The highlight. Used sparingly — one thing per view. |
| `--wz-teal` | `#75c8ba` | The keystone. Secondary accent, success, the small bright point. |
| `--wz-parchment` | `#fffaf0` | The ground. Light backgrounds. |
| `--wz-vellum` | `#fffdf8` | Text on dark. |

### Supporting

Dark-mode ramp: `#f3eee7` · `#d8cfe0` · `#a69bab` · `#877c8c` · `#342c3a` · `#201925`

Light-mode ramp: `#342c3a` · `#5f5565` · `#746a77` · `#b1a795` · `#e5ddce` · `#f5eee2`

Accent low/high, dark: `#2a1b3e` / `#eadcff` — light: `#e9ddff` / `#32185f`

Hairlines, dark: `#2d2634` / `#3d3446`

### Discipline

Gold is the scarcest color. One gold element per view, and it should be the thing you
want looked at. Teal is smaller still — it marks a single point, not a region. Violet
carries everything else. A surface that is mostly gold has failed.

## The mark

A keystone arch: a gold arch on a violet field with a teal keystone set at the apex.

The arch is held up by the one stone at its top — which is what this is. Six projects
rest on one language, and three of them have written down that they will wait for it
rather than build around it. The mark says that.

- [`assets/wizards-mark.svg`](assets/wizards-mark.svg) — dark field, for most uses
- [`assets/wizards-mark-light.svg`](assets/wizards-mark-light.svg) — parchment field

It shares its construction with Wizzy's existing favicon — same rounded square, same gold
stroke weight, same teal point — so the family reads as one hand.

## Voice

**The rule, taken from Wizzy and applied everywhere: public wording never outruns the
strongest retained evidence.**

In practice:

- Name the status. If something is specified and unbuilt, the sentence says "specified,
  not built" — it does not go quiet and hope.
- Name the gate. "Blocked" is not a status; "gated on Wizzy's process spawning, tracked
  as `WZ-*` in the conclave register" is.
- No hype adjectives. Not *revolutionary*, *seamless*, *magical*, *blazing*. The subject
  matter supplies enough magic; the prose should not.
- Prefer the concrete number to the impression. "197 references" beats "widely used."
- Write plainly. The reader is an engineer who will check.

This discipline is a genuine differentiator and should be visible in public copy, not
just in decision records.

## Status vocabulary

Four words, used identically everywhere.

| Word | Means |
| --- | --- |
| **Working** | It runs, it is used, it is not finished. |
| **Frozen** | It runs and is not being extended, because a successor is coming. |
| **Specified** | Designed and pinned by a conformance corpus. No implementation exists. |
| **Gated** | Deliberately blocked on a named dependency, with the gate written down. |

Pair with visibility where relevant: *Working · private*, *Specified, not built ·
private*, *Working · public*.

## Rollout — outstanding

Seven title lines and a handful of first mentions. Body prose is already correct in every
repository, because every repo already used bare product names in running text.

| Repo | Current H1 | Change to |
| --- | --- | --- |
| `wizards-ink` | `# Wizzy` | — correct; Wizzy is the language |
| `the-wizards-os` | `# The Wizard's OS` | — correct |
| `wizards-conclave` | `# Wizard's Conclave` | `# The Wizard's Conclave` |
| `wizards-courier` | `# Wizards Courier` | `# The Wizard's Courier` |
| `wizards-lyre` | `# Wizard's Lyre` | `# The Wizard's Lyre` |
| `wizards-brush` | `# Wizards Brush` | `# The Wizard's Brush` |
| `wizards-pick` | `# wizards-pick` | `# The Wizard's Pick` |

Prose mentions to update alongside: `Wizards Ink` (6) becomes `Wizzy` or `The Wizard's
Ink` depending on whether the language or the project is meant; `Wizard's Conclave` (5)
and `Wizards Courier` (3) gain the article. The 197 `Wizard's OS` references stay.

**Do not touch** the 3,366 `Wizzy` references across 616 files.

Also outstanding: Wizzy's `STATUS.md` says "no crates.io reservation," which stopped
being true on 2026-08-29 when `wzi` and `wizc` were reserved. Correct that line.

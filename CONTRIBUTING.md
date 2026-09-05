# Contributing

**This is the organization-wide default.** A repository with its own `CONTRIBUTING.md`
overrides it — Wizzy, Conclave, Lyre, and Brush each have one, and theirs governs.

## Before you write code

**Read the project's status page and its decision records.** Every project here is
design-first: decisions are written down before the code, and an accepted decision is law
over any README. A change that contradicts an accepted decision needs a new decision
record, not a pull request.

**Check whether the project is gated.** Conclave and Courier are deliberately blocked on
Wizzy and are not accepting implementation work in another language — that refusal is the
design, not an oversight. Courier has a complete specification and conformance corpus and
zero lines of implementation, on purpose.

## The standards that apply everywhere

- **Claims name their evidence.** If a change makes a project guarantee something, the
  change says how that is known. Wording never outruns what is actually retained.
- **Status words mean one thing.** *Working*, *frozen*, *specified*, *gated* — see
  [BRAND.md](BRAND.md).
- **Conformance corpora are checked both ways.** Where a project pins its specification
  with a corpus, the checker fails when spec and corpus disagree in *either* direction.
  Update both.
- **Match the surrounding code.** Its naming, its comment density, its idiom.

## Naming

Product names and their written forms are fixed in [BRAND.md](BRAND.md). In short: every
project is **The Wizard's ___** in full on first mention and the bare word afterwards,
Wizzy is the language that The Wizard's Ink produces, and `wizards-*` is a repository
namespace — never a display name.

## Pull requests

Say what changed and why, name the decision record or issue it serves, and state what you
ran to check it. If a gate or a status word changed, say so explicitly — those are the
edits that need the most scrutiny.

Do not add AI attribution or co-author trailers to commits.

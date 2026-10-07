# Getting help

**This is the organization-wide default.** A repository with its own `SUPPORT.md`
overrides it.

## Read the status first

Start with each project's current status and acceptance authorities. A roadmap
entry does not establish implementation or readiness:

- **Wizzy**: `STATUS.md`, with `ROADMAP.md` for planned work. A roadmap entry is not a
  supported feature or a delivery date.
- **The Wizard's Bedrock** (wizards-bedrock kernel): `docs/004-decision-log.md`
  and `docs/016-pre-wizzy-foundation.md` in that project.
- **The Wizard's Realm**: `README.md` and `docs/002-cutover.md` in wizards-realm.
  Its compiler-readiness authority is `docs/003-compiler-readiness.md`; the gate remains CLOSED.
- **Conclave**: `README.md`, `docs/acceptance.md` and `docs/PRE-WIZZY.md`.
- **Courier**: `README.md`, `docs/acceptance.md` and `docs/specs/`. Nothing is implemented;
  the specification is the artifact.
- **Lyre**: `README.md` and `SPEC.md`.
- **Brush**: `README.md` and `docs/`.
- **Pick**: `README.md`.
- **Familiar**: `README.md`, then `AGENTS.md` and `SECURITY.md`.
- **Herald**: `README.md` and `SETUP.md`.
- **Press**: `README.md`, `docs/usage.md` and `docs/plan.md`.
- **Charter**: `README.md`, `docs/plan.md` and `inbox.md`.

Much of what looks like a bug is a documented limit, and checking takes a minute.

## Asking a question

For a defect: the commit or toolchain, the operating system, the exact command, what you
expected, what happened, and the smallest reproduction you can manage.

For a design disagreement: name the governing decision record you disagree with and the
program or scenario that exposes the problem. Disagreements with an accepted decision are
resolved by a new decision record rather than by an issue.

Security concerns follow [SECURITY.md](SECURITY.md) instead.

## Support commitments

No project here has a support commitment, a response time, or a community venue. Those
begin per project at its public-preview gate. Until then, help is best-effort from the
owner.

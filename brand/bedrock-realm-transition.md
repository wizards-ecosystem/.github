# Bedrock and Realm branding cutover

Names and artwork selected by Isaac on 2026-10-07. The owner reviewed the
generated light wordmarks and answered “Use these designs”. Export validation
and distribution are recorded after their actual checks; no September approval
is reassigned to the new families.

| Family | Motif | Accent light / dark | Consumer |
| --- | --- | --- | --- |
| Bedrock | Layered slate and copper calligraphy | #73523C / #D8AD83 | systems/wizards-bedrock/docs/assets |
| Realm | Teal calligraphy, open map and brass compass | #285F56 / #AFD2C3 | systems/wizards-realm/docs/assets |

Masters, generator output identities and hashes live under source/bedrock and
source/realm. The existing signature is preserved exactly. Native icon SVGs
retain the motifs at small sizes. Dark artwork uses separate light-pigment
edits for charcoal backgrounds. The original OS family remains legacy artwork
with its original provenance; no active consumer uses it after this cutover.

Build with `npm --prefix tooling run build`; validate with
`npm --prefix tooling run check`. Distribute only the selected family using
`node tooling/sync-assets.mjs --workspace ROOT --project bedrock` or
`--project realm`; add `--check` to verify copies without writes.

The kernel repository and local folder are wizards-bedrock. Realm remains
documentation only and its compiler-readiness gate remains CLOSED. Branding
does not claim a working product or equivalent backend security.

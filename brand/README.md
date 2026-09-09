# The Wizard's Ecosystem identity package

Identity refresh, 2026-09-08. The [original approved board](source/approved-sheet.png) is
the visual reference for expressive calligraphy, ink drawings, and watercolor.
The new mountain-and-ink organization composition is approved. Its transparent exports
and compact icon are finished in the private review set and awaiting visual review
together. Review and replace one identity at a time.

The existing [identity collection](index.html), exports, and builder retain the previous
proposal. They are available for existing consumers, not approval for further rollout.

## Choose an export

| File in each project folder | Use |
| --- | --- |
| `*-logo.svg` | Transparent horizontal logo for light surfaces |
| `*-logo-dark.svg` | The same geometry for dark surfaces |
| `*-logo-auto.svg` | System-theme logo for surfaces without a manual theme |
| `*-icon.svg`, `*-icon-dark.svg` | Backgroundless marks for rails and compact UI |
| `*-icon-auto.svg` | A favicon that follows the browser color scheme |
| `*-social.png` | Opaque 1200 x 630 social preview; use PNG for social crawlers |
| `*-social.svg` | Standalone outlined source for that preview |
| `*-avatar.png` | Opaque 500 x 500 avatar with space for circular cropping |
| `*-art.png`, `*-lockup.png` | Original watercolor illustrations for light editorial surfaces, in the eight original families |

Existing version 3 logos and icons contain outlined paths. Their replacements may combine
the original [signature](signature/) with transparent watercolor artwork. The
[watercolor sources](source/) remain intact.
The retired `*-header.png` exports must not return to a README or application.

## Layout

Center the logo in a repository's H1, about 360-420 CSS pixels wide. Let it shrink on a
narrow page. Do not follow it with another heading saying the same name. In application
chrome, use a 44-56 pixel high logo or a 24-40 pixel compact mark; 16 pixels is reserved
for favicons. Keep the supplied clear space and aspect ratio. Do not stretch the artwork,
add a background, border, glow, shadow, rounded container, or full-width banner.

For GitHub, select the theme with a picture element:

```html
<h1 align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/ink-logo-dark.svg">
    <img src="docs/assets/ink-logo.svg" alt="The Wizard's Ink" width="420">
  </picture>
</h1>
```

In apps with a theme selector, select the logo using the actual application theme.
The automatic favicon may follow the browser independently. A linked logo needs a
destination name such as "Wizzy home" on the link; its child image can then have empty
alt text. An unlinked logo heading uses the full project name as its image alternative.
These patterns follow [GitHub's picture support](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/)
and [W3C's guidance for functional images](https://www.w3.org/WAI/tutorials/images/functional/).

## Build and distribute

The commands below maintain the existing version 3 package. Do not run the family-wide
build or sync to distribute unapproved artwork during review. Update an approved
identity's consumers individually. From this directory:

```sh
npm --prefix tooling ci
npm --prefix tooling run build
npm --prefix tooling run check
node tooling/sync-assets.mjs --workspace /path/to/wizards-ecosystem --wsl-home /path/to/wsl/home
node tooling/sync-assets.mjs --workspace /path/to/wizards-ecosystem --wsl-home /path/to/wsl/home --check
```

Both roots are explicit and independent; omit one to operate on only the other.
On Windows, the WSL root can be a UNC path to the user's Linux home. The
[consumer map](consumers.json) records exactly which files belong in each checkout.
Synchronization writes only those copies; check mode is read-only and fails on drift.
Products serve their own local assets and never require the central checkout at runtime.

The build owns the project geometry and accent definitions in `tooling/build-assets.mjs`.
[Tokens](tokens.json) expose semantic palettes, and generated [CSS](tokens.css) follows
the system theme unless a light or dark theme is selected explicitly. Newsreader and
Instrument Sans are bundled with their OFL texts in [fonts](fonts/).

The [manifest](manifest.json) records hashes, byte sizes, dimensions, roles, and themes.
The check verifies recorded bytes and dimensions, rejects active or external SVG content,
and checks for actual alpha where transparency is required. It does not prescribe visual
style. Inspect approved artwork on light and dark backgrounds and at its intended size.

## History and policy

[Provenance](PROVENANCE.md) records the original illustration work and the vector refresh.
The private brand archive preserves the original board and options as active visual
references alongside superseded proposals and rollout screenshots. The current
[brand guide](../BRAND.md) distinguishes approved direction from implementation history.

These marks identify ecosystem projects. Existing repository software licenses and
artwork notices remain in force; this refresh makes no change to trademark policy.

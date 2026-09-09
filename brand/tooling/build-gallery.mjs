import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { projects } = JSON.parse(
  await fs.readFile(path.join(root, "manifest.json"), "utf8"),
);
const descriptions = {
  ecosystem: "A shared orbit of independent tools.",
  ink: "A split nib and a line of ink.",
  os: "An open mechanism around a stable axis.",
  conclave: "Three strokes meet at one working point.",
  courier: "A tied parcel and its returning thread.",
  lyre: "Three strings held by an open frame.",
  brush: "A brush tip finishing one flowing stroke.",
  pick: "A pick and tension tool, held apart.",
  familiar: "An attentive companion at the workbench.",
  herald: "An open horn carrying a clear voice.",
  press: "A screw press turning a record into print.",
  charter: "A scroll with a considered decision.",
};
const rows = Object.entries(projects)
  .map(
    ([id, p]) => `<article id="${id}">
  <div class="identity"><h2>${p.name}</h2><p>${descriptions[id]}</p><div class="swatches"><span style="--pigment:${p.accent}">${p.accent}</span><span style="--pigment:${p.accentDark}">${p.accentDark}</span></div></div>
  <div class="specimen"><img class="light-logo" src="${id}/${id}-logo.svg" alt="The Wizard's ${p.name}" width="420"><img class="dark-logo" src="${id}/${id}-logo-dark.svg" alt="The Wizard's ${p.name}" width="420"><div class="sizes">${[16, 24, 32, 48].map((size) => `<span><img class="light-logo" src="${id}/${id}-icon.svg" width="${size}" height="${size}" alt=""><img class="dark-logo" src="${id}/${id}-icon-dark.svg" width="${size}" height="${size}" alt=""><small>${size}</small></span>`).join("")}</div></div>
  <div class="downloads"><a href="${id}/${id}-logo.svg" download>Light logo</a><a href="${id}/${id}-logo-dark.svg" download>Dark logo</a><a href="${id}/${id}-icon-auto.svg" download>Favicon</a><a href="${id}/${id}-social.png" download>Social preview</a></div>
</article>`,
  )
  .join("\n");
await fs.writeFile(
  path.join(root, "index.html"),
  `<!doctype html>
<html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Wizard's Ecosystem | Identity collection</title><link rel="icon" href="ecosystem/ecosystem-icon-auto.svg" type="image/svg+xml"><link rel="stylesheet" href="gallery.css"></head>
<body><header><a href="#" aria-label="The Wizard's Ecosystem home"><img class="light-logo" src="ecosystem/ecosystem-logo.svg" width="340" alt=""><img class="dark-logo" src="ecosystem/ecosystem-logo-dark.svg" width="340" alt=""></a><button type="button" id="theme" aria-pressed="false">Dark canvas</button></header>
<main><section class="intro"><p class="eyebrow">Previous identity proposal / Edition 03</p><h1>Design review<br><em>in progress.</em></h1><p>The owner rejected this proposal's typeset project names and abstract icons. The original board remains the reference; a mountain-and-ink organization composition is approved. Review and replace one identity at a time.</p><nav aria-label="Brand resources"><a href="README.md">Review status</a><a href="../BRAND.md">Brand guide</a><a href="source/approved-sheet.png">Original board</a></nav></section><section aria-label="Previous project proposals">${rows}</section><footer>These exports remain for existing consumers while individually approved replacements are prepared. Their presence here does not establish design approval.</footer></main><script src="gallery.js"></script></body></html>\n`,
);
console.log("Built identity gallery.");

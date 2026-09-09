import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { openSync } from "fontkit";

const brandRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const sourceRoot = path.join(brandRoot, "source");
const approvedSheet = path.join(sourceRoot, "approved-sheet.png");
const canvas = "#F7F6F2";
const charcoal = "#272522";

const projects = {
  ecosystem: { name: "Ecosystem", accent: "#6F4738", accentDark: "#D8CFC3" },
  ink: { name: "Ink", accent: "#7A303B", accentDark: "#E2A3AC" },
  os: { name: "OS", accent: "#485F79", accentDark: "#A9C0D8" },
  conclave: { name: "Conclave", accent: "#65516D", accentDark: "#C9B0D3" },
  courier: { name: "Courier", accent: "#85621D", accentDark: "#E3C477" },
  lyre: { name: "Lyre", accent: "#456348", accentDark: "#AFC9AE" },
  brush: { name: "Brush", accent: "#994D34", accentDark: "#E5AD99" },
  pick: { name: "Pick", accent: "#285E63", accentDark: "#95C6CA" },
  familiar: { name: "Familiar", accent: "#52634A", accentDark: "#BACBAD" },
  herald: { name: "Herald", accent: "#824631", accentDark: "#E4B098" },
  press: { name: "Press", accent: "#4D596D", accentDark: "#BAC6DD" },
  charter: { name: "Charter", accent: "#70582E", accentDark: "#D9C297" },
};

const approvedCrops = {
  lyre: {
    left: 80,
    top: 128,
    width: 658,
    height: 373,
    signature: [20, 0, 395, 127],
  },
  pick: {
    left: 820,
    top: 144,
    width: 650,
    height: 369,
    signature: [0, 0, 370, 116],
  },
  brush: {
    left: 80,
    top: 560,
    width: 664,
    height: 400,
    signature: [0, 0, 430, 130],
  },
  ink: {
    left: 824,
    top: 560,
    width: 660,
    height: 400,
    signature: [0, 0, 395, 125],
  },
};

const iconBodies = {
  familiar: (accent) => `
    <path d="M16 29 15 12l14 10h6l14-10-1 17c6 18-5 25-16 25S10 47 16 29Z" fill="none" stroke="${charcoal}" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="m21 34 5 2m17-2-5 2m-9 7 3 3 3-3M9 40l11 2m24 0 11-2" fill="none" stroke="${accent}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  herald: (accent) => `
    <path d="M12 30h11l27-15v34L23 36H12Z" fill="none" stroke="${charcoal}" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M23 30v6m8-14v20M20 37v11c0 5 10 5 10 0v-8" fill="none" stroke="${accent}" stroke-width="2.8" stroke-linecap="round"/>`,
  press: (accent) => `
    <path d="M16 14h32M21 14v37m22-37v37M12 52h40M32 10v21" fill="none" stroke="${charcoal}" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M15 22h34M26 32h12v7H26Zm-1 13h14" fill="none" stroke="${accent}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  charter: (accent) => `
    <path d="M19 10h27v43H19c-8 0-8-11 0-11h27M19 10c-8 0-8 11 0 11h27" fill="none" stroke="${charcoal}" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="m24 31 5 5 10-10M22 47h17" fill="none" stroke="${accent}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  ecosystem: (accent) => `
    <circle cx="32" cy="32" r="19" fill="none" stroke="${accent}" stroke-width="3"/>
    <path d="M18 37c8-15 20-19 29-9M18 37c10 5 20 6 29-1" fill="none" stroke="${charcoal}" stroke-width="2.5" stroke-linecap="round"/>
    <g fill="${accent}"><circle cx="20" cy="26" r="2.5"/><circle cx="32" cy="17" r="2.5"/><circle cx="45" cy="24" r="2.5"/><circle cx="45" cy="39" r="2.5"/><circle cx="30" cy="47" r="2.5"/></g>`,
  ink: (accent) => `
    <path d="M32 10 45 30 32 50 19 30Z" fill="none" stroke="${charcoal}" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M32 11v23m-6 6h12" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="32" cy="34" r="3" fill="${accent}"/>
    <path d="M20 53c8-3 16-3 24 0" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>`,
  os: (accent) => `
    <path d="M48 19A21 21 0 1 0 50 42" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
    <path d="M45 12v12h12" fill="none" stroke="${charcoal}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="32" cy="32" r="5" fill="none" stroke="${charcoal}" stroke-width="2.5"/>`,
  conclave: (accent) => `
    <path d="M12 16c10 1 12 12 20 16 8 4 11 12 20 16M52 16C42 17 40 28 32 32 24 36 21 47 12 48M32 10v44" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="32" cy="32" r="5" fill="${canvas}" stroke="${charcoal}" stroke-width="2.5"/>`,
  courier: (accent) => `
    <path d="M14 22 32 12l18 10v21L32 53 14 43Z" fill="none" stroke="${charcoal}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="m14 22 18 11 18-11M32 33v20" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 35c8 7 15 8 23 6" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>`,
  lyre: (accent) => `
    <path d="M20 14c-5 10-5 28 3 37M44 14c5 10 5 28-3 37M22 50h20M20 14c7 4 17 4 24 0" fill="none" stroke="${charcoal}" stroke-width="3" stroke-linecap="round"/>
    <path d="M25 18v29M32 18v29M39 18v29" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`,
  brush: (accent) => `
    <path d="m42 10 7 7-23 24-8-8Z" fill="none" stroke="${charcoal}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M18 33c-7 6-2 11-9 18 9 1 15-3 17-10" fill="${accent}" fill-opacity=".22" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 54c12-1 23 0 34-4" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>`,
  pick: (accent) => `
    <path d="M12 45h27c8 0 12-5 12-12" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
    <path d="M13 45v-8m6 8v-6m27-20c4 1 7 5 6 9" fill="none" stroke="${charcoal}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M16 17 49 49" fill="none" stroke="${charcoal}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="13" cy="14" r="4" fill="none" stroke="${accent}" stroke-width="2.5"/>`,
};

const sha256 = (data) => createHash("sha256").update(data).digest("hex");

async function write(relative, data) {
  const destination = path.join(brandRoot, relative);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, data);
}

function svg(width, height, title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title>${body}</svg>\n`;
}

async function buildSignature() {
  const vector = await fs.readFile(
    path.join(sourceRoot, "the-wizards.svg"),
    "utf8",
  );
  const raster = await sharp(Buffer.from(vector))
    .resize({ width: 1512 })
    .png()
    .toBuffer();
  await write("signature/the-wizards.svg", vector);
  await write("signature/the-wizards.png", raster);
  await write(
    "signature/the-wizards-reversed.svg",
    vector.replaceAll(charcoal, canvas),
  );
  await write(
    "signature/the-wizards-monochrome.svg",
    vector.replaceAll(charcoal, "#000000"),
  );
  return { vector, raster };
}

async function approvedProjectSource(id) {
  const { signature: signatureRegion, ...crop } = approvedCrops[id];
  const raw = await sharp(approvedSheet)
    .extract(crop)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const [left, top, width, height] = signatureRegion;

  for (let y = top; y < top + height; y += 1) {
    for (let x = left; x < left + width; x += 1) {
      const index = (y * raw.info.width + x) * 3;
      const rgb = [...raw.data.subarray(index, index + 3)];
      if (Math.max(...rgb) - Math.min(...rgb) < 26)
        raw.data.fill(255, index, index + 3);
    }
  }
  for (let y = height; y < 160; y += 1) {
    for (let x = 0; x < 90; x += 1) {
      const index = (y * raw.info.width + x) * 3;
      raw.data.fill(255, index, index + 3);
    }
  }
  return raw;
}

async function generatedProjectSource(id) {
  return sharp(path.join(sourceRoot, `${id}-art.png`))
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
}

async function removeWhite(raw) {
  const pixels = raw.info.width * raw.info.height;
  const rgba = Buffer.alloc(pixels * 4);
  for (let pixel = 0; pixel < pixels; pixel += 1) {
    const input = pixel * 3;
    const output = pixel * 4;
    const minimum = Math.min(
      raw.data[input],
      raw.data[input + 1],
      raw.data[input + 2],
    );
    const alpha = minimum > 249 ? 0 : 255 - minimum;
    rgba[output + 3] = alpha;
    for (let channel = 0; channel < 3; channel += 1) {
      rgba[output + channel] = alpha
        ? Math.round(((raw.data[input + channel] - minimum) * 255) / alpha)
        : 0;
    }
  }
  return sharp(rgba, {
    raw: { width: raw.info.width, height: raw.info.height, channels: 4 },
  })
    .trim({ threshold: 8 })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function contain(buffer, width, height) {
  return sharp(buffer)
    .resize({ width, height, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const typeface = openSync(
  path.join(brandRoot, "fonts/newsreader-latin-standard-italic.woff2"),
);
const font = typeface;
const files = {};

function lettering(word, size, face = font) {
  const run = face.layout(word);
  const scale = size / face.unitsPerEm;
  let advance = 0;
  const paths = run.glyphs.map((glyph, index) => {
    const position = run.positions[index];
    const shape =
      '<path transform="translate(' +
      ((advance + position.xOffset) * scale).toFixed(3) +
      " " +
      (-position.yOffset * scale).toFixed(3) +
      ") scale(" +
      scale +
      " " +
      -scale +
      ')" d="' +
      glyph.path.toSVG() +
      '"/>';
    advance += position.xAdvance;
    return shape;
  });
  return { body: paths.join(""), width: advance * scale };
}

function theme(project, mode) {
  if (mode !== "auto") return "";
  return (
    "<style>@media(prefers-color-scheme:dark){" +
    ["fill", "stroke"]
      .map(
        (attr) =>
          "[" +
          attr +
          '="' +
          charcoal +
          '"]{' +
          attr +
          ":" +
          canvas +
          "}[" +
          attr +
          '="' +
          project.accent +
          '"]{' +
          attr +
          ":" +
          project.accentDark +
          "}",
      )
      .join("") +
    "}</style>"
  );
}

function mark(id, project, mode = "light") {
  const body = iconBodies[id](
    mode === "dark" ? project.accentDark : project.accent,
  ).replaceAll(canvas, "none");
  return mode === "dark" ? body.replaceAll(charcoal, canvas) : body;
}

function logo(id, project, signature, mode) {
  const word = lettering(project.name, 72);
  const width = Math.ceil(262 + word.width + 78);
  const family = signature.vector
    .match(/<path[\s\S]*?(?=<\/svg>)/)[0]
    .replaceAll(charcoal, mode === "dark" ? canvas : charcoal);
  return svg(
    width,
    112,
    "The Wizard's " + project.name,
    theme(project, mode) +
      '<g transform="translate(0 9) scale(.64)">' +
      family +
      "</g>" +
      '<g transform="translate(256 82)" fill="' +
      (mode === "dark" ? project.accentDark : project.accent) +
      '">' +
      word.body +
      "</g>" +
      '<g transform="translate(' +
      (width - 66) +
      ' 29) scale(.85)">' +
      mark(id, project, mode) +
      "</g>",
  );
}

async function emit(relative, data, extra = {}) {
  await write(relative, data);
  const metadata = await sharp(Buffer.from(data)).metadata();
  files[relative] = {
    sha256: sha256(data),
    width: metadata.width,
    height: metadata.height,
    bytes: Buffer.byteLength(data),
    ...extra,
  };
}

async function buildIllustration(id, signature) {
  if (
    !approvedCrops[id] &&
    !["ecosystem", "os", "conclave", "courier"].includes(id)
  )
    return;
  const raw = approvedCrops[id]
    ? await approvedProjectSource(id)
    : await generatedProjectSource(id);
  const art = await removeWhite(raw);
  const artFitted = await contain(art, 1040, 294);
  const artMeta = await sharp(artFitted).metadata();
  const signatureFitted = await contain(signature.raster, 470, 174);
  const artLeft = Math.round((1200 - artMeta.width) / 2);
  const lockup = await sharp({
    create: {
      width: 1200,
      height: 520,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: signatureFitted,
        left: Math.max(72, Math.min(658, artLeft + 36)),
        top: 20,
      },
      { input: artFitted, left: artLeft, top: 194 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
  await emit(id + "/" + id + "-art.png", art, {
    transparent: true,
    role: "illustration",
  });
  await emit(id + "/" + id + "-lockup.png", lockup, {
    transparent: true,
    role: "illustration",
  });
}

const signature = await buildSignature();
for (const [id, project] of Object.entries(projects)) {
  await buildIllustration(id, signature);
  for (const mode of ["light", "dark", "auto"]) {
    const suffix = mode === "light" ? "" : "-" + mode;
    await emit(
      id + "/" + id + "-logo" + suffix + ".svg",
      logo(id, project, signature, mode),
      { transparent: true, role: "logo", theme: mode },
    );
    const icon = svg(
      64,
      64,
      "The Wizard's " + project.name + " mark",
      theme(project, mode) + mark(id, project, mode),
    );
    await emit(id + "/" + id + "-icon" + suffix + ".svg", icon, {
      transparent: true,
      role: "icon",
      theme: mode,
    });
  }
  const logoSvg = logo(id, project, signature, "light");
  const width = Number(logoSvg.match(/width="(\d+)"/)[1]);
  const scale = 1000 / width;
  const body = logoSvg
    .replace(/^<svg[^>]*><title[^>]*>[^<]*<\/title>/, "")
    .replace(/<\/svg>\s*$/, "");
  let caption = "";
  if (id === "ink") {
    const text = lettering(
      "Wizzy / experimental / pre-0.1 / source-only",
      26,
      openSync(
        path.join(brandRoot, "fonts/instrument-sans-latin-wght-normal.woff2"),
      ),
    );
    caption =
      '<g transform="translate(' +
      (1200 - text.width) / 2 +
      ' 480)" fill="#625F59">' +
      text.body +
      "</g>";
  }
  const socialSvg = svg(
    1200,
    630,
    "The Wizard's " + project.name + " social preview",
    '<rect width="1200" height="630" fill="' +
      canvas +
      '"/><g transform="translate(100 ' +
      ((630 - 112 * scale) / 2 - (caption ? 32 : 0)) +
      ") scale(" +
      scale +
      ')">' +
      body +
      "</g>" +
      caption,
  );
  const social = await sharp(Buffer.from(socialSvg))
    .png({ compressionLevel: 9 })
    .toBuffer();
  await emit(id + "/" + id + "-social.svg", socialSvg, { role: "social" });
  await emit(id + "/" + id + "-social.png", social, { role: "social" });
  const avatarSvg = svg(
    500,
    500,
    "The Wizard's " + project.name,
    '<rect width="500" height="500" fill="' +
      canvas +
      '"/><g transform="translate(74 74) scale(5.5)">' +
      mark(id, project) +
      "</g>",
  );
  await emit(
    id + "/" + id + "-avatar.png",
    await sharp(Buffer.from(avatarSvg)).png({ compressionLevel: 9 }).toBuffer(),
    { role: "avatar" },
  );
  await fs.rm(path.join(brandRoot, id, id + "-header.png"), { force: true });
}

const tokens = JSON.parse(
  await fs.readFile(path.join(brandRoot, "tokens.json"), "utf8"),
);
tokens.version = 3;
tokens.projects = Object.fromEntries(
  Object.entries(projects).map(([id, p]) => [
    id,
    { light: p.accent, dark: p.accentDark },
  ]),
);
await write("tokens.json", JSON.stringify(tokens, null, 2) + "\n");
const cssRole = (name) => name.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
const palette = (mode) =>
  Object.entries(tokens[mode])
    .map(([name, value]) => "  --wz-" + cssRole(name) + ": " + value + ";")
    .join("\n");
let css =
  "/* Generated by tooling/build-assets.mjs. */\n:root {\n  color-scheme: light;\n" +
  palette("light") +
  '\n  --wz-font-display: "Newsreader", Georgia, serif;\n  --wz-font-interface: "Instrument Sans", system-ui, sans-serif;\n  --wz-font-mono: ui-monospace, "Cascadia Code", "SFMono-Regular", Consolas, monospace;\n  --wz-radius-small: .35rem;\n  --wz-radius-medium: .7rem;\n  --wz-shadow-raised: 0 18px 48px rgb(39 37 34 / .12);\n  --wz-accent: var(--wz-accent-light);\n}\n';
for (const [id, p] of Object.entries(projects))
  css +=
    (id === "ecosystem" ? ":root,\n" : "") +
    ':root[data-project="' +
    id +
    '"] {\n  --wz-accent-light: ' +
    p.accent +
    ";\n  --wz-accent-on-dark: " +
    p.accentDark +
    ";\n}\n";
const darkCss =
  "  color-scheme: dark;\n" +
  palette("dark") +
  "\n  --wz-accent: var(--wz-accent-on-dark);\n  --wz-shadow-raised: 0 20px 54px rgb(0 0 0 / .34);\n";
css +=
  ':root[data-theme="dark"] {\n' +
  darkCss +
  '}\n@media (prefers-color-scheme: dark) {\n:root:not([data-theme="light"]) {\n' +
  darkCss +
  "}\n}\n";
await write("tokens.css", css);
await write(
  "manifest.json",
  JSON.stringify(
    {
      version: 3,
      direction:
        "The toolsmith signature: transparent vector wordmarks and distinct instrument marks",
      signature: { sha256: sha256(signature.vector) },
      projects,
      files,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  "Built brand package v3: " +
    Object.keys(projects).length +
    " families, " +
    Object.keys(files).length +
    " exports.",
);

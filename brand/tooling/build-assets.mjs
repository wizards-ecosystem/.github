import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const brandRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
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
};

const approvedCrops = {
  lyre: { left: 80, top: 128, width: 658, height: 373, signature: [20, 0, 395, 127] },
  pick: { left: 820, top: 144, width: 650, height: 369, signature: [0, 0, 370, 116] },
  brush: { left: 80, top: 560, width: 664, height: 400, signature: [0, 0, 430, 130] },
  ink: { left: 824, top: 560, width: 660, height: 400, signature: [0, 0, 395, 125] },
};

const iconBodies = {
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

async function removeV1Wrappers() {
  for (const id of Object.keys(projects)) {
    for (const suffix of ["art", "lockup", "header", "social"]) {
      await fs.rm(path.join(brandRoot, id, `${id}-${suffix}.svg`), { force: true });
    }
  }
}

async function write(relative, data) {
  const destination = path.join(brandRoot, relative);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, data);
}

function svg(width, height, title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title"><title id="title">${title}</title>${body}</svg>\n`;
}

async function buildSignature() {
  const vector = await fs.readFile(path.join(sourceRoot, "the-wizards.svg"), "utf8");
  const raster = await sharp(Buffer.from(vector)).resize({ width: 1512 }).png().toBuffer();
  await write("signature/the-wizards.svg", vector);
  await write("signature/the-wizards.png", raster);
  await write("signature/the-wizards-reversed.svg", vector.replaceAll(charcoal, canvas));
  await write("signature/the-wizards-monochrome.svg", vector.replaceAll(charcoal, "#000000"));
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
      if (Math.max(...rgb) - Math.min(...rgb) < 26) raw.data.fill(255, index, index + 3);
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
    const minimum = Math.min(raw.data[input], raw.data[input + 1], raw.data[input + 2]);
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

async function buildProject(id, project, signature) {
  const raw = approvedCrops[id]
    ? await approvedProjectSource(id)
    : await generatedProjectSource(id);
  const art = await removeWhite(raw);
  const artFitted = await contain(art, 1040, 294);
  const artMeta = await sharp(artFitted).metadata();
  const signatureFitted = await contain(signature.raster, 470, 174);
  const signatureMeta = await sharp(signatureFitted).metadata();
  const artLeft = Math.round((1200 - artMeta.width) / 2);
  const signatureLeft = Math.max(72, Math.min(658, artLeft + 36));

  const lockup = await sharp({
    create: { width: 1200, height: 520, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: signatureFitted, left: signatureLeft, top: 20 },
      { input: artFitted, left: artLeft, top: 194 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  const headerLockup = await contain(lockup, 1104, 432);
  const headerMeta = await sharp(headerLockup).metadata();
  const header = await sharp({
    create: { width: 1200, height: 480, channels: 4, background: canvas },
  })
    .composite([
      {
        input: headerLockup,
        left: Math.round((1200 - headerMeta.width) / 2),
        top: Math.round((480 - headerMeta.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  const socialLockup = await contain(lockup, 1080, 520);
  const socialMeta = await sharp(socialLockup).metadata();
  const social = await sharp({
    create: { width: 1200, height: 630, channels: 4, background: canvas },
  })
    .composite([
      {
        input: socialLockup,
        left: Math.round((1200 - socialMeta.width) / 2),
        top: Math.round((630 - socialMeta.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  const icon = svg(
    64,
    64,
    `The Wizard's ${project.name} compact mark`,
    `<rect width="64" height="64" rx="10" fill="${canvas}"/>${iconBodies[id](project.accent)}`,
  );
  const avatar = await sharp(Buffer.from(icon)).resize(500, 500).png({ compressionLevel: 9 }).toBuffer();

  await write(`${id}/${id}-art.png`, art);
  await write(`${id}/${id}-lockup.png`, lockup);
  await write(`${id}/${id}-header.png`, header);
  await write(`${id}/${id}-social.png`, social);
  await write(`${id}/${id}-icon.svg`, icon);
  await write(`${id}/${id}-avatar.png`, avatar);

  return {
    name: `The Wizard's ${project.name}`,
    accent: project.accent,
    accentDark: project.accentDark,
    art: { sha256: sha256(art), width: (await sharp(art).metadata()).width, height: (await sharp(art).metadata()).height },
    lockup: { sha256: sha256(lockup), width: 1200, height: 520 },
    header: { sha256: sha256(header), width: 1200, height: 480 },
    social: { sha256: sha256(social), width: 1200, height: 630 },
    icon: { sha256: sha256(icon), width: 64, height: 64 },
    avatar: { sha256: sha256(avatar), width: 500, height: 500 },
  };
}

await removeV1Wrappers();
const signature = await buildSignature();
const manifest = {
  version: 2,
  approvedDirection: "option 1 family signature with option 2 project artwork",
  approvedStudy: "source/approved-sheet.png",
  canvas,
  signature: {
    sha256: sha256(signature.vector),
    rasterSha256: sha256(signature.raster),
  },
  projects: {},
};

for (const [id, project] of Object.entries(projects)) {
  manifest.projects[id] = await buildProject(id, project, signature);
}

await write("manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Built brand package v${manifest.version}; signature ${manifest.signature.sha256}`);

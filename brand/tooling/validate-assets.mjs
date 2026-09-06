import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const brandRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await fs.readFile(path.join(brandRoot, "manifest.json"), "utf8"));
const failures = [];
const iconHashes = new Set();

function fail(message) {
  failures.push(message);
}

async function checkPng(relative, expected, options = {}) {
  const file = path.join(brandRoot, relative);
  const stat = await fs.stat(file).catch(() => null);
  if (!stat) return fail(`${relative}: missing`);
  if (stat.size > (options.maxBytes ?? 700_000)) fail(`${relative}: ${stat.size} bytes exceeds budget`);
  const metadata = await sharp(file).metadata();
  if (metadata.width !== expected.width || metadata.height !== expected.height) {
    fail(`${relative}: expected ${expected.width}x${expected.height}, got ${metadata.width}x${metadata.height}`);
  }
  if (options.alpha && !metadata.hasAlpha) fail(`${relative}: alpha channel missing`);
}

for (const [id, project] of Object.entries(manifest.projects)) {
  await checkPng(`${id}/${id}-art.png`, project.art, { alpha: true });
  await checkPng(`${id}/${id}-lockup.png`, project.lockup, { alpha: true });
  await checkPng(`${id}/${id}-header.png`, project.header);
  await checkPng(`${id}/${id}-social.png`, project.social);
  await checkPng(`${id}/${id}-avatar.png`, project.avatar, { maxBytes: 120_000 });

  const icon = await fs.readFile(path.join(brandRoot, id, `${id}-icon.svg`), "utf8");
  if (/<image\b|data:image/i.test(icon)) fail(`${id}-icon.svg: embedded raster data is forbidden`);
  if (!icon.includes("<title")) fail(`${id}-icon.svg: accessible title missing`);
  if (iconHashes.has(project.icon.sha256)) fail(`${id}-icon.svg: compact mark is not project-specific`);
  iconHashes.add(project.icon.sha256);
}

for (const name of ["the-wizards.svg", "the-wizards-monochrome.svg", "the-wizards-reversed.svg"]) {
  const vector = await fs.readFile(path.join(brandRoot, "signature", name), "utf8");
  if (/<image\b|data:image/i.test(vector)) fail(`${name}: signature master contains raster data`);
  if (!vector.includes("<title")) fail(`${name}: accessible title missing`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${Object.keys(manifest.projects).length} project families and the shared signature.`);
}

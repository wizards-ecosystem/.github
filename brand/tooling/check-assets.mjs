import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await fs.readFile(path.join(root, "manifest.json"), "utf8"));
const failures = [];

// Verify deliverable files. Visual choices belong in design review.
for (const [relative, expected] of Object.entries(manifest.files)) {
  try {
    const data = await fs.readFile(path.join(root, relative));
    if (createHash("sha256").update(data).digest("hex") !== expected.sha256 ||
        data.length !== expected.bytes) {
      failures.push(relative + ": file differs from manifest");
    }
    const raster = relative.endsWith(".ico")
      ? data.subarray(data.readUInt32LE(18))
      : data;
    const metadata = await sharp(raster).metadata();
    if (metadata.width !== expected.width || metadata.height !== expected.height) {
      failures.push(relative + ": dimensions differ from manifest");
    }
    if (relative.endsWith(".svg")) {
      const svg = data.toString();
      if (/<script\b|<foreignObject\b|\bon\w+\s*=|(?:href\s*=\s*["']|url\(\s*["']?)(?:https?:|\/\/)/i.test(svg)) {
        failures.push(relative + ": active or external SVG content");
      }
    }
    if (expected.transparent) {
      if (!metadata.hasAlpha) {
        failures.push(relative + ": no alpha channel");
        continue;
      }
      const { data: pixels, info } = await sharp(raster).ensureAlpha().raw()
        .toBuffer({ resolveWithObject: true });
      let clear = false;
      let painted = false;
      for (let i = info.channels - 1; i < pixels.length; i += info.channels) {
        clear ||= pixels[i] === 0;
        painted ||= pixels[i] > 0;
        if (clear && painted) break;
      }
      if (!clear || !painted) failures.push(relative + ": empty or opaque artwork");
    }
  } catch (error) {
    failures.push(relative + ": " + error.message);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Validated " + Object.keys(manifest.files).length + " exports: file integrity and transparency.");
}

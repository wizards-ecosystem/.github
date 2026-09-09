import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  await fs.readFile(path.join(root, "manifest.json"), "utf8"),
);
const failures = [];
const hashes = new Set();
const hash = (data) => createHash("sha256").update(data).digest("hex");
const fail = (message) => failures.push(message);
const luminance = (hex) => {
  const rgb = hex
    .slice(1)
    .match(/../g)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
const contrast = (a, b) =>
  (Math.max(luminance(a), luminance(b)) + 0.05) /
  (Math.min(luminance(a), luminance(b)) + 0.05);

for (const [relative, expected] of Object.entries(manifest.files)) {
  try {
    const data = await fs.readFile(path.join(root, relative));
    if (hash(data) !== expected.sha256)
      fail(relative + ": manifest hash mismatch");
    if (data.length !== expected.bytes)
      fail(relative + ": manifest byte count mismatch");
    if (data.length > (relative.endsWith(".svg") ? 45_000 : 700_000))
      fail(relative + ": size budget exceeded");
    const metadata = await sharp(data).metadata();
    if (
      metadata.width !== expected.width ||
      metadata.height !== expected.height
    )
      fail(relative + ": dimensions differ");
    if (relative.endsWith(".svg")) {
      const vector = data.toString();
      if (
        /<image\b|data:|<text\b|<script\b|<foreignObject\b|\bhref=/i.test(
          vector,
        )
      )
        fail(relative + ": SVG must be standalone outlined artwork");
      if (
        !vector.includes("<title") ||
        !vector.includes('aria-labelledby="title"')
      )
        fail(relative + ": accessible name missing");
      if (expected.transparent && /<rect\b/.test(vector))
        fail(relative + ": background rectangle forbidden");
      if (expected.role === "icon" && expected.theme === "light") {
        if (hashes.has(hash(data))) fail(relative + ": duplicate project mark");
        hashes.add(hash(data));
      }
    }
    if (expected.transparent) {
      const { data: raw, info } = await sharp(data)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      let clear = 0;
      let painted = 0;
      for (let y = 0; y < info.height; y++)
        for (let x = 0; x < info.width; x++) {
          const alpha = raw[(y * info.width + x) * 4 + 3];
          if (alpha === 0) clear++;
          if (alpha > 32) painted++;
          if (
            (x === 0 ||
              y === 0 ||
              x === info.width - 1 ||
              y === info.height - 1) &&
            alpha > 0 &&
            expected.role !== "illustration"
          )
            fail(relative + ": artwork touches canvas edge");
        }
      if (clear / (info.width * info.height) < 0.45)
        fail(relative + ": insufficient true transparency");
      if (painted / (info.width * info.height) < 0.01)
        fail(relative + ": artwork is missing or too sparse");
    }
  } catch (error) {
    fail(relative + ": " + error.message);
  }
}
for (const [id, project] of Object.entries(manifest.projects)) {
  for (const mode of ["light", "dark", "auto"])
    for (const role of ["logo", "icon"]) {
      const name =
        id +
        "/" +
        id +
        "-" +
        role +
        (mode === "light" ? "" : "-" + mode) +
        ".svg";
      if (!manifest.files[name]) fail(name + ": missing family export");
    }
  if (
    contrast(project.accent, "#F7F6F2") < 4.5 ||
    contrast(project.accentDark, "#232522") < 4.5
  )
    fail(id + ": accent contrast below 4.5:1");
  if (await fs.stat(path.join(root, id, id + "-header.png")).catch(() => false))
    fail(id + ": retired opaque banner remains");
}
const master = await fs.readFile(path.join(root, "source/the-wizards.svg"));
const signature = await fs.readFile(
  path.join(root, "signature/the-wizards.svg"),
);
if (
  hash(master) !== hash(signature) ||
  hash(signature) !== manifest.signature.sha256
)
  fail("Shared signature differs from its master");
const tokens = JSON.parse(
  await fs.readFile(path.join(root, "tokens.json"), "utf8"),
);
for (const [id, p] of Object.entries(manifest.projects))
  if (
    tokens.projects[id]?.light !== p.accent ||
    tokens.projects[id]?.dark !== p.accentDark
  )
    fail(id + ": palette drift");
if (failures.length) {
  console.error([...new Set(failures)].join("\n"));
  process.exitCode = 1;
} else
  console.log(
    "Validated " +
      Object.keys(manifest.projects).length +
      " families and " +
      Object.keys(manifest.files).length +
      " exports: hashes, transparency, bounds, contrast, SVG integrity.",
  );

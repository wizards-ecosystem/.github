import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const body = (svg) =>
  svg
    .replace(/^<svg[^>]*>/, "")
    .replace(/<title[^>]*>[^<]*<\/title>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/[ \t]+$/gm, "")
    .trim();
const wrap = (width, height, title, content) =>
  '<svg xmlns="http://www.w3.org/2000/svg" width="' +
  width +
  '" height="' +
  height +
  '" viewBox="0 0 ' +
  width +
  " " +
  height +
  '" role="img" aria-labelledby="title"><title id="title">' +
  title +
  "</title>" +
  content +
  "</svg>\n";
const embedded = (buffer) =>
  "data:image/png;base64," + buffer.toString("base64");
const automatic = (light, dark) =>
  '<style>.night{display:none}@media(prefers-color-scheme:dark){.day{display:none}.night{display:block}}</style><g class="day">' +
  body(light) +
  '</g><g class="night">' +
  body(dark) +
  "</g>";
function resolvePigments(svg) {
  const pigments = new Map(
    [...svg.matchAll(/--([\w-]+):([^;}]+)/g)].map((match) => [
      match[1],
      match[2],
    ]),
  );
  return svg.replace(/var\(--([\w-]+)\)/g, (_, name) => {
    if (!pigments.has(name)) throw new Error("Undefined icon pigment: " + name);
    return pigments.get(name);
  });
}

export async function buildProject(
  brandRoot,
  id,
  project,
  signature,
  layout,
  writeExport,
  caption,
) {
  const source = path.join(brandRoot, "source", id);
  const emit = (name, data, role, transparent = false, theme) =>
    writeExport(id + "/" + name, data, {
      role,
      transparent,
      ...(theme ? { theme } : {}),
    });
  const art = {
    light: await fs.readFile(path.join(source, "art.png")),
    dark: await fs.readFile(path.join(source, "art-dark.png")),
  };
  const { width: w, height: h } = await sharp(art.light).metadata();
  const sigW = w * layout.signatureWidth,
    sigH = (sigW * 140) / 378;
  const sigX =
    layout.signatureLeft < 1 ? w * layout.signatureLeft : layout.signatureLeft;
  const artY = layout.overlaySignature ? 0 : sigH + 10;
  const width = Math.ceil(w + 40),
    height = Math.ceil(Math.max(h + artY, sigH) + 40);
  const headerWidth = Math.ceil(438 + (w * 140) / h);
  const full = {},
    headers = {},
    icons = {};
  for (const theme of ["light", "dark"]) {
    const suffix = theme === "light" ? "" : "-dark";
    const signatureBody = body(signature).replaceAll(
      "#272522",
      theme === "dark" ? "#F7F6F2" : "#272522",
    );
    full[theme] = wrap(
      width,
      height,
      "The Wizard's " + project.name,
      '<image x="20" y="' +
        (20 + artY) +
        '" width="' +
        w +
        '" height="' +
        h +
        '" href="' +
        embedded(art[theme]) +
        '"/><g transform="translate(' +
        (20 + sigX) +
        " 20) scale(" +
        sigW / 378 +
        ')">' +
        signatureBody +
        "</g>",
    );
    headers[theme] = wrap(
      headerWidth,
      164,
      "The Wizard's " + project.name,
      '<image x="426" y="12" width="' +
        (w * 140) / h +
        '" height="140" href="' +
        embedded(art[theme]) +
        '"/><g transform="translate(12 12)">' +
        signatureBody +
        "</g>",
    );
    icons[theme] = await fs.readFile(
      path.join(source, "icon" + suffix + ".svg"),
      "utf8",
    );
    await emit(
      id + "-logo" + suffix + ".svg",
      full[theme],
      "logo",
      true,
      theme,
    );
    await emit(
      id + "-logo" + suffix + ".png",
      await sharp(Buffer.from(full[theme]))
        .resize(1200)
        .png({ compressionLevel: 9 })
        .toBuffer(),
      "logo",
      true,
      theme,
    );
    await emit(
      id + "-header" + suffix + ".svg",
      headers[theme],
      "header",
      true,
      theme,
    );
    await emit(
      id + "-icon" + suffix + ".svg",
      icons[theme],
      "icon",
      true,
      theme,
    );
    await emit(
      id + "-icon" + suffix + ".png",
      await sharp(Buffer.from(resolvePigments(icons[theme])))
        .resize(256)
        .png()
        .toBuffer(),
      "icon",
      true,
      theme,
    );
    await emit(
      id + "-art" + suffix + ".png",
      art[theme],
      "illustration",
      true,
      theme,
    );
  }
  await emit(
    id + "-logo-auto.svg",
    wrap(
      width,
      height,
      "The Wizard's " + project.name,
      automatic(full.light, full.dark),
    ),
    "logo",
    true,
    "auto",
  );
  await emit(
    id + "-icon-auto.svg",
    await fs.readFile(path.join(source, "icon-auto.svg")),
    "icon",
    true,
    "auto",
  );
  await emit(
    id + "-lockup.png",
    await sharp(Buffer.from(full.light))
      .resize(1200)
      .png({ compressionLevel: 9 })
      .toBuffer(),
    "illustration",
    true,
  );
  const scale = Math.min(1000 / width, (caption ? 450 : 520) / height);
  const captionBody = caption
    ? '<g transform="translate(' +
      (1200 - caption.width) / 2 +
      ' 575)" fill="#625F59">' +
      caption.body +
      "</g>"
    : "";
  const social = wrap(
    1200,
    630,
    "The Wizard's " + project.name + " social preview",
    '<rect width="1200" height="630" fill="#F7F6F2"/><g transform="translate(' +
      (1200 - width * scale) / 2 +
      " " +
      (caption ? 40 : (630 - height * scale) / 2) +
      ") scale(" +
      scale +
      ')">' +
      body(full.light) +
      "</g>" +
      captionBody,
  );
  await emit(id + "-social.svg", social, "social");
  await emit(
    id + "-social.png",
    await sharp(Buffer.from(social)).png({ compressionLevel: 9 }).toBuffer(),
    "social",
  );
  const icon = resolvePigments(icons.light);
  const avatar = wrap(
    500,
    500,
    "The Wizard's " + project.name,
    '<rect width="500" height="500" fill="#F7F6F2"/><g transform="translate(58 42) scale(3)">' +
      body(icon) +
      "</g>",
  );
  await emit(
    id + "-avatar.png",
    await sharp(Buffer.from(avatar)).png().toBuffer(),
    "avatar",
  );
  await emit(
    "apple-touch-icon.png",
    await sharp(Buffer.from(avatar)).resize(180).png().toBuffer(),
    "touch-icon",
  );
  for (const size of [16, 32])
    await emit(
      "favicon-" + size + ".png",
      await sharp(Buffer.from(icon)).resize(size).png().toBuffer(),
      "favicon",
      true,
    );
  const png = await sharp(Buffer.from(icon)).resize(256).png().toBuffer();
  const directory = Buffer.alloc(22);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(1, 4);
  directory.writeUInt16LE(1, 10);
  directory.writeUInt16LE(32, 12);
  directory.writeUInt32LE(png.length, 14);
  directory.writeUInt32LE(22, 18);
  await emit("favicon.ico", Buffer.concat([directory, png]), "favicon", true);
}

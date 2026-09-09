import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const brand = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { values } = parseArgs({
  options: {
    workspace: { type: "string" },
    "wsl-home": { type: "string" },
    check: { type: "boolean", default: false },
  },
});
if (!values.workspace && !values["wsl-home"])
  throw new Error("Pass --workspace and/or --wsl-home. No paths are inferred.");
const roots = { workspace: values.workspace, wsl: values["wsl-home"] };
const consumers = JSON.parse(
  await fs.readFile(path.join(brand, "consumers.json"), "utf8"),
);
const pending = [];
const failures = [];
function target(root, relative) {
  const base = path.resolve(root);
  const resolved = path.resolve(base, relative);
  const rest = path.relative(base, resolved);
  if (!rest || rest.startsWith("..") || path.isAbsolute(rest))
    throw new Error("Consumer escaped its root: " + relative);
  return resolved;
}
for (const [kind, root] of Object.entries(roots)) {
  if (!root) continue;
  for (const [repo, families] of Object.entries(consumers[kind])) {
    await fs.access(target(root, repo));
    for (const [id, folders] of Object.entries(families))
      for (const folder of folders) {
        for (const suffix of [
          "logo.svg",
          "logo-dark.svg",
          "icon.svg",
          "icon-dark.svg",
          "icon-auto.svg",
        ]) {
          const source = id + "/" + id + "-" + suffix;
          pending.push({
            source,
            destination: target(
              root,
              repo + "/" + folder + "/" + id + "-" + suffix,
            ),
          });
        }
      }
  }
}
for (const alias of consumers.aliases)
  if (roots[alias.root])
    pending.push({
      source: alias.source,
      destination: target(roots[alias.root], alias.target),
    });
for (const item of pending)
  item.data = await fs.readFile(path.join(brand, item.source));
for (const { source, destination, data } of pending) {
  const existing = await fs.readFile(destination).catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (existing?.equals(data)) continue;
  if (values.check) failures.push(destination + " differs from " + source);
  else {
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, data);
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    (values.check ? "Verified " : "Synchronized ") +
      pending.length +
      " repository assets.",
  );

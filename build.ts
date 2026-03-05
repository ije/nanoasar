import { build, stop } from "esbuild";

await Bun.$`rm -rf types && mkdir -p types`;
await Bun.$`cp node_modules/@electron/asar/lib/*.d.ts types`;

await build({
  entryPoints: ["index.ts"],
  outfile: "asar.mjs",
  bundle: true,
  platform: "node",
  target: "node24",
  format: "esm",
  write: true,
  minify: true,
  treeShaking: true,
  outExtension: { ".js": ".mjs" },
});
await stop();

console.log("Size of asar.mjs: " + (Bun.file("asar.mjs").size / 1024).toFixed(2) + " KB");

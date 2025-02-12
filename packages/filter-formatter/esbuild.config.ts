import { build, BuildOptions, BuildResult } from "esbuild";

const isWatch = process.argv.includes("--watch");

const options: BuildOptions = {
  entryPoints: ["src/cli.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "esm",
  sourcemap: true,
  outdir: "dist",
  minify: false,
};

build(options)
  .then(() => {
    if (!isWatch) {
      console.log("✅ Build completed successfully.");
    }
  })
  .catch((error) => {
    console.error("❌ Build failed:", error);
    process.exit(1);
  });

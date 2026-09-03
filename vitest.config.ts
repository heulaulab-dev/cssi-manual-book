import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { fumadocsMdx } from "fumadocs-mdx/vite";
import { docs } from "./source.config";

export default defineConfig({
  plugins: [
    fumadocsMdx({
      forcedConfig: { docs },
      updateViteConfig: false,
    }),
  ],
  test: {
    environment: "node",
    coverage: {
      provider: "istanbul",
      reporter: ["lcov", "html"],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
      collections: fileURLToPath(new URL("./.source", import.meta.url)),
    },
  },
});

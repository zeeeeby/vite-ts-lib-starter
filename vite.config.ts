/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";

const getPackageNameCamelCase = () => {
  try {
    return packageJson.name
      .replace('@pluskids/', '')
      .replace(/-./g, char => char[1].toUpperCase());
  } catch {
    throw new Error("Name property in package.json is missing.");
  }
};

export default defineConfig({
  base: "./",
  build: {
    outDir: "./dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: getPackageNameCamelCase(),
      formats: ["es", "iife"],
      fileName: format => `index.${format}.js`,
    },
  },
  test: {
    watch: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@@": path.resolve(__dirname),
    },
  },
});

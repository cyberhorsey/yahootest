import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import nodePolyfills from "vite-plugin-node-stdlib-browser";

import inject from "@rollup/plugin-inject";
export default defineConfig({
  plugins: [svelte(), nodePolyfills()],
  define: { global: "window" },
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ["Buffer", "Buffer"] })],
    },
  },
});

import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import nodePolyfills from "vite-plugin-node-stdlib-browser";
import inject from "@rollup/plugin-inject";
import * as path from "path";
import vitePluginRequire from "vite-plugin-require";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), nodePolyfills(), vitePluginRequire({})],
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "src"),
  //   },
  // },
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ["buffer", "Buffer"] })],
    },
  },
});

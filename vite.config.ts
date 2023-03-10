import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import nodePolyfills from "vite-plugin-node-stdlib-browser";
import inject from "@rollup/plugin-inject";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), nodePolyfills()],
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "src"),
  //   },
  // },
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ["buffer", "Buffer"] })],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(["@loopring-web/**"])],
    },
  },
});

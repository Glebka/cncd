import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";

const path = require("path");

export default defineConfig({
  root: "src/ui",
  resolve: {
    alias: {
      "@ui": path.resolve(__dirname, "./src/ui"),
      util: "rollup-plugin-node-polyfills/polyfills/util",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    outDir: "../../dist",
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },
  server: process.env.DEVPROXY
    ? {
        proxy: {
          "/startCuring": process.env.DEVPROXY,
          "/cancelCuring": process.env.DEVPROXY,
          "/image": process.env.DEVPROXY,
          "/screen/info": process.env.DEVPROXY,
        },
      }
    : undefined,
  plugins: [react({ jsxRuntime: "classic" })],
});

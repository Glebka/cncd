import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src"),
    },
  },
  envPrefix: ["REACT_APP_"],
  plugins: [react()],
});

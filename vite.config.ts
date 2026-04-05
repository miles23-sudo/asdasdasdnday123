import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const port = Number(process.env.PORT) || 5173;
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  base,
  root: "client",
  plugins: [react()],
  build: {
    outDir: "../dist/public",
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});

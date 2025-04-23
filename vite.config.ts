import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx"],
  },
  plugins: [react(), tempo()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: false,
    cors: true,
    hmr: {
      // Remove explicit clientPort and host to let Vite auto-detect
      protocol: "ws",
      timeout: 120000,
    },
    // Allow Tempo to access the dev server
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
});

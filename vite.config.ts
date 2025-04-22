import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// Tempo dependencies removed

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx"],
  },
  plugins: [react()],
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
      clientPort: 3000,
      host: "localhost",
      protocol: "ws",
      timeout: 120000,
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: false,
    allowedHosts: [
      "0eba1035-5b7d-4b7b-94fa-3611e17b3540-00-22x6qhqee6rcu.picard.replit.dev",
      ".replit.dev",
      ".picard.replit.dev",
      "localhost",
      "127.0.0.1"
    ],
    hmr: {
      port: 5000,
      host: "0.0.0.0",
    },
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

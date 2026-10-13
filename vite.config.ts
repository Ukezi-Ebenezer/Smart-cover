import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlifyPlugin from "@netlify/vite-plugin-tanstack-start";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    command === "build" ? netlifyPlugin() : null,
    tanstackStart(),
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  ssr: {
    noExternal: ["gsap"],
  },
}));

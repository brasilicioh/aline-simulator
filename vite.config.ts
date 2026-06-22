import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  base: "/aline-simulator/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@pages": resolve(__dirname, "src/pages"),
      "@mru": resolve(__dirname, "src/simulations/mru"),
      "@muv": resolve(__dirname, "src/simulations/muv"),
      "@ql": resolve(__dirname, "src/simulations/ql"),
      "@charts": resolve(__dirname, "src/components/charts"),
      "@animation": resolve(__dirname, "src/hooks/useAnimation.ts"),
      "@assets": resolve(__dirname, "./src/assets"),
    },
  },
});

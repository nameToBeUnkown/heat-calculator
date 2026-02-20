import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "Розрахунок тепловентилятора",
          short_name: "ThermoCalc",
          description:
            "Калькулятор теплової потужності та продуктивності тепловентилятора",
          theme_color: "#1c1917",
          background_color: "#fafaf9",
          display: "standalone",
          start_url: "/heat-calculator/?pwa=true",
          icons: [
            {
              src: "/heat-calculator/pwa-icon.svg",
              sizes: "any",
              type: "image/svg+xml",
              purpose: "any maskable",
            },
          ],
        },
      }),
    ],
    base: "/heat-calculator/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});

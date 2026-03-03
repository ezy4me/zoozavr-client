import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/zoozavr-client/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Zoozavr Knowledge Base",
        short_name: "Zoozavr",
        description: "Corporate LMS with Offline Support",
        theme_color: "#2d5a27",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/zoozavr-client/",
        scope: "/zoozavr-client/",
        id: "/zoozavr-client/",
        icons: [
          {
            src: "https://cdn-icons-png.flaticon.com/512/616/616430.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "https://cdn-icons-png.flaticon.com/512/616/616430.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/api/course_materials"),
            handler: "CacheFirst",
            options: {
              cacheName: "materials-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api/tests"),
            handler: "NetworkFirst",
            options: { cacheName: "api-cache" },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
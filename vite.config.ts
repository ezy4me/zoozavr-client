import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      // Оставляем только то, что реально может быть в public
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      devOptions: {
        enabled: true, // Позволяет тестировать PWA в dev-режиме по локальной сети
      },
      manifest: {
        name: "Zoozavr Knowledge Base",
        short_name: "Zoozavr",
        description: "Corporate LMS with Offline Support",
        theme_color: "#2d5a27",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        id: "/", // Уникальный идентификатор приложения
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
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // Кешируем статику
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

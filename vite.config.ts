import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "MelodyWave - Tu mundo musical",
        short_name: "MelodyWave",
        icons: [
          {
            src: "/icons/gibli.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/ponyo.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        theme_color: "#1A1A40",
        background_color: "#F5F3FF",
        display: "standalone",
        start_url: "/index.html",
        orientation: "portrait"
      }
    })
  ]
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    	VitePWA({
			injectRegister: "auto",
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
			workbox: {
				navigateFallback: "/index.html",
				globPatterns: ["**/*.{js,css,html,png,svg,ico,jpg,jpeg,json}"],
				cleanupOutdatedCaches: true,
			},
			manifest: {
				name: "Poke API",
				short_name: "Poke API",
				description: "A simple Poke API app",
				start_url: "/",
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#ffffff",
				screenshots: [
					{
						src: "/screenshots/image.png",
						sizes: "540x720",
						type: "image/png",
						form_factor: "wide",
					},
					{
						src: "/screenshots/image.png",
						sizes: "540x720",
						type: "image/png",
						form_factor: "narrow",
					},
				],
				icons: [
					{
						src: "/icons/manifest-icon-192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/icons/manifest-icon-512.png",
						sizes: "512x512",
          
						type: "image/png",
					},
					{
						src: "/icons/manifest-icon-512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
		}),
  ],
  
})

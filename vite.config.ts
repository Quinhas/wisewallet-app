import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tsconfigPaths(),
		react(),
		eslint(),
		VitePWA({
			manifest: {
				name: "Wisewallet",
				short_name: "Wisewallet",
				start_url: '/',
				display: "standalone",
				background_color: "#fff",
				lang: "en",
				scope: "/",
				icons: [
					{
						src: '/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable',
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
				theme_color: '#7869E2',
			},
			registerType: 'autoUpdate'
		})
	],
})

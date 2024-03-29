import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/gpcalc/",
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "GpCalc",
				short_name: "GpCalc",
				start_url: ".",
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#efefef",
				orientation: "portrait-primary",
				description: "Dynamic grade point(GP) calculator software",
				icons: [
					{
						src: "./icons/android-icon-36x36.png",
						sizes: "36x36",
						type: "image/png",
						density: "0.75",
					},
					{
						src: "./icons/android-icon-48x48.png",
						sizes: "48x48",
						type: "image/png",
						density: "1.0",
					},
					{
						src: "./icons/android-icon-72x72.png",
						sizes: "72x72",
						type: "image/png",
						density: "1.5",
					},
					{
						src: "./icons/android-icon-96x96.png",
						sizes: "96x96",
						type: "image/png",
						density: "2.0",
					},
					{
						src: "./icons/android-icon-144x144.png",
						sizes: "144x144",
						type: "image/png",
						density: "3.0",
					},
					{
						src: "./icons/android-icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
						density: "4.0",
					},
				],
			},
			injectRegister: "inline",
			includeAssets: ["./robots.txt", "./composite-result-template.xlsx"],
			devOptions: {
				enabled: false,
			},
		}),
	],
});

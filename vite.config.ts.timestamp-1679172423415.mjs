// vite.config.ts
import { defineConfig } from "file:///Users/macuser/Documents/24cipher/projects/gpcalc/node_modules/vite/dist/node/index.js";
import react from "file:///Users/macuser/Documents/24cipher/projects/gpcalc/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///Users/macuser/Documents/24cipher/projects/gpcalc/node_modules/vite-plugin-pwa/dist/index.mjs";
var vite_config_default = defineConfig({
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
            density: "0.75"
          },
          {
            src: "./icons/android-icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
            density: "1.0"
          },
          {
            src: "./icons/android-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
            density: "1.5"
          },
          {
            src: "./icons/android-icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            density: "2.0"
          },
          {
            src: "./icons/android-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            density: "3.0"
          },
          {
            src: "./icons/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            density: "4.0"
          }
        ]
      },
      injectRegister: "inline",
      includeAssets: ["./result-table-sample.png", "./robots.txt"],
      devOptions: {
        enabled: true
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFjdXNlci9Eb2N1bWVudHMvMjRjaXBoZXIvcHJvamVjdHMvZ3BjYWxjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWFjdXNlci9Eb2N1bWVudHMvMjRjaXBoZXIvcHJvamVjdHMvZ3BjYWxjL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYWN1c2VyL0RvY3VtZW50cy8yNGNpcGhlci9wcm9qZWN0cy9ncGNhbGMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdGJhc2U6IFwiL2dwY2FsYy9cIixcblx0cGx1Z2luczogW1xuXHRcdHJlYWN0KCksXG5cdFx0Vml0ZVBXQSh7XG5cdFx0XHRyZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuXHRcdFx0bWFuaWZlc3Q6IHtcblx0XHRcdFx0bmFtZTogXCJHcENhbGNcIixcblx0XHRcdFx0c2hvcnRfbmFtZTogXCJHcENhbGNcIixcblx0XHRcdFx0c3RhcnRfdXJsOiBcIi5cIixcblx0XHRcdFx0ZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXG5cdFx0XHRcdGJhY2tncm91bmRfY29sb3I6IFwiI2ZmZmZmZlwiLFxuXHRcdFx0XHR0aGVtZV9jb2xvcjogXCIjZWZlZmVmXCIsXG5cdFx0XHRcdG9yaWVudGF0aW9uOiBcInBvcnRyYWl0LXByaW1hcnlcIixcblx0XHRcdFx0ZGVzY3JpcHRpb246IFwiRHluYW1pYyBncmFkZSBwb2ludChHUCkgY2FsY3VsYXRvciBzb2Z0d2FyZVwiLFxuXHRcdFx0XHRpY29uczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNyYzogXCIuL2ljb25zL2FuZHJvaWQtaWNvbi0zNngzNi5wbmdcIixcblx0XHRcdFx0XHRcdHNpemVzOiBcIjM2eDM2XCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcImltYWdlL3BuZ1wiLFxuXHRcdFx0XHRcdFx0ZGVuc2l0eTogXCIwLjc1XCIsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzcmM6IFwiLi9pY29ucy9hbmRyb2lkLWljb24tNDh4NDgucG5nXCIsXG5cdFx0XHRcdFx0XHRzaXplczogXCI0OHg0OFwiLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJpbWFnZS9wbmdcIixcblx0XHRcdFx0XHRcdGRlbnNpdHk6IFwiMS4wXCIsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzcmM6IFwiLi9pY29ucy9hbmRyb2lkLWljb24tNzJ4NzIucG5nXCIsXG5cdFx0XHRcdFx0XHRzaXplczogXCI3Mng3MlwiLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJpbWFnZS9wbmdcIixcblx0XHRcdFx0XHRcdGRlbnNpdHk6IFwiMS41XCIsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzcmM6IFwiLi9pY29ucy9hbmRyb2lkLWljb24tOTZ4OTYucG5nXCIsXG5cdFx0XHRcdFx0XHRzaXplczogXCI5Nng5NlwiLFxuXHRcdFx0XHRcdFx0dHlwZTogXCJpbWFnZS9wbmdcIixcblx0XHRcdFx0XHRcdGRlbnNpdHk6IFwiMi4wXCIsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzcmM6IFwiLi9pY29ucy9hbmRyb2lkLWljb24tMTQ0eDE0NC5wbmdcIixcblx0XHRcdFx0XHRcdHNpemVzOiBcIjE0NHgxNDRcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG5cdFx0XHRcdFx0XHRkZW5zaXR5OiBcIjMuMFwiLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3JjOiBcIi4vaWNvbnMvYW5kcm9pZC1pY29uLTE5MngxOTIucG5nXCIsXG5cdFx0XHRcdFx0XHRzaXplczogXCIxOTJ4MTkyXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcImltYWdlL3BuZ1wiLFxuXHRcdFx0XHRcdFx0ZGVuc2l0eTogXCI0LjBcIixcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0fSxcblx0XHRcdGluamVjdFJlZ2lzdGVyOiBcImlubGluZVwiLFxuXHRcdFx0aW5jbHVkZUFzc2V0czogW1wiLi9yZXN1bHQtdGFibGUtc2FtcGxlLnBuZ1wiLCBcIi4vcm9ib3RzLnR4dFwiXSxcblx0XHRcdGRldk9wdGlvbnM6IHtcblx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0fSksXG5cdF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVUsU0FBUyxvQkFBb0I7QUFDbFcsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUd4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDUCxjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsUUFDVCxNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxrQkFBa0I7QUFBQSxRQUNsQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDTjtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1Y7QUFBQSxVQUNBO0FBQUEsWUFDQyxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxZQUNDLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNWO0FBQUEsVUFDQTtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1Y7QUFBQSxVQUNBO0FBQUEsWUFDQyxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxZQUNDLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNWO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxNQUNBLGdCQUFnQjtBQUFBLE1BQ2hCLGVBQWUsQ0FBQyw2QkFBNkIsY0FBYztBQUFBLE1BQzNELFlBQVk7QUFBQSxRQUNYLFNBQVM7QUFBQSxNQUNWO0FBQUEsSUFDRCxDQUFDO0FBQUEsRUFDRjtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

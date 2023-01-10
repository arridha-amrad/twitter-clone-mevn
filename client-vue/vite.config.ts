import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [vue()],
    server: {
      port: parseInt(process.env.VITE_PORT),
      host: true,
      cors: {
        credentials: true,
        origin: process.env.VITE_SERVER_BASE_URL,
      },
    },
  });
};

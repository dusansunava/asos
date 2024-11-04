import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, "../") };

  return defineConfig({
    plugins: [react()],
    envDir: "../",
    server: {
      host: process.env.VITE_HOST ? process.env.VITE_HOST : "localhost",
      port: parseInt(process.env.VITE_PORT),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};

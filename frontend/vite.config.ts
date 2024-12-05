import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, "../") };

  return defineConfig({
    plugins: [react()],
    envDir: "../",
    server: {
      host: "0.0.0.0",
      port: mode === "production" ? 4173 : parseInt(process.env.VITE_PORT),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};

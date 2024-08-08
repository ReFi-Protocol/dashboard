import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import nodePolyfills from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    NodeGlobalsPolyfillPlugin({
      buffer: true,
      process: true,
    }),
    nodePolyfills({
      include: ["stream"],
    }),
  ],
  esbuild: {
    target: "esnext",
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      stream: "stream-browserify",
    },
  },
  optimizeDeps: {
    include: ["@project-serum/anchor", "@solana/web3.js", "buffer"],
    esbuildOptions: {
      target: "esnext",
      define: {
        global: "globalThis",
      },
      plugins: [],
    },
  },
  define: {
    "process.env.BROWSER": true,
  },
});

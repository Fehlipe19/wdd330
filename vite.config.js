import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        library: resolve(__dirname, "src/library/index.html"),
        character: resolve(__dirname, "src/character/index.html"),
      },
    },
  },
});

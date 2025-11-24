import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

export default defineConfig({
  base: "/yacht-dice-frontend/",
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
    {
      name: "copy-404",
      closeBundle() {
        fs.copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ],
});

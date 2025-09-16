import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import pluginPrettier from "eslint-plugin-prettier";

export default defineConfig([
  { 
    files: [
      "**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"
    ], 
    plugins: { 
      js,
      prettier: pluginPrettier,
    }, 
    extends: [
      "js/recommended",
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      "plugin:prettier/recommended",
    ], 
    languageOptions: { 
      globals: globals.browser 
    },
    rules: {
      "prettier/prettier": "error"
    }, 
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);

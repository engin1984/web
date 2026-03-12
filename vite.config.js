import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Dynamically find all HTML files in the root directory
const rootFiles = fs.readdirSync(__dirname);
const htmlFiles = rootFiles.filter(file => file.endsWith('.html'));

const rollupInputs = htmlFiles.reduce((acc, file) => {
  const name = file.replace(/\.html$/, '');
  acc[name] = resolve(__dirname, file);
  return acc;
}, {});

export default defineConfig({
  build: {
    rollupOptions: {
      input: rollupInputs,
    },
    // Optimization settings from the current config
    minify: 'esbuild',
    cssMinify: true,
  },
});


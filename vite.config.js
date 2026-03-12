import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
    // Default minification is fast and efficient
    minify: 'esbuild',
    cssMinify: true,
  },
});

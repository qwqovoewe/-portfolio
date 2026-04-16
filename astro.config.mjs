// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://qwqovoewe.github.io',
  base: '/-portfolio',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

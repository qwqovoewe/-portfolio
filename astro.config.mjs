// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://qwqovoewe.github.io',
  base: '/-portfolio',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

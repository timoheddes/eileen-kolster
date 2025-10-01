import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy';
import critical from 'rollup-plugin-critical';
import * as fs from 'fs';
import * as path from 'path';

const inlineCriticalCss = (): Plugin => {
  return {
    name: 'inline-critical-css',
    apply: 'build',
    enforce: 'post',
    closeBundle: () => {
      const distPath = path.resolve(__dirname, 'dist');
      const criticalCssPath = path.join(
        distPath,
        'index_critical.min.css'
      );
      const indexPath = path.join(distPath, 'index.html');

      try {
        if (
          fs.existsSync(criticalCssPath) &&
          fs.existsSync(indexPath)
        ) {
          const criticalCss = fs.readFileSync(
            criticalCssPath,
            'utf-8'
          );
          let indexHtml = fs.readFileSync(indexPath, 'utf-8');

          const styleTag = `<style>${criticalCss}</style>`;
          indexHtml = indexHtml.replace(
            '</head>',
            `${styleTag}</head>`
          );

          fs.writeFileSync(indexPath, indexHtml, 'utf-8');
        }
      } catch (error) {
        console.error('Error inlining critical CSS:', error);
      }
    },
  };
};

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    critical({
      criticalBase: 'dist/',
      criticalUrl: 'https://eileenkolster.com',
      criticalPages: [{ uri: '/', template: 'index' }],
      criticalConfig: {
        inline: false,
        base: 'dist/',
        extract: true,
        width: 1300,
        height: 900,
      },
    }),
    inlineCriticalCss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion', 'gsap'],
          audio: ['wavesurfer.js'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Disable sourcemaps in production
    assetsInlineLimit: 4096, // Inline small assets
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  css: {
    postcss: {
      plugins: [
        // Add autoprefixer and cssnano
      ],
    },
  },
});

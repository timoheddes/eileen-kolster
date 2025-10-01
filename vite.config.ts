import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy';
import critical from 'rollup-plugin-critical';

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
      criticalUrl: './dist/index.html',
      criticalBase: './dist',
      criticalPages: [
        {
          uri: 'index.html',
          template: 'index.html',
        },
      ],
    }),
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

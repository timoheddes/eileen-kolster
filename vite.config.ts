import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      webp: {
        quality: 60,
      },
      png: {
        quality: 70,
      },
      jpeg: {
        quality: 70,
      },
    }),
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
  // PostCSS config is in postcss.config.js (autoprefixer + PurgeCSS)
});

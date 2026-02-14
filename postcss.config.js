import autoprefixer from 'autoprefixer';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    autoprefixer(),
    purgeCSSPlugin({
      content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
      keyframes: true,
      safelist: {
        // Splitting.js injects these classes dynamically at runtime
        standard: ['splitting', 'char', 'word'],
        greedy: [/^splitting/, /^char--/, /^word--/],
      },
      defaultExtractor: (content) =>
        content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};

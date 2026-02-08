import autoprefixer from 'autoprefixer';
import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    autoprefixer(),
    purgeCSSPlugin({
      content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
      // safelist: ['class-to-keep', /^dynamic-/],
      defaultExtractor: (content) =>
        content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};

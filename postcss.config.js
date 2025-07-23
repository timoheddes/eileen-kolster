module.exports = {
  plugins: [
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
      // safelist: ['class-to-keep', /^dynamic-/],
      defaultExtractor: (content) =>
        content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};

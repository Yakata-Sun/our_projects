import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import glob from 'glob';

const htmlFiles = glob.sync('./*.html');

export default defineConfig({
  build: {
    minify: true, // Включаем минификацию
    rollupOptions: {
      input: htmlFiles.reduce((acc, file) => {
        const name = file.replace('./', '').replace('.html', '');
        acc[name] = resolve(__dirname, file);
        return acc;
      }, {}),
      output: {
        // Сохранение структуры папок при сборке
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]', // Минификация ресурсов
      },
    },
    outDir: 'dist', // Папка для выходных файлов
    emptyOutDir: true, // Очищать выходную папку перед сборкой
  },
  css: {
    minify: true, // Включаем минификацию CSS
  },
  plugins: [
    createHtmlPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
  ],
});
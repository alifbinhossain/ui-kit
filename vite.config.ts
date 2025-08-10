// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    cssCodeSplit: false,
    cssMinify: true,
    lib: {
      // Library mode entry point.
      entry: {
        // The main 'index' entry point, which will be the barrel export for the library.
        // It will also be responsible for importing the main CSS file.
        index: path.resolve(__dirname, 'src/index.ts'),
        // Use glob to find all other components as separate entry points.
        // This ensures deep imports are possible (e.g., `import { Button } from 'my-lib/components/ui/button'`).
        ...Object.fromEntries(
          glob
            .sync('src/components/ui/**/*.tsx')
            .map((file) => [
              path.relative(
                'src',
                file.slice(0, file.length - path.extname(file).length)
              ),
              file,
            ])
        ),
      },

      // entry: {
      //   index: resolve(__dirname, 'src/index.ts'),
      //   components: resolve(__dirname, 'src/components/index.ts'),
      // },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
      cssFileName: 'style', // Output CSS file name
    },
    rollupOptions: {
      // Externalize peer dependencies to avoid bundling them.
      external: ['react', 'react-dom'],
      output: {
        preserveModules: true,
        // Provide global variables for these external dependencies.
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: false,
    emptyOutDir: true,
  },
});

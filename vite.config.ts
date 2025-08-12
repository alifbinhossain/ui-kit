// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';

import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
    }),

    visualizer({
      filename: 'bundle-stats.html', // Output file for the analysis
      open: true, // Automatically open the report in the browser after build
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
    sourcemap: true,
    lib: {
      // Library mode entry point.
      entry: {
        // The main 'index' entry point, which will be the barrel export for the library.
        // It will also be responsible for importing the main CSS file.
        index: path.resolve(__dirname, 'src/index.ts'),
        form: path.resolve(__dirname, 'src/components/core/form/index.ts'),
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

        ...Object.fromEntries(
          glob
            .sync('src/hooks/**/*.ts')
            .map((file) => [
              path.relative(
                'src',
                file.slice(0, file.length - path.extname(file).length)
              ),
              file,
            ])
        ),

        ...Object.fromEntries(
          glob
            .sync('src/utils/**/*.ts')
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
      // fileName: (format, entryName) => `${entryName}.js`,
      // cssFileName: 'style', // Output CSS file name
    },
    rollupOptions: {
      // Externalize peer dependencies to avoid bundling them.
      external: [
        'react',
        'react-dom',
        '@tanstack/react-query',
        'react-hook-form',
        'axios',
        '@hookform/devtools',
        '@headlessui/react',
        'lucide-react',
        'framer-motion',
        'react-hotkeys-hook',
        'date-fns',
        'zod',
        'react-dropzone',
        'handsontable',
        '@handsontable/react',
        'react-quill-new',
      ],
      output: {
        preserveModules: true,
        entryFileNames: `[name].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'style.css'; // You can still bundle main styles if needed
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Provide global variables for these external dependencies.
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@tanstack/react-query': 'ReactQuery',
          'react-hook-form': 'ReactHookForm',
          axios: 'axios',
          '@hookform/devtools': 'ReactHookFormDevTools',
          '@headlessui/react': 'HeadlessUIReact',
          'lucide-react': 'LucideReact',
          'framer-motion': 'FramerMotion',
          'react-hotkeys-hook': 'ReactHotkeysHook',
          'date-fns': 'dateFns',
          zod: 'zod',
          'react-dropzone': 'ReactDropzone',
          handsontable: 'Handsontable',
          '@handsontable/react': 'HandsontableReact',
          'react-quill-new': 'ReactQuillNew',
        },
      },
    },
    emptyOutDir: true,
  },
});

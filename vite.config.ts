// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';

import { visualizer } from 'rollup-plugin-visualizer';

import pkg from './package.json'; // Import your package.json

/**
 * Converts a package name to a PascalCase string for UMD globals.
 * @param {string} name - The package name.
 * @returns {string} The PascalCase version of the name.
 */
function toPascalCase(name: string): string {
  // Handle scoped packages
  const scopeRemoved = name.replace(/^@.*\//, '');
  // Handle special cases
  if (scopeRemoved === 'react') return 'React';
  if (scopeRemoved === 'react-dom') return 'ReactDOM';
  if (scopeRemoved === 'js-cookie') return 'Cookies';

  return scopeRemoved
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Generate the globals object from peerDependencies
const globals = Object.keys(pkg.peerDependencies || {}).reduce(
  (acc: Record<string, string>, key) => {
    acc[key] = toPascalCase(key);
    return acc;
  },
  {} as Record<string, string>
);

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
        providers: path.resolve(__dirname, 'src/providers/index.ts'),
        layout: path.resolve(__dirname, 'src/components/layout/index.tsx'),
        login: path.resolve(__dirname, 'src/components/auth/login/index.tsx'),
        form: path.resolve(__dirname, 'src/components/core/form/index.ts'),
        modal: path.resolve(__dirname, 'src/components/core/modal/index.ts'),
        'data-table': path.resolve(
          __dirname,
          'src/components/core/data-table/index.tsx'
        ),
        'data-table-ssr': path.resolve(
          __dirname,
          'src/components/core/data-table-ssr/index.tsx'
        ),

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
            .sync('src/components/buttons/**/*.tsx')
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
            .sync('src/utils/**/*.{ts,tsx}')
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
            .sync('src/lib/**/*.ts')
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
        ...Object.keys(pkg.peerDependencies || {}),
        /^react\/.+$/,
        /^react-dom\/.+$/,
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
        globals,
      },
    },
    emptyOutDir: true,
  },
});

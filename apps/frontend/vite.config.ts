/// <reference types='vitest' />
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/frontend',
    server: {
      port: 4200,
      host: 'localhost',
      proxy: {
        '/api': {
          target: 'http://localhost:3000/api',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    preview: {
      port: 4300,
      host: 'localhost',
    },
    plugins: [react()],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@sapient-fc/ui-library': path.resolve(
          __dirname,
          '../../libs/ui-library/src'
        ),
        '@sapient-fc/offline-query-provider': path.resolve(
          __dirname,
          '../../libs/offline-query-provider/src'
        ),
      },
    },
    build: {
      outDir: './dist',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    define: {
      'import.meta.vitest': undefined,
    },
    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      includeSource: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: './test-output/vitest/coverage',
        provider: 'v8' as const,
      },
    },
  };
});

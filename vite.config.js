import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import path from 'path';

const RESUME_URL = 'https://drive.google.com/file/d/1dqqjtfrtSprcXXE83AtuHFGUYZwf4IH5/view?usp=sharing';

const resumeRedirectPlugin = () => ({
  name: 'resume-redirect',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (!req.url) {
        next();
        return;
      }

      const requestUrl = new URL(req.url, 'http://localhost');
      if (requestUrl.pathname !== '/resume' && requestUrl.pathname !== '/resume/') {
        next();
        return;
      }

      res.statusCode = 301;
      res.setHeader('Location', RESUME_URL);
      res.end();
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      if (!req.url) {
        next();
        return;
      }

      const requestUrl = new URL(req.url, 'http://localhost');
      if (requestUrl.pathname !== '/resume' && requestUrl.pathname !== '/resume/') {
        next();
        return;
      }

      res.statusCode = 301;
      res.setHeader('Location', RESUME_URL);
      res.end();
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), resumeRedirectPlugin()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      buffer: 'buffer',
    },
  },
  define: {
    'process.env': {},
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});

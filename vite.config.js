import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Required to resolve paths

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map the `@` alias to the `src` folder
      '@': path.resolve(__dirname, './src'),
    },
  },
});

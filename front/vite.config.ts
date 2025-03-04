import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'

export default defineConfig({

  server: {
    host: true
  },

  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}', 'tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },

  plugins: [react()],
})

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({

  server: {
    host: true
  },

  test: {
    globals: true,       // グローバルに describe, it, expect などを有効化
    environment: 'jsdom', // DOM 環境を使用（jest-dom を利用するために必要）
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}', 'tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },

  plugins: [react()],
})

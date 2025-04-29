import react from '@vitejs/plugin-react'
import path from 'path'
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts', // Optional setup file
        css: true, // If you have CSS imports in components
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
}) 
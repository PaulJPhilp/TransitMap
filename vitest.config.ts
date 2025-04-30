import react from '@vitejs/plugin-react'
import path from 'node:path'
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        setupFiles: './vitest.setup.ts', // Optional setup file
        css: true, // If you have CSS imports in components
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
}) 
import { defineConfig } from 'vite';
import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [ vue() ],
    server: {
        port: 80
    },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, 'src')
            }
        ]
    },
    build: {
        chunkSizeWarningLimit: 600,
        cssCodeSplit: false
    }
})
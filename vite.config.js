import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        VitePWA({ 
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png', 'pwa-maskable-192x192.png', 'pwa-maskable-512x512.png'],
            manifest: {
                "name": "Arsip Kuliner",
                "short_name": "ArsipKul",
                "icons": [
                    {
                    "src": "/pwa-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "any"
                    },
                    {
                    "src": "/pwa-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "any"
                    },
                    {
                    "src": "/pwa-maskable-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "maskable"
                    },
                    {
                    "src": "/pwa-maskable-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "maskable"
                    }
                ],
                "start_url": "/build/",
                "display": "standalone",
                "lang": "en",
                "scope": "/build/",
                "background_color": "#FFFFFF",
                "theme_color": "#FFFFFF",
                "description": "Ensiklopedia Masakan Nusantara"
            },
         }),
    ],
    ssr: {
        noExternal: [
            'react-share',
            'lodash',
        ]
    },
});

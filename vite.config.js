import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig(({ mode }) => ({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      refresh: true,
    }),
    tailwindcss(),

    istanbul({
        include: 'resources/js/**/*.{js,ts,vue}',
        exclude: ['node_modules', 'tests/**', '**/*.spec.ts', '**/*.test.ts'],
        extension: ['.js', '.ts', '.vue', '.jsx', '.tsx'],
        requireEnv: true,
        checkProd: false,
    })
  ],
}));

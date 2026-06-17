import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig(({ mode }) => {
  const enableCoverage = process.env.NODE_ENV === 'test';

  return {
    plugins: [
      laravel({
        input: ['resources/css/app.css', 'resources/js/app.js'],
        refresh: true,
      }),
      tailwindcss(),

      enableCoverage && istanbul({
          include: 'resources/js/**/*.{js,ts,vue}',
          exclude: ['node_modules', 'tests/**', '**/*.spec.ts', '**/*.test.ts'],
          extension: ['.js', '.ts', '.vue', '.jsx', '.tsx'],
          requireEnv: false,
          checkProd: false,
      })
    ].filter(Boolean),
  }
});

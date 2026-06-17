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
        include: ['resources/js/**/*'],
        exclude: ['node_modules', 'tests/**'],
        extension: ['.js', '.ts', '.vue', '.jsx', '.tsx'],
        requireEnv: false,
        forceBuildInstrument: mode === 'test',
    })
  ],
}));

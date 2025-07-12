import { defineConfig } from 'electron-vite'
import angular from '@analogjs/vite-plugin-angular';
import { resolve } from 'path'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        external: ['sqlite3'],
        input: {
          index: resolve(__dirname, 'electron/main/main.ts')
        },
      }
    }
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          preload: resolve(__dirname, 'electron/main/preload.ts')
        }
      }
    }
  },
  renderer: {
    root: resolve(__dirname, 'src/'),
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/index.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@renderer': resolve(__dirname, 'src/'),
      },
    },
    plugins: [angular()],
  },
})
import fs from 'fs'
import path from 'path'

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8')
)
const appVersion = packageJson.version

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  experimental: {
    scanPageMeta: true
  },

  compatibilityDate: '2024-09-29',

  devServer: {
    host: '127.0.0.1',
    port: 1007
  },

  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vite-pwa/nuxt',
    'dayjs-nuxt',
    'nuxt-schema-org'
  ],

  runtimeConfig: {
    MONGODB_URL: process.env.MONGODB_URL,

    KUN_GALGAME_API: process.env.KUN_GALGAME_API,

    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,

    JWT_ISS: process.env.JWT_ISS,
    JWT_AUD: process.env.JWT_AUD,
    JWT_SECRET: process.env.JWT_SECRET,

    public: {
      KUN_GALGAME_URL: process.env.KUN_GALGAME_URL,
      KUN_VISUAL_NOVEL_VERSION: appVersion
    }
  },

  imports: {
    dirs: ['./composables', './utils', './store/**/*.ts']
  },

  site: {
    url: process.env.KUN_GALGAME_URL
  },

  // Frontend
  css: ['~/assets/css/index.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "~/assets/css/mixins.scss" as *;'
        }
      }
    },
    esbuild: {
      drop: ['console', 'debugger']
    }
  },

  eslint: {
    config: {
      stylistic: false
    }
  },

  icon: {
    fetchTimeout: 7777,
    provider: 'iconify',
    serverBundle: false
  },

  piniaPersistedstate: {
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict'
    }
  },

  i18n: {
    langDir: './language',
    locales: [
      {
        code: 'en-us',
        language: 'en-US',
        file: 'en.json'
      },
      {
        code: 'ja-jp',
        language: 'ja-JP',
        file: 'ja-JP.json'
      },
      {
        code: 'zh-cn',
        language: 'zh-CN',
        file: 'zh-CN.json'
      },
      {
        code: 'zh-tw',
        language: 'zh-TW',
        file: 'zh-TW.json'
      }
    ],
    baseUrl: process.env.KUN_GALGAME_URL,
    defaultLocale: 'en-us',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'kungalgame-language',
      redirectOn: 'root'
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__KUNGALGAME_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: 'kun-',
    classSuffix: '-mode',
    storageKey: 'kungalgame-color-mode'
  },

  // Backend
  pwa: {
    registerType: 'autoUpdate',
    // Disable pwa in development environment
    disable: process.env.NODE_ENV === 'development',
    manifest: {
      name: 'KUN Visual Novel',
      short_name: 'KunGal',
      theme_color: '#218bff',
      icons: [
        {
          src: 'pwa/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,png,webp,svg,ico}'],
      navigateFallback: null
    },
    client: {
      installPrompt: true
    }
  },

  nitro: {
    experimental: {
      websocket: true
    }
  }
})

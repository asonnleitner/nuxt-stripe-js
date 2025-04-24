import pkg from '../package.json'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '../src/module',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxthub/core',
    '@nuxt/ui-pro',
    '@nuxt/image',
    '@nuxt/fonts',
  ],

  css: [
    '~/assets/css/main.css',
  ],

  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'ts', 'typescript', 'diff', 'vue', 'json', 'yml', 'css', 'mdc'],
        },
      },
    },
  },
})

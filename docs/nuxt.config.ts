// https://nuxt.com/docs/api/configuration/nuxt-config
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
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/fonts',
  ],

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'ts', 'typescript', 'diff', 'vue', 'json', 'yml', 'css', 'mdc'],
        },
      },
    },
  },

  nitro: {
    prerender: {
      routes: [
        '/getting-started',
      ],
      crawlLinks: true,
      autoSubfolderIndex: false,
    },
    cloudflare: {
      pages: {
        routes: {
          exclude: [
            '/components/*',
            '/getting-started/*',
            '/composables/*',
          ],
        },
      },
    },
  },
})

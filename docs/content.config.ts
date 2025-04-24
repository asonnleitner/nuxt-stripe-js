import { resolve } from 'node:path'
import { defineCollection } from '@nuxt/content'

export const collections = {
  content: defineCollection({
    type: 'page',
    source: [
      { include: '**/*' },
      {
        cwd: resolve(__dirname, 'docs'),
        include: 'content/**',
        prefix: '/',
      },
    ].filter(Boolean),
  }),
}

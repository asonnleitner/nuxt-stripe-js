import antfu from '@antfu/eslint-config'
import { defineFlatConfigs } from '@nuxt/eslint-config/flat'

export default defineFlatConfigs(antfu({
  typescript: true,
  vue: true,
  jsonc: true,
  yaml: true,
  pnpm: true,
}))

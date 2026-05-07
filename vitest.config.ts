import { defineVitestConfig } from '@nuxt/test-utils/vitest'

export default defineVitestConfig({
  // Your Vitest config (e.g., environment, globals)
  test: {
    environment: 'nuxt',
    globals: true
  }
})

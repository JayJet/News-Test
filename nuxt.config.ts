// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    public: {
      MOSRU_URL: process.env.NUXT_PUBLIC_MOSRU_URL,
      LENTARU_URL: process.env.NUXT_PUBLIC_LENTARU_URL,
      SOURCES: process.env.NUXT_PUBLIC_SOURCES,
    }
  }
})

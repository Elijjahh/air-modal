// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['/assets/scss/main.scss'],
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@vueuse/nuxt'],
});

// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import customTheme from './app/theme/customTheme'

export default defineNuxtConfig({
  compatibilityDate: '2025-09-11',
  devtools: { enabled: true },
  css: [
     '~/assets/css/main.css',
     'primeicons/primeicons.css'
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    '@primevue/nuxt-module',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  primevue: {
    options: { theme: customTheme },
  },
})
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: "2025-09-27",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@primevue/nuxt-module", "@vueuse/nuxt"],
  primevue: {
    options: { theme: "aura" },
  },
})

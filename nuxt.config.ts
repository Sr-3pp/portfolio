// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["sr-content-2", "@vueuse/nuxt"],
  css: [
    "@/assets/scss/fonts/index.scss",
    "@/assets/scss/main.scss",
    "@/assets/scss/components/index.scss",
  ],
  components: {
    global: true,
    dirs: ["~/components"],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "sr-content-2/assets/scss/utilities/index.scss";
            @import "sr-content-2/assets/scss/main.scss";
            @import "~/assets/scss/functions/index.scss";
            @import "~/assets/scss/tokens.scss";
          `,
        },
      },
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
});

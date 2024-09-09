// https://nuxt.com/docs/api/configuration/nuxt-config
const cachePolicy = "public,max-age=31536000,s-maxage=31536000";

const mailConfig =
  process.env.NODE_ENV != "production"
    ? {
        host: "smtp.mailtrap.io",
        port: 587,
        auth: {
          user: process.env.TRAP_USER,
          pass: process.env.TRAP_PASS,
        },
      }
    : {
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      };

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  runtimeConfig: {
    mailConfig: {
      to: process.env.MAIL_CONTACT,
    },
  },
  modules: [
    "sr-content-2",
    "@vueuse/nuxt",
    "@nuxtjs/robots",
    [
      "nuxt-mail",
      {
        message: {
          to: process.env.MAIL_CONTACT,
        },
        smtp: mailConfig,
      },
    ],
  ],
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
            @import "~/assets/scss/transitions.scss";
            @import "~/assets/scss/tokens.scss";
          `,
        },
      },
    },
  },
  generate: {
    fallback: true,
  },
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
    routeRules: {
      "/img/**": {
        headers: {
          "cache-control": cachePolicy,
        },
      },
      "/gsap/**": {
        headers: {
          "cache-control": cachePolicy,
        },
      },
      "/portfolio/**": {
        headers: {
          "cache-control": cachePolicy,
        },
      },
      "/_nuxt/**": {
        headers: {
          "cache-control": cachePolicy,
        },
      },
    },
  },
});

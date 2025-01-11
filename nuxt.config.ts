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
  devtools: { enabled: true },

  runtimeConfig: {
    mailConfig: {
      to: process.env.MAIL_CONTACT,
    },
  },

  generate: {
    routes: ["/"],
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
    "~/assets/scss/main.scss",
    "~/assets/scss/components/sr-modal.scss",
    "~/assets/scss/components/sr-text.scss",
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
            @use "sr-content-2/assets/scss/utilities/index.scss" as *;
            @use "sr-content-2/assets/scss/main.scss" as *;
            @use "~/assets/scss/functions/unit.scss" as *;
            @use "~/assets/scss/tokens.scss" as *;
            @use "~/assets/scss/transitions.scss" as *;
          `,
        },
      },
    },
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: false,
    },
    routeRules: {
      "/img/**": {
        headers: {
          "cache-control": cachePolicy,
        },
      },
      "/**": {
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

  compatibilityDate: "2024-12-26",
});
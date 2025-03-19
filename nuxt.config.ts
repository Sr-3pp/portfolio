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
    public: {
      mailConfig: {
        to: process.env.MAIL_CONTACT,
      },
      mailtrap: {
        host: "smtp.mailtrap.io",
        port: 587,
        auth: {
          user: process.env.TRAP_USER,
          pass: process.env.TRAP_PASS,
        },
      },
      mailHelperJWTSecret: process.env.MAIL_HELPER_JWT_SECRET, 
      apps: [
        {
          name: 'alton-alvarez-construction',
          token: process.env.AAC_TOKEN,
          to: process.env.AAC_TO,
          smtp: process.env.AAC_SMTP,
          port: process.env.AAC_PORT,
          secure: process.env.AAC_SECURE,
          user: process.env.AAC_USER,
          pass: process.env.AAC_PASS,
        },
        {
          name: 'all-american-finishing',
          token: process.env.AAF_TOKEN,
          to: process.env.AAF_TO,
          smtp: process.env.AAF_SMTP,
          port: process.env.AAF_PORT,
          secure: process.env.AAF_SECURE,
          user: process.env.AAF_USER,
          pass: process.env.AAF_PASS,
        }
      ]
    }
  },

  modules: ["@vueuse/nuxt", "@nuxtjs/robots", [
    "nuxt-mail",
    {
      message: {
        to: process.env.MAIL_CONTACT,
      },
      smtp: mailConfig,
    },
  ], "@nuxt/image", "@nuxt/content", "@nuxtjs/i18n", "nuxt-nodemailer"],

  i18n: {
    defaultLocale: "en",  
    compilation: {
      strictMessage: false,
    },
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        file: 'en.json',
      },
      {
        code: 'es',
        name: 'Español',
        iso: 'es-MX',
        file: 'es.json',
      },
    ],
    lazy: true,
  },

  css: [
    "~/assets/scss/main.scss",
    "~/assets/scss/components/sr-text.scss",
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
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
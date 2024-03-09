// https://nuxt.com/docs/api/configuration/nuxt-config
import viteCompression from "vite-plugin-compression";

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
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "sr-content-2",
    "@vueuse/nuxt",
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
    plugins: [
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip", // ['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
        ext: ".gz",
        deleteOriginFile: false,
      }),
    ],
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
      "/_nuxt/**": {
        headers: {
          "cache-control": cachePolicy,
        },
      },
    },
  },
});

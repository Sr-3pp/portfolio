<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { Analytics } from '@vercel/analytics/nuxt'
import { cv } from "@/content/cv/index.json";
import { social } from "@/content/about.json";
const resumeModal = ref();

const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});

const printResume = () => {
  window.print();
};
</script>

<template lang="pug">
SpeedInsights
Analytics
Header(@resume="resumeModal.toggle()")
Transition(name="fade")
  Loader(v-if="loading")
  .main(v-else)
    NuxtPage

SrModal.resume.printable(ref="resumeModal")
  template(#close)
    SrIcon(name="close")
  template(#header)
    ClientOnly
      button.print-button(@click="printResume()")
        SrIcon(name="print")
    .cv-label
      SrText(:text="cv.name" class="title")
      small {{ cv.birth }} 
    div.cv-subtitle-container
      SrText(:text="$t(cv.position)")
      a.social-container(:href="'mailto:' + cv.social.mail")
        SrIcon(name="email")
        SrText(:text="cv.social.email")
      a.social-container(:href="cv.social.web")
        SrIcon(name="web")
        SrText(:text="cv.social.web")
  template(#body)
    Resume(:cv="cv")
Footer(:socialItems="social")
</template>

<style lang="scss">
.main {
  color: $color-vue-text;
}

.resume {
  &.sr-modal {
    padding: unit(20);

    .sr-text {
      &.title {
        .sr-text-container {
          font-size: unit(22) !important;
        }
      }
      &.subtitle {
        .sr-text-container {
          font-size: unit(18) !important;
        }
      }
    }
  }
  .sr-modal {
    &-header {
      margin-top: unit(20);
      padding: unit(20);
      border-bottom: {
        style: solid;
        width: unit(1);
        color: $color-vue-bg;
      }

      .sr-icon {
        width: unit(14);
        height: unit(14);

        @media (min-width: $breakpoint-sm) {
          width: unit(20);
          height: unit(20);
        }
      }
      .social-container{
        display: flex;
        align-items: center;
        gap: unit(10);
        font-size: unit(12);
      }
    }
    &-body {
      max-height: 60lvh;
    }
    &-close {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      .sr-icon {
        width: unit(20);
        height: unit(20);
        flex-shrink: 0;
      }
    }
  }

  .print-button {
    position: absolute;
    top: 0;
    right: unit(80);
    background-color: $color-cta-bg;
    padding: unit(4) unit(10);
    color: $color-white;
    border: none;
    border-bottom-left-radius: unit(8);
    border-bottom-right-radius: unit(8);

    .sr-icon {
      width: unit(20);
      height: unit(20);
    }
  }
}
</style>

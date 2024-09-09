<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { cv } from "@/content/cv/index.json";
import { social } from "@/content/about.json";
const resumeSw = ref(false);

const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
  console.log("loading");
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
  console.log("finished");
});

const printResume = () => {
  window.print();
};
</script>

<template lang="pug">
SpeedInsights
Header(@resume="resumeSw = true")
Transition(name="fade")
  Loader(v-if="loading")
  .main(v-else)
    NuxtPage

SrModal.resume.printable(:active="resumeSw" @close="resumeSw = false")
  template(#close)
    SrIcon(name="close")
  template(#header)
    .sr-modal-header
      ClientOnly
        button.print-button(@click="printResume()")
          SrIcon(name="print")
      .cv-label
        SrText(:text="cv.name" class="title")
        small {{ cv.birth }} 
      div.cv-subtitle-container
        SrText(:text="$t(cv.position)")
  template(#body)
    .sr-modal-body
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

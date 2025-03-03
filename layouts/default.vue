<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { Analytics } from '@vercel/analytics/nuxt'
const resumeModal = ref();
const certModal = ref();

const { data } = await useAsyncData('home',() => {
  const cv = queryContent('_cv').findOne();
  const about = queryContent('about').findOne();

  return Promise.all([cv, about]);
})

const [cv, about]: any = data.value;

const { social } = about;

const printResume = () => {
  window.print();
};

provide('cv', cv);
provide('about', about)

</script>

<template lang="pug">
SpeedInsights
Analytics
Header(@resume="resumeModal.toggle()" @certificates="certModal.toggle()")
.main()
  NuxtPage

SrModal.certificates(ref="certModal")
  template(#close)
    SrIcon(name="close")
  template(#header)
    h2 Certificates
  template(#body)
    Certificates

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
  &.dialog {

    .text {
      &.title {
        .text-container {
          font-size: unit(22) !important;
        }
      }
      &.subtitle {
        .text-container {
          font-size: unit(18) !important;
        }
      }
    }
  }

  .dialog {
    &-header {
      padding: unit(20);
      padding-top: unit(40)!important;
      border-bottom: {
        style: solid;
        width: unit(1);
        color: $color-vue-bg;
      }

      .icon {
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

    .icon {
      width: unit(20);
      height: unit(20);
    }
  }
}
</style>

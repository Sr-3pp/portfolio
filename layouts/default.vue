<script setup lang="ts">
import { cv } from "@/content/cv/index.json";
const resumeSw = ref(false);

const printResume = () => {
  window.print();
};
</script>

<template lang="pug">
Header(@resume="resumeSw = true")
.main 
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
        SocialList(:items="cv.social")
  template(#body)
    .sr-modal-body
      Resume(:cv="cv")
Footer
</template>

<style lang="scss">
.main {
  background: $bg-linear-vue-dark;
  color: $color-vue-text;
}

.resume {
  .sr-modal {
    &-header {
      margin-top: unit(20);
      padding: unit(20);
      border-bottom: {
        style: solid;
        width: unit(1);
        color: $color-vue-bg;
      }
    }
    &-close {
      display: flex;
      align-items: center;
      justify-content: center;
      .sr-icon {
        width: unit(20);
        height: unit(20);
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

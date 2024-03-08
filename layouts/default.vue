<script setup lang="ts">
import { cv } from "@/content/cv/index.json";
const resumeSw = ref(false);
</script>

<template lang="pug">
Header(@resume="resumeSw = true")
.main 
  NuxtPage

SrModal(:active="resumeSw" @close="resumeSw = false")
  template(#body)
    .sr-modal-body
      Resume(:cv="cv")
Footer
</template>

<style lang="scss">
.main {
  background: linear-gradient(
    180deg,
    rgba($color-vue-bg, 1) 0%,
    rgba($color-vue-secondary, 1) 100%
  );
  color: $color-vue-text;
}
</style>

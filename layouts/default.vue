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
  background: $bg-linear-vue-dark;
  color: $color-vue-text;
}
</style>

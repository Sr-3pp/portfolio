<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "Sr.3pp | Welcome",
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        "Welcome to my profesional portfolio, you can find my resume, projects and contact information here.",
    },
  ],
});
</script>

<template lang="pug">
.content
</template>

<style lang="scss">
.content {
  background-color: $color-white;
  position: relative;
  z-index: 1;
}
</style>

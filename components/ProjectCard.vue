<template lang="pug">
article.project-card(:style="{background: meta.background || 'transparent', color: meta.color || 'currentColor'}")
  h2 {{ name }}
  figure.picture
    NuxtImg(:src="meta.thumb" :alt="name" width="250")
  SrText.description(:text="$t(description)")
  span {{ period.join(' | ') }}
  SrLink(:href="link" target="_blank") Visit
</template>

<script setup lang="ts">
defineProps({
  meta: {
    type: Object,
    default: () => ({}),
  },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  period: {
    type: Array,
    default: () => [],
  },
  link: {
    type: String,
    default: "",
  }
});
</script>

<style lang="scss">
.project-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      padding: unit(20);
      gap: unit(30);
      overflow: hidden;
      opacity: .6;
      flex-grow: 1;
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, z-index 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-radius 0.3s ease-in-out;

      &:hover{
        opacity: 1;
        transform: scale(1.05);
        z-index: 9;
        box-shadow: 0 0 unit(60) rgba($color-vue, 0.8);
        border-radius: unit(16);
        border: {
          style: solid;
          width: unit(5);
          color: $color-vue;
        }
      }

      .picture{
        margin-top: auto;
        margin-bottom: auto;
      }

      .sr-link{
        min-width: 40%;
      }
    }
</style>

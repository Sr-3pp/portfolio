<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String,
    default: "_self",
  },
});
</script>

<template lang="pug">
NuxtLink.sr-link(:to="href" :target="target")
    SrIcon.sr-link-icon(:name="icon" v-if="icon")
    span.sr-link-label {{ label }}
    slot
</template>

<style lang="scss">
.sr-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: unit(8) unit(20);
  background-color: rgba($color-vue-bg, 0.8);
  backdrop-filter: blur(unit(8));
  color: $color-vue-text;
  font-size: unit(14);
  font-weight: bold;
  border: {
    style: solid;
    color: $color-vue;
    width: unit(2);
    radius: unit(60);
  }
  max-width: unit(220);
  min-height: unit(50);
  transition: background-color 0.35s ease, box-shadow 0.35s ease;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 unit(16) rgba($color-vue, 0);
    }
    50% {
      box-shadow: 0 0 unit(20) rgba($color-vue, 0.8);
    }
    100% {
      box-shadow: 0 0 unit(16) rgba($color-vue, 0);
    }
  }

  &:hover {
    background-color: rgba($color-vue-hover, 0.8);
    animation: pulse 1.5s infinite;
  }

  &-icon {
    width: unit(18);
    height: unit(18);
    margin-right: unit(10);
  }
}
</style>

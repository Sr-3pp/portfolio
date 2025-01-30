<script setup lang="ts">
defineProps({
  socialItems: {
    type: Array,
    default: () => [],
  },
});
</script>

<template lang="pug">
footer.footer
    SrContainer(:with-padding="true")
      ul.social-list
        li(v-for="(item, i) in socialItems" :key="i")
          NuxtLink(:to="item.link" target="_blank") {{ item.name }}
      SrText(text="Sr3pp | Fullstack Developer")
</template>

<style lang="scss">
.footer {
  background-color: #101324;
  color: $color-white;

  .social-list {
    display: flex;
    justify-content: center;
    margin-bottom: unit(20);

    a {
      color: $color-white;
      text-decoration: none;
      padding: unit(20) unit(10);
      &:hover {
        text-decoration: underline;
      }
    }

    li {
      &:not(:last-child) {
        margin-right: unit(20);
      }
    }
  }

  .text {
    text-align: center;
  }
}
</style>

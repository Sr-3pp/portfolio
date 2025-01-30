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
    flex-wrap: wrap;
    justify-content: center;
    gap: unit(20);
    margin-bottom: unit(20);
    margin-right: unit(40);
    margin-left: unit(40);

    a {
      color: $color-white;
      text-decoration: none;
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

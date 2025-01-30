<template lang="pug">
ul.social-list
    template(v-for="([key, value], i) in Object.entries(props.items)")
        li.social-list-item(:key="i" v-if="value")
            SrIcon(:name="key")
            NuxtLink(:to="getUrl(key, value)" target="_blank") {{ value }}

</template>

<script setup lang="ts">
const props = defineProps({
  items: {
    type: Object,
    default: () => ({}),
  },
});

const getUrl = (key: string, value: string) => {
  if (key == "linkedin") {
    return `https://linkedin.com/in/${value}`;
  } else if (key == "facebook") {
    return `https://facebook.com/${value}`;
  } else if (key == "x") {
    return `https://x.com/${value}`;
  } else if (key == "email") {
    return `mailto:${value}`;
  } else if (key == "web") {
    return value;
  }
};
</script>

<style lang="scss">
.social-list {
  display: flex;
  flex-wrap: wrap;

  &-item {
    display: flex;
    padding: unit(5);

    &:not(:last-child) {
      margin-right: unit(20);
    }

    .icon {
      width: unit(30);
      height: unit(30);
      margin-right: unit(4);
    }
  }
}
</style>

<script lang="ts" setup>
defineProps({
  thumb: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<template lang="pug">
.hobby-card
  figure.picture
    NuxtImg.hobby-card-picture(:src="`/img/${thumb}`")
  SrText.hobby-card-title(:text="$t(description)" style="--text-align: center;")
</template>

<style scoped lang="scss">
.hobby-card {
  position: relative;
  border-radius: unit(9999);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .picture {
    width: 100%;
    height: 100%;
    border-radius: unit(9999);
    overflow: hidden;
    aspect-ratio: 1;
    background-color: $color-vue-bg;
    border: {
      style: solid;
      width: unit(5);
      color: $color-vue;
    }

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-title {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;
    transform: translateY(-50%);
    width: 100%;
    height: 100%;
    color: $color-white;
    background: rgba($color-black, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    --text-size: #{unit(22)};

    @media (min-width: $breakpoint-sm) {
      --text-size: #{unit(28)};
    }
  }
}
</style>

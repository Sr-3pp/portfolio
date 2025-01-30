<script lang="ts" setup></script>

<template lang="pug">
.loader
  SrContainer(:with-padding="true")
    .loader-spiner
    SrText(text="Loading...")
</template>

<style lang="scss" scoped>
.loader {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100lvh;
  width: 100vw;
  background: $bg-linear-vue-dark;
  color: $color-vue-text;

  .text {
    font-weight: 700;
    --text-align: center;
  }

  .sr-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &-spiner {
    margin-left: auto;
    margin-right: auto;
    width: unit(48);
    height: unit(48);
    border: unit(3) solid $color-vue-text;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    margin-bottom: unit(20);
    animation: rotation 1s linear infinite;

    &::after {
      content: "";
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: unit(40);
      height: unit(40);
      border-radius: 50%;
      border: unit(3) solid;
      border-color: $color-vue transparent;
    }

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>

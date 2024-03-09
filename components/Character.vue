<script setup lang="ts">
defineProps({
  small: {
    type: Boolean,
    default: false,
  },
});
</script>

<template lang="pug">
.character
  figure.character-picture(ref="character")
    img(src="/img/3pp.webp" alt="character")
    SrText(text="Sr.3pp" style="--text-align: center;")
</template>

<style lang="scss" scoped>
.character {
  --portal-radius: 50%;
  width: 100%;
  &-picture {
    --image-position: 50% 0px;
    width: 100%;
    margin: 0;
    display: flex;
    position: relative;
    flex-shrink: 0;
    overflow: visible;

    &::after {
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      padding-bottom: 100%;
      backdrop-filter: blur(unit(8));
      opacity: 0.8;
      transform: skewZ(-10deg);
      background: radial-gradient(
        circle at unit(200) unit(20),
        rgba($color-vue-active, 0.5) 0%,
        rgba($color-vue-bg, 0.5) 50%
      );
      background-repeat: no-repeat;
      box-shadow: 0 0 unit(16) rgba($color-vue, 0.6);
      border-radius: var(--portal-radius);
      outline: unit(8) solid rgba($color-vue, 1);
      outline-offset: unit(2);
      border: {
        style: solid;
        width: unit(5);
        color: rgba($color-vue-active, 0.5);
      }
      filter: blur(unit(1.5));
      animation: glowBorder 4s infinite;
    }

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%) scale(0.9);
      border-radius: var(--portal-radius);
      filter: blur(unit(20));
      outline: unit(50) solid rgba($color-vue-active, 1);
      outline-offset: unit(40);
      border: {
        style: solid;
        width: unit(50);
        color: rgba($color-vue, 1);
      }
      animation: scaleCircle 2s ease-in infinite;
      background: rgba($color-vue-hover, 0.3);

      @keyframes scaleCircle {
        0% {
          opacity: 0;
          outline: unit(60) solid rgba($color-vue, 0);
          outline-offset: unit(40);
          transform: translate(-50%, -50%) scale(0.9);
        }
        100% {
          opacity: 1;
          outline: unit(50) solid rgba($color-vue-active, 1);
          outline-offset: unit(100);
          transform: translate(-50%, -50%) scale(0);
        }
      }
    }

    img {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-bottom-left-radius: var(--portal-radius);
      border-bottom-right-radius: var(--portal-radius);
      object-position: var(--image-position);
      transition: object-position 0.35s ease;
    }

    .sr-text {
      opacity: 0.8;
      mix-blend-mode: hue;
      position: absolute;
      top: 35%;
      left: unit(20);
      transform: translate(0%, -50%);
      padding: unit(10) unit(20);
      border-radius: unit(10);
      font-size: unit(65);
      z-index: 0;
      transition: top 0.35s ease;
    }

    @keyframes glowBorder {
      0% {
        box-shadow: 0 0 unit(16) rgba($color-vue, 0.6);
      }
      50% {
        box-shadow: 0 0 unit(50) rgba($color-vue, 1);
      }
      100% {
        box-shadow: 0 0 unit(16) rgba($color-vue, 0.6);
      }
    }
  }
}
</style>

<script lang="ts" setup></script>

<template lang="pug">
.contact
  SrContainer(:with-padding="true")
    SrText(text="Lets work together" tag="h1" class="title" style="--text-align: center;")
    SrGrid
      SrGridColumn(:size="{mobile: '1', sm: '1/2'}")
        SrPicture.pixel(src="/img/pixel.png" alt="Pixel")
      SrGridColumn(:size="{mobile: '1', sm: '1/2'}" style="--justify-content: center;")
        ContactForm
</template>

<style lang="scss">
.contact {
  .sr-text {
    &.title {
      margin-bottom: unit(30);
    }
  }
  .pixel.sr-picture {
    overflow: visible;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba($color-vue-active, 0.5);
      border-radius: unit(9999);
      filter: blur(unit(10));
      z-index: 0;
      animation: glowBorder 3s ease-in infinite;
      outline: unit(8) solid rgba($color-vue, 1);
      outline-offset: unit(20);

      @keyframes glowBorder {
        0% {
          opacity: 0.2;
        }
        50% {
          opacity: 0.9;
        }
        100% {
          opacity: 0.2;
        }
      }
    }
    img {
      position: relative;
      z-index: 1;
      mix-blend-mode: lighten;
    }
  }
  &-form {
    max-width: unit(400);
    margin: auto;
  }
}
</style>

<script lang="ts" setup>
const sent = ref(false);

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "Sr.3pp | Contact me",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "Lets work together, contact me here.",
    },
  ],
});
</script>

<template lang="pug">
.contact
  SrContainer(:with-padding="true")
    SrText(text="Lets work together" tag="h1" class="title" style="--text-align: center;")
    SrGrid(:style="`--justify-content: center;`")
      SrGridColumn(:size="{mobile: '1', sm: '1/2'}")
        figure.pixel
          NuxtImg(src="/img/pixel.webp" :class="{sent: sent}" alt="Pixel")
        Transition(name="fade")
          SrText.contact-form-message(v-if="sent" text="Thanks!\n I will reply as soon as posible." style="--text-align: center;")
      Transition(name="shrink")
        SrGridColumn(v-if="!sent" :size="{mobile: '1', sm: '1/2'}" style="--justify-content: center;")
          ClientOnly
            ContactForm(@sent="sent = true")
</template>

<style lang="scss">
.contact {
  display: flex;
  min-height: var(--section-min-height, 80vh);
  .text {
    &.title {
      text-align: center;
      margin-bottom: unit(50);
    }
  }

  .sr-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pixel {
    overflow: visible;
    margin: auto;
    position: relative;
    width: 100%;

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
      width: 100%;
      opacity: 1;
      position: relative;
      z-index: 1;
      mix-blend-mode: lighten;
      transition: all 0.35s ease;
      transition-delay: 0.5s;
    }

    &.sent {
      img {
        opacity: 0;
      }
    }
  }
  &-form {
    max-width: unit(400);
    margin: auto;

    &-message {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: bold;
      font-size: unit(30);
    }
  }

  .grid {
    transition: all 0.5s ease;

    flex-direction: column-reverse;

    @media (min-width: $breakpoint-sm) {
      flex-direction: row;
    }
  }
}
</style>

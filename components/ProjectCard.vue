<template lang="pug">
.project-card
    SrPicture(:src="thumb")
    SrText.project-card-name(:text="name" tag="h2" style="--text-align: center;")
    .project-card-badge(v-if="isVue")
        span.project-card-badge-ribbon
        SrIcon(name="vue")
</template>

<script setup lang="ts">
defineProps({
  isVue: {
    type: Boolean,
    default: false,
  },
  thumb: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  technologies: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss">
.project-card {
  --ribbon-bg: linear-gradient(
    0deg,
    #{$color-vue} 50%,
    #{$color-vue-secondary} 50%
  );
  position: relative;
  display: flex;
  transition: transform 0.35s ease;

  .sr-picture {
    width: 100%;
    height: 100%;
    opacity: 0.3;
    border-radius: unit(9999);
    border: {
      style: solid;
      width: unit(5);
      color: $color-vue;
    }
    box-shadow: 0 0 unit(30) rgba($color-vue, 0.5);
    margin: 0;
    justify-content: center;
    align-items: center;
    transition: opacity 0.35s ease;
    img {
      filter: blur(unit(1));
      height: 100%;
      object-fit: contain;
      transition: filter 0.35s ease;
    }
  }

  &:hover {
    transform: scale(1.05);
    .sr-picture {
      opacity: 1;
      img {
        filter: blur(0);
      }
    }
    .project-card-name {
      opacity: 0;
    }
  }

  &-name {
    position: absolute;
    z-index: 3;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.35s ease;
  }

  &-content {
    padding: unit(20);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color-black, 0.8);
    backdrop-filter: blur(unit(2));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    z-index: -1;
    transition: opacity 0.35s ease;

    > * {
      &:not(:last-child) {
        margin-bottom: unit(20);
      }
    }
  }

  &-badge {
    position: absolute;
    width: 100%;
    top: 85%;
    left: 0;
    transform: translateY(-50%);
    z-index: 1;

    &-ribbon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      height: unit(20);
      display: flex;
      height: unit(20);
      background: var(--ribbon-bg);
      box-shadow: 0 unit(-4) unit(16) rgba($color-black, 0.5);

      &::before,
      &::after {
        content: "";
        width: unit(30);
        height: 100%;
        background: var(--ribbon-bg);

        /* position ribbon ends behind and slightly lower */
        position: absolute;
        z-index: -1;
        top: 60%;
        transform: translateY(-50%);

        /* clip ribbon end shape */
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 25% 50%);
      }

      &::before {
        left: unit(-30);
      }

      &::after {
        right: unit(-30);
        transform: translateY(-50%) scaleX(-1); /* flip horizontally */
      }
    }

    .sr-icon {
      position: relative;
      z-index: 2;
      width: unit(50);
      height: unit(50);
      margin: auto;
    }
  }

  &:hover {
    .project-card-content {
      opacity: 1;
      z-index: 2;
    }
  }

  .action-button {
    text-decoration: none;
    background-color: blue;
    color: $color-white;
    border-radius: unit(100);
    padding: unit(8) unit(20);
  }

  &-techs {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &-tech {
    width: 10%;
    max-width: unit(100);
    padding: unit(10);
  }
}
</style>

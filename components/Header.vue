<script setup lang="ts">
const route = useRoute();

const emit = defineEmits(["resume", "toggleSize"]);

const small = computed(() => {
  return !(route.name as string).includes('index') ? true : false;
});
</script>

<template lang="pug">
.header(:class="{small: small}")
    SrContainer(:with-padding="!small")
        SrGrid
            SrGridColumn(:size="{mobile: '1', sm: '2/5', md: '1/2'}" class="items-center justify-center")
              NuxtLink(to="/" style="width: 100%")
                Character(:small="small")
            SrGridColumn(:size="{mobile: '1', sm: '3/5',md: '1/2'}" class="column justify-center info")
                Typewriter(text="Martin Ruiz" class="title")
                div.highlights
                  ClientOnly
                    SlotMachine(:labels="[$t('vue_expert'), $t('bug_hunter')]")
                ul.action-box
                  li
                    SrLink(icon="vue" label="View Certificate" href="https://certificates.dev/c/9b634cb0-c51e-4c5d-9b31-192abb29d36a" target="_blank")
                  li
                    SrLink(icon="projects" label="My Work" href="/projects")
                  li  
                    SrLink(icon="man" label="Who am I?" href="/about")
                  li  
                    SrLink(icon="email" label="Contact me" href="/contact")
                  li
                    SrButton(icon="cv" label="Download Resume" @click="$emit('resume')")
    Stars

</template>

<style lang="scss">
.header {
  overflow: hidden;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: unit(40);
  background: linear-gradient(
    90deg,
    rgba($color-vue-bg, 1) 50%,
    rgba($color-vue-active, 1) 100%
  );
  background-color: transparent;
  transition: height 0.35s ease;

  height: 100lvh;

  @media (min-width: $breakpoint-sm) {
    padding-top: 0;
  }

  &.small {
    position: sticky;
    top: 0;
    height: unit(150);
    padding-bottom: unit(60);

    @media (min-width: $breakpoint-sm) {
      height: unit(100);
      padding-bottom: 0;
    }

    .info {
      .typewritter,
      .highlights {
        display: none;
      }

      .sr-link,
      .cta {
        &-label {
          display: none;
        }
        &-icon {
          margin-right: 0;
        }

        &.router-link-active {
          background-color: rgba($color-vue-active, 0.8);
          animation: pulse 1.5s infinite;
        }
      }
    }

    .character {
      &-picture {
        --image-position: 0 #{unit(60)};

        @media (min-width: $breakpoint-sm) {
          --image-position: 0 #{unit(-40)};
        }
        @media (min-width: $breakpoint-md) {
          --image-position: 0 #{unit(-110)};
        }
        &::before {
          animation: none;
          outline-offset: 0;
          opacity: 0.3;
        }
      }
      .text {
        top: 50%;
      }
    }

    @keyframes smallize {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.5);
      }
    }

    .action-box {
      flex-direction: row;
      justify-content: space-around;

      background-color: rgba($color-vue-active, 0.8);
      position: fixed;
      top: unit(100);
      left: 0;
      width: 100vw;
      overflow-x: auto;
      flex-wrap: nowrap;
      z-index: 2;
      @media (min-width: $breakpoint-sm) {
        flex-wrap: wrap;
        max-width: initial;
        width: 100%;
        background-color: transparent;
        position: static;
        margin-bottom: auto;
        margin-top: unit(35);
      }
    }
  }

  .character {
    max-width: unit(400);
    margin-right: auto;
    margin-left: auto;

    @media (min-width: $breakpoint-sm) {
      max-width: initial;
    }
  }

  .container {
    position: relative;
    z-index: 1;
  }

  ul.grid {
    flex-grow: 0;
  }

  .grid {
    .justify-center {
      justify-content: center;
    }

    .items-center {
      align-items: center;
    }

    @media (min-width: $breakpoint-sm) {
      .grid-column {
        padding: 0
      }
    }
  }

  .text {
    color: $color-white;

    &:not(:last-child) {
      margin-bottom: unit(20);
    }

    &.title,
    &.subtitle {
      text-shadow: rgba($color-black, 0.8) 0 0 unit(16);
    }
  }

  .action-box {
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    gap: unit(20);
    .sr-link,
    .cta {
      max-width: inherit;
    }

    @media (min-width: $breakpoint-sm) {
      flex-wrap: nowrap;
      flex-direction: column;
    }
  }

  .highlights {
    display: flex;
    gap: unit(20);
    justify-content: center;
    margin-top: unit(10);
    margin-bottom: unit(20);
  }
}
</style>

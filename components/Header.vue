<script setup lang="ts">
const { y } = useWindowScroll();
const route = useRoute();

const emit = defineEmits(["resume", "toggleSize"]);
const scrolled = ref(false);

const small = computed(() => {
  return route.name !== "index" ? true : scrolled.value;
});

watch(y, (e: number) => {
  if (e > 1 && !scrolled.value) {
    scrolled.value = true;
  } else if (e == 0 && scrolled.value) {
    scrolled.value = false;
  }
});
</script>

<template lang="pug">
.header(:class="{small: small}")
    SrContainer(:with-padding="true")
        SrGrid
            SrGridColumn(:size="{mobile: '1', sm: '1/2'}" class="items-center justify-center")
              NuxtLink(to="/" style="width: 100%")
                Character(:small=" small")
            SrGridColumn(:size="{mobile: '1', sm: '1/2'}" class="column justify-center info")
                Typewriter(text="Martin Ruiz" class="title")
                SrText(:text="$t('vue_expert')" class="subtitle" style="--text-align: center;")
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
  z-index: 3;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba($color-vue-bg, 1) 50%,
    rgba($color-vue-active, 1) 100%
  );
  background-color: transparent;
  transition: height 0.35s ease;

  &.small {
    position: sticky;
    top: 0;
    height: unit(100);

    .info {
      .typewritter,
      > .sr-text {
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
        --image-position: 50% #{unit(110)};
        &::before {
          animation: none;
          outline-offset: 0;
          opacity: 0.3;
        }
      }
      .sr-text {
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
    }
  }

  .sr-container {
    position: relative;
    z-index: 1;
  }

  ul.sr-grid {
    flex-grow: 0;
  }

  .sr-grid {
    .justify-center {
      justify-content: center;
    }

    .items-center {
      align-items: center;
    }
  }

  .sr-text {
    color: $color-white;

    &:not(:last-child) {
      margin-bottom: unit(20);
    }

    &.kind {
      &-title,
      &-subtitle {
        text-shadow: rgba($color-black, 0.8) 0 0 unit(16);
      }
    }
  }

  .tech-item {
    color: $color-black;
    width: unit(100);
    height: unit(100);
    margin: unit(8);

    .sr-picture {
      margin-right: auto;
      margin-left: auto;
      margin-bottom: unit(10);
      width: unit(50);
      height: unit(50);

      img {
        object-fit: contain;
      }
    }
  }

  .action-box {
    max-width: unit(350);
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: unit(20);
    .sr-link,
    .cta {
      max-width: inherit;
    }
  }
}
</style>

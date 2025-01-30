<script setup>
import { ref } from 'vue'

defineProps({
  'with-padding': Boolean,
})

const count = ref(0)
</script>

<template>
  <section class="container" :class="{'no-padding': !withPadding}">
    <slot />
  </section>
</template>

<style scoped>
.container{
  --padding: 1.87rem;
  --padding-sm: 1.87rem;
  --padding-md: 2.5rem;
  --padding-lg: 3rem;

  --limit: 100%;
  --limit-sm: 43.125rem;
  --limit-md: 60rem;
  --limit-lg: 68.75rem;
  --limit-xl: 115rem;


  padding-top: var(--padding);
  padding-bottom: var(--padding);

  padding-left: var(--border-gap, 1.25rem);
  padding-right: var(--border-gap, 1.25rem);

  width: 100%;

  @media (min-width: 46.5rem) {
    padding-top: var(--padding-sm, var(--padding));
    padding-bottom: var(--padding-sm, var(--padding));
    padding-left: var(--border-gap);
    padding-right: var(--border-gap);
    max-width: var(--limit-sm);
    margin: auto;
  };

  @media (min-width: 64rem) {
    padding-top: var(--padding-md, var(--padding-sm));
    padding-bottom: var(--padding-md, var(--padding-sm));
    max-width: var(--limit-md);
  }
  
  @media (min-width: 85.37rem) {
    padding-top: var(--padding-lg, var(--padding-md));
    padding-bottom: var(--padding-lg, var(--padding-md));
    max-width: var(--limit-lg);
  }
  
  @media (min-width: 120rem) {
    padding-top: var(--padding-xl, var(--padding-lg));
    padding-bottom: var(--padding-xl, var(--padding-lg));
    max-width: var(--limit-xl);
  }

  &.no-padding {
    padding: 0!important;
  }
}
</style>

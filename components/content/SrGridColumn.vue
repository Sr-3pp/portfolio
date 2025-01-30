<script setup>
const props = defineProps({
  size: {
    type: Object,
    default: {
      mobile: "1"
    }
  },
  tag: {
    type: String,
    default: 'div'
  }
})

const column = ref(null)

const sizes = {
  xs: props.size.mobile || "100%",
  sm: props.size.sm || props.size.mobile,
  md: props.size.md || props.size.sm || props.size.mobile,
  lg: props.size.lg || props.size.md || props.size.sm || props.size.mobile,
  xl: props.size.xl || props.size.lg || props.size.md || props.size.sm || props.size.mobile
}

const columnSizes = computed(() => {
  const colSizes = {}
  Object.entries(sizes).forEach(([key, size]) => {
    colSizes[`--col-width${key == 'xs' ? '' : `-${key}`}`] = size == "1" ? "100%" : `calc(1% * ${eval(size)} * 100)`
  })
  return colSizes
})
</script>

<template>
  <component :is="tag" ref="column" class="grid-column" :style="columnSizes">
    <slot />
  </component>
</template>

<style scoped>
  .grid-column {
    --col-width: 100%;
    --breakpoint-sm: 46.5rem;

    display: flex;
    flex-direction: column;
    flex-basis: var(--col-width, 100%);
    width: var(--col-width, 100%);
    padding: calc(var(--gap) / 2);

    @media (min-width: 46.5rem) {
      flex-basis: var(--col-width-sm, 100%);
      width: var(--col-width-sm, 100%);
    }

    @media (min-width: 64rem) {
      flex-basis: var(--col-width-md, 100%);
      width: var(--col-width-md, 100%);
    }

    @media (min-width: 85.37rem) {
      flex-basis: var(--col-width-lg, 100%);
      width: var(--col-width-lg, 100%);
    }

    @media (min-width: 120rem) {
      flex-basis: var(--col-width-xl, 100%);
      width: var(--col-width-xl, 100%);
    }
  }
</style>
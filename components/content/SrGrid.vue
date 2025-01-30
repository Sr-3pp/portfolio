<script setup>
const props = defineProps({
  gap: {
    type: String,
    default: '1.25rem'
  },
  tag: {
    type: String,
    default: 'section'
  }
})

const grid = ref(null)

onMounted(() => {
  grid.value.style.setProperty('--gap', props.gap)
})

</script>

<template>
  <component :is="tag" ref="grid" class="grid">
    <slot />
  </component>
</template>

<style scoped>
  .grid {
    --gap: 1.25rem;

    display: flex;
    flex-wrap: wrap;
    margin: calc(var(--gap) / -2);
  }
</style>
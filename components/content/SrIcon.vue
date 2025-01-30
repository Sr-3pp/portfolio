<script setup>
defineProps({
  name: String,
  library: {
    type: String,
    default: '/icons'
  }
})
</script>

<template>
  <div class="icon">
    <svg class="icon-svg">
      <use :xlink:href="`${library}/${name}.svg#s`" />
    </svg>
  </div>
</template>

<style scoped>
  .icon{
    display: flex;
    justify-content: center;
    align-items: center;

    .icon-svg{
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  }
</style>
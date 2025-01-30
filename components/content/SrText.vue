<script setup>
defineProps({
  modelValue: String,
  text: String,
  tag: {
    type: String,
    default: 'p'
  },
  html: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <div class="text">
    <component :is="tag" class="text-container">
      <slot v-if="!modelValue && !text && !html" />
      <span v-else-if="html" v-html="modelValue || text" :contenteditable="editable" @input="$emit('update:modelValue', $event.target.value)" />
      <span v-else :contenteditable="editable" @input="$emit('update:modelValue', $event.target.innerText)">{{ modelValue || text }}</span>
    </component>
  </div>
</template>

<style scoped>
  .text-container {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    word-break: keep-all;
    text-wrap: balance;
  }
</style>
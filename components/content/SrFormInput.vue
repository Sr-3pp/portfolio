<script setup>
defineProps({
  name: String,
  label: String,
  type: String,
  placeholder: String,
  required: Boolean,
  modelValue: String | Number,
  disabled: Boolean,
  messages: {
    type: Object,
    default: () => ({
      error: '',
      success: '',
      help: ''
    })
  }
})
</script>

<template>
  <label class="input">
    <span class="input-label">{{ label }}</span>
    <component
      class="input-field"
      :class="{success: messages.success, error: messages.error, help: messages.help, active: modelValue}"
      :is="type == 'textarea' ? type : 'input'"
      :name="name || ''" :type="type || 'text'"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <transition name="fade">
      <span v-if="messages.error || messages.success || messages.help" class="input-feedback">
        {{ messages.error || messages.success || messages.help }}
      </span>
    </transition>
  </label>
</template>

<style scoped>
  .input{
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    .input-label{
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }

    .input-field{
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      transition: border-color 0.2s ease-in-out;

      &.active{
        border-color: #333;
      }

      &.success{
        border-color: #2ecc71;
      }

      &.error{
        border-color: #e74c3c;
      }

      &.help{
        border-color: #f39c12;
      }
    }

    .input-feedback{
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  }
</style>
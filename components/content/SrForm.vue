<script setup>
const SrFormInput = resolveComponent('SrFormInput');
const props = defineProps({
  form: {
    type: Array,
    default: () => []
  },
  submit: {
    type: String,
    default: 'Submit'
  }
})


const buildFormComponents = (fieldset) => {
  fieldset.forEach(field => {
    field.component =  SrFormInput
  });
}

props.form.forEach(fieldset => {
 buildFormComponents(fieldset.fields); 
});

const getComponent = (name) => {
  return resolveComponent(name)
}

const emit = defineEmits(['submit'])

const handleForm = () => {
  const data = {}
  props.form.forEach(fieldset => {
    if(fieldset.legend){
      data[fieldset.legend.replace(' ', '-')] = {}
    }
    fieldset.fields.forEach(field => {
      if(fieldset.legend){
        data[fieldset.legend.replace(' ', '-')][field.props.name] = field.props.value
      }else{
        data[field.props.name] = field.props.value
      }
    })
  })

  emit('submit', data)

}
</script>

<template>
  <form class="form" @submit.prevent="handleForm">
    <fieldset v-for="(fieldset, index) in form" :key="index">
      <legend v-if="fieldset.legend">{{ fieldset.legend }}</legend>
        <component
          v-for="(field, fieldIndex) in fieldset.fields"
          :key="fieldIndex"
          :is="field.component"
          v-bind="field.props"
          v-model="field.props.value"
        />
    </fieldset>
    <slot name="submit" v-if="$slots.submit"></slot>
    <button v-else>
      {{ submit }}
    </button>
  </form>
</template>

<style scoped>
  .form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>

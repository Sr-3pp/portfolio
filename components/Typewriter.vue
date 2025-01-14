<template lang="pug">
.typewritter(ref="el" :data-label="props.text")
    SrText.typewritter-content(:text="writting" class="title" style="--text-align: center;")
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
});
let writting = ref("");
const el = ref(null);
let is_visible = useElementVisibility(el);

let interval;

const type = () => {
  if (writting.value.length == props.text.length) {
    clearInterval(interval);
  } else {
    writting.value += props.text[writting.value.length];
  }
};

watch(is_visible, (sw) => {
  if (sw) {
    interval = setInterval(type, 200);
  } else {
    clearInterval(interval);
    writting.value = "";
  }
});
</script>

<style lang="scss">
.typewritter {
  display: flex;
  align-items: center;
  position: relative;
  text-align: center;

  &::after {
    content: attr(data-label);
    opacity: 0;
    font-size: unit(40);
  }

  &-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
}
</style>

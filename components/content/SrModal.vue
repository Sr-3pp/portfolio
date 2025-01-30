<script setup>
const dialog = ref(null)

const isOpen = ref(false)

const { lockScroll } = useLockScroll()
const toggle = () => {
  isOpen.value ? dialog.value.close() : dialog.value.showModal()
  isOpen.value = !isOpen.value
  lockScroll(isOpen.value)
}

const handleBackdrop = (e) => {
  if(e.target === dialog.value){
    toggle()
  }
}

defineExpose({
  toggle
})
</script>

<template>
  <dialog ref="dialog" class="dialog" @click="handleBackdrop">
    <div class="dialog-container">
      <button class="dialog-close" @click="toggle">
        <slot name="button">
          ✕
        </slot>
      </button>
      <div v-if="$slots.header" class="dialog-header">
        <slot name="header" />
      </div>
      <div v-if="$slots.body" class="dialog-body">
        <slot name="body" />
      </div>
      <div v-if="$slots.footer" class="dialog-footer">
        <slot name="footer" />
      </div>
    </div>
  </dialog>
</template>

<style scoped>
  .dialog {
    --bg: #fff;

    padding: 0;
    margin: 0;
    max-width: inherit;
    max-height: inherit;
    margin: auto;
    position: relative;
    border: none;
    background: none;
    overflow: visible;
    scale: 0;
    opacity: 0;
    transition: scale 0.35s ease-in-out,
      opacity 0.35s ease-in-out,
      display 0.35s ease-in-out allow-discrete;


    .dialog-container {
      border-radius: 1.25rem;
      background-color: var(--bg);
      max-width: 80vw;
      max-height: 80vh;
    }

    .dialog-header {
      padding: 1rem;
      border-bottom: 1px solid #ccc;
    }

    .dialog-header, .dialog-body, .dialog-footer {
      padding: 1rem;
    }

    .dialog-body {
      overflow: auto;
    }

    .dialog-close{
      position: absolute;
      top: 0;
      right: 0;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      background-color: #ff0000;
      width: 2rem;
      aspect-ratio: 1;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      border-radius: 99px;
      border: solid thin #000000;
    }

    .dialog-footer{
      position: sticky;
      bottom: 0;
    }

    &::backdrop {
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
    }
  }

  .dialog[open] {
      scale: 1;
      opacity: 1;
      
      @starting-style{
        scale: 0;
        opacity: 0;
      }
    }
</style>
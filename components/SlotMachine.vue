<script setup lang="ts">
const props = defineProps({
  labels: {
    type: Array,
    default: (): string[] => [],
  }
});

const slotMachine = ref<HTMLElement | null>(null);

const length = (props.labels.at(0) as string).length - 1 || 0;
const characters = ["🍕", "🐞", "🍪", "💻", "💀", "🥸", "💩", "🍀", ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/".split('')];

const slots: Ref<any[]> = ref([
  {
    current: characters[Math.floor(Math.random() * characters.length)],
    next: characters[Math.floor(Math.random() * characters.length)],
  },
  {
    current: characters[Math.floor(Math.random() * characters.length)],
    next: characters[Math.floor(Math.random() * characters.length)],
  }
])
const speed = ref(10);

const spin = async (duration: number = 800) => {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  let elapsedTime = 0; // Tracks the total elapsed time
  let delayTime = 0; // Initial delay

  const startTime = Date.now(); // Record the start time

  while (elapsedTime < duration) {
      await delay(delayTime); // Wait for the current delay
      elapsedTime = Date.now() - startTime; // Update elapsed time
      slots.value.forEach((slot: any) => {
        loop(slot, delayTime)
      })
      delayTime += (duration - elapsedTime) / 15; // Increment delay proportionally
  }
};

onMounted(() => {
  spin();
});

const loop = (slot: any, delay = 500) => {
  slotMachine.value!.style.setProperty('--transition-speed', `${delay}ms`);
  slotMachine.value!.style.setProperty('--slot-transform', `translateY(0)`);
  
  setTimeout(() => {
    slotMachine.value!.style.setProperty('--transition-speed', `0`);
    slot.current = slot.next;
    slot.next = characters[Math.floor(Math.random() * characters.length)];
    slotMachine.value!.style.setProperty('--slot-transform', `translateY(-100%)`);
  }, delay);
  
}

</script>

<template lang="pug">
ul.slot-machine(ref="slotMachine")
    li.slot-machine-item(v-for="(slot, i) in slots" :key="i")
      span  {{ slot.next }}
      span  {{ slot.current }}
    li
      button(@click="spin()") spin
</template>

<style scoped lang="scss">
.slot-machine{
  --slot-transform: translateY(-100%);
  --transition-speed: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: unit(2);
  &-item{
    display: flex;
    flex-direction: column;
    font-family: "REM";
    font-weight: bold;
    font-size: unit(20);
    height: unit(30);
    overflow: hidden;
    padding-left: unit(8);
    padding-right: unit(8);
    background: linear-gradient(rgba($color-black, .5) 10%, rgba($color-white, 1) 30%, rgba($color-white, 1) 70%, rgba($color-black, .5) 100%,);
    background-color: $color-white;

    span{
      height: 100%;
      display: flex;
      flex-shrink: 0;
      transform: var(--slot-transform);
      transition: transform var(--transition-speed) ease-in-out;
    }
  }

  &.reloading, &.spinning{
    .slot-machine-item{
      span{
        transition: none;
      }
    }
  }
}
</style>

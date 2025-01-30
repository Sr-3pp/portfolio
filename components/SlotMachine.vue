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

const slots: Ref<any[]> = ref(Array.from({ length }, () => ({
    current: characters[Math.floor(Math.random() * characters.length)],
    next: characters[Math.floor(Math.random() * characters.length)],
})));

const speed = ref(10);
const labelIdx = ref(0);
const interval: any = ref(null);
const intervalSpeed = 4000;

const spin = async (duration: number = 800) => {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  let elapsedTime = 0; // Tracks the total elapsed time
  let delayTime = 0; // Initial delay
  const startTime = Date.now(); // Record the start time

  while (elapsedTime < duration) {
      await delay(delayTime); // Wait for the current delay
      slots.value.forEach((slot: any) => {
        loop(slot, delayTime);
      })
      delayTime += (duration - elapsedTime) / 15; // Increment delay proportionally
      elapsedTime = Date.now() - startTime; // Update elapsed time
      
      if (elapsedTime >= duration) {
        slots.value.forEach((slot: any, i) => {
          const char = Array.from(props.labels[labelIdx.value] as string)[i];
          loop(slot, delayTime, char);
        })
        setTimeout(() => {
          slots.value.forEach((slot: any, i) => {
            loop(slot, delayTime + 100);
          })
        }, delayTime);
      }
  }

  labelIdx.value = labelIdx.value === props.labels.length - 1 ? 0 : labelIdx.value + 1;
};

onMounted(() => {
  spin();
  interval.value = setInterval(() => {
    spin();
  }, intervalSpeed);
});

const loop = (slot: any, delay = 500, char?: null | string
) => {
  slotMachine.value!.style.setProperty('--transition-speed', `${delay}ms`);
  slotMachine.value!.style.setProperty('--slot-transform', `translateY(0)`);
  setTimeout(() => {
    slotMachine.value!.style.setProperty('--transition-speed', `0`);
    slot.current = slot.next;
    slot.next = char ? char : characters[Math.floor(Math.random() * characters.length)];
    slotMachine.value!.style.setProperty('--slot-transform', `translateY(-100%)`);
  }, delay);
  
}

const handleInterval = () => {
  clearInterval(interval.value);
}

</script>

<template lang="pug">
ul.slot-machine(ref="slotMachine" @mouseover="handleInterval" @mouseleave="interval = setInterval(() => spin(), intervalSpeed)")
    li.slot-machine-item(v-for="(slot, i) in slots" :key="i")
      span  {{ slot.next }}
      span  {{ slot.current }}
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
    align-items: center;
    font-family: "REM";
    font-weight: bold;
    font-size: unit(20);
    height: unit(50);
    width: unit(30);
    overflow: hidden;
    padding-left: unit(8);
    padding-right: unit(8);
    background: linear-gradient(rgba($color-black, .2) 10%, transparent 30%, transparent 70%, rgba($color-black, .2) 100%,);
    color: $color-white;

    span{
      height: 100%;
      display: flex;
      align-items: center;
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

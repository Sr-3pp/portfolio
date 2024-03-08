<script setup lang="ts">
import gsap from "https://cdn.skypack.dev/gsap";
const canvasRef: any = ref(null);
const contextRef: any = ref(null);
const starsRef: any = ref([]);
const vminRef: any = ref(0);
const scaleMapperRef: any = ref(null);
const alphaMapperRef: any = ref(null);

const densityRatio = 0.5;
const sizeLimit = 5;
const defaultAlpha = 0.5;
const scaleLimit = 2;
const proximityRatio = 0.1;

onMounted(() => {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
  contextRef.value = canvasRef.value.getContext("2d");

  LOAD();
  gsap.ticker.add(RENDER);
  gsap.ticker.fps(24);

  window.addEventListener("resize", LOAD);
  document.addEventListener("pointermove", UPDATE);
});

onUnmounted(() => {
  window.removeEventListener("resize", LOAD);
  document.removeEventListener("pointermove", UPDATE);
  gsap.ticker.remove(RENDER);
});

const LOAD = () => {
  vminRef.value = Math.min(window.innerHeight, window.innerWidth);
  const STAR_COUNT = Math.floor(vminRef.value * densityRatio);
  scaleMapperRef.value = gsap.utils.mapRange(
    0,
    vminRef.value * proximityRatio,
    scaleLimit,
    1
  );
  alphaMapperRef.value = gsap.utils.mapRange(
    0,
    vminRef.value * proximityRatio,
    1,
    defaultAlpha
  );
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
  starsRef.value = new Array(STAR_COUNT).fill(0).map(() => ({
    x: gsap.utils.random(0, window.innerWidth, 1),
    y: gsap.utils.random(0, window.innerHeight, 1),
    size: gsap.utils.random(1, sizeLimit, 1),
    scale: 1,
    alpha: gsap.utils.random(0, defaultAlpha, 0.1),
  }));
};

const RENDER = () => {
  starsRef.value.forEach((star: any) => {
    contextRef.value.fillStyle = `hsla(0, 100%, 100%, ${star.alpha})`;
    contextRef.value.beginPath();
    contextRef.value.arc(
      star.x,
      star.y,
      (star.size / 2) * star.scale,
      0,
      Math.PI * 2
    );
    contextRef.value.fill();
  });
};

const UPDATE = ({ x, y }: any) => {
  starsRef.value.forEach((STAR: any) => {
    const DISTANCE = Math.sqrt(
      Math.pow(STAR.x - x, 2) + Math.pow(STAR.y - y, 2)
    );
    gsap.to(STAR, {
      scale: scaleMapperRef.value(
        Math.min(DISTANCE, vminRef.value * proximityRatio)
      ),
      alpha: alphaMapperRef.value(
        Math.min(DISTANCE, vminRef.value * proximityRatio)
      ),
    });
  });
};
</script>

<template lang="pug">
.stars
  canvas(ref="canvasRef")
</template>

<style lang="scss">
.stars {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  inset: 0;
  canvas {
    background: $color-vue-bg;
    height: 100vh;
    width: 100vw;
    opacity: 0.5;
  }
}
</style>

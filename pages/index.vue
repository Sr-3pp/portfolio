<script setup lang="ts"></script>

<template lang="pug">
.content
    SrContainer(:with-padding="true")
        SrText(text="CodePens" tag="h1")
    SrContainer(:with-padding="true" style="min-height: 100vh;")
        SrText(text="Social List" tag="h1")
</template>

<style lang="scss">
.content {
  background-color: $color-white;
  position: relative;
  z-index: 1;
}
</style>

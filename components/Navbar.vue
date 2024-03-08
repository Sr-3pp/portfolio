<template lang="pug">
header.navbar
    nav.navbar-nav
        ul.navbar-items
            li.navbar-item
                p home
            li.navbar-item
                p about
            li.navbar-item
                p projects

</template>

<script setup lang="ts">
const modal_cv: any = useState("modal_cv", () => false);

const setLocale = (e: any) => {
  e.locale = "es";
};
</script>

<style lang="scss">
.navbar {
  position: fixed;
  bottom: unit(20);
  left: 50%;
  transform: translateX(-50%);
  z-index: 40;
  background-color: red;
  border-radius: unit(99);

  &-items {
    display: flex;
    justify-content: space-around;
  }

  &-item {
    padding: unit(10);
  }
}
</style>

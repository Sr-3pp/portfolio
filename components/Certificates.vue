<script setup lang="ts"></script>

<template lang="pug">
.certificates
  ul.certificates__list
    li.certificates__item
      a(href="https://certificates.dev/c/9b634cb0-c51e-4c5d-9b31-192abb29d36ahttps://certificates.dev/c/9b634cb0-c51e-4c5d-9b31-192abb29d36a" target="_blank")
        NuxtImg(src="https://certificates.dev/.netlify/images?url=https:%2F%2Fapi.certificates.dev%2Fcertificates%2Fthumbnail%2F9b634cb0-c51e-4c5d-9b31-192abb29d36a.jpg")
        span
          SrIcon(name="vue")
          | Mid Level Vue
    li.certificates__item
      a(href="https://certificates.dev/c/9e56a404-2c1e-4dfd-a74d-55b47271742a" target="_blank")
        NuxtImg(src="https://certificates.dev/.netlify/images?url=https:%2F%2Fapi.certificates.dev%2Fcertificates%2Fthumbnail%2F9e56a404-2c1e-4dfd-a74d-55b47271742a.jpg")
        span
          SrIcon(name="vue")
          | Senior Vue

</template>

<style scoped lang="scss">
.certificates{
  &__list{
    display: flex;
    gap: unit(20);
    flex-wrap: wrap;
  }

  &__item{
    flex-basis: 100%;

    @media (min-width: #{$breakpoint-sm}){
      flex-basis: 33.33%;
    }

    a{
      display: flex;
      flex-direction: column;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      span{
        display: flex;
        gap: unit(20);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: $color-cta-bg;
        color: $color-vue-text;
        padding: unit(10);
        font-weight: bold;
        font-size: unit(14);
      }
      .icon{
        width: unit(20);
        height: unit(20);
      }
    }
  }
}
</style>

<script setup lang="ts">
const { data: _certs } = await useAsyncData('certs', () => {
  return queryCollection('content').path('/certs').first()
})

const certs = _certs.value.meta.certificates;
</script>

<template lang="pug">
.certificates
  ul.certificates__list
    li.certificates__item(v-for="cert in certs" :key="cert.name")
      a(:href="cert.href" target="_blank")
        NuxtImg(:src="cert.img")
        span
          SrIcon(:name="cert.icon")
          | {{ cert.name }} 
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

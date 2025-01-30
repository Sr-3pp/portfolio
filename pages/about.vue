<script lang="ts" setup>

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "Sr.3pp | About me",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "Learn more about me, my hobbies and why I love Vue.js.",
    },
  ],
});


const about: any = inject("about");
const { hobbies } = about;
</script>

<template lang="pug">
.about 
  SrContainer(:with-padding="true")
    SrText(text="Who am I?" tag="h1" class="title" style="--text-align: center; --text-align-sm: left;")
    figure.selfie.picture
      NuxtImg(src="/img/me.webp" alt="Martin Ruiz" width="250")
    SrText(:text="$t('full_cover_letter')" :html="true")
  SrContainer(:with-padding="true")
    SrText(:text="$t('why_vue')" class="title" tag="h2" style="--text-align: center;")
    SrGrid.why
      SrGridColumn(:size="{mobile: '1', sm: '1/3'}")
        figure.picture
          NuxtImg(src="/img/logos/vue.webp" alt="Martin Ruiz" width="250")
      SrGridColumn(:size="{mobile: '1', sm: '2/3'}" style="--align-items: center; --justify-content: center;")
        SrText(:text="$t('why_vue_answer')")
  SrContainer(:with-padding="true")
    SrText(text="Hobbies" tag="h2" class="title")
    SrGrid(tag="ul" class="hobbies-list")
      SrGridColumn.hobbies-list-hobby(tag="li" :size="{mobile: '1/2', sm: '1/4'}" v-for="hobby in hobbies" :key="hobby")
        HobbyCard(v-bind="hobby")
</template>

<style lang="scss">
.about {
  .text {
    &.title {
      margin-bottom: unit(20);
    }
  }

  .picture{
    margin: 0;
    width: 100%;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .why {
    max-width: unit(800) !important;
    margin: 0 auto;
  }

  .selfie.picture {
    float: right;
    border-radius: unit(9999);
    overflow: hidden;
    width: 100%;
    margin: unit(20);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }

    @media (min-width: $breakpoint-sm) {
      height: unit(400);
      width: 30%;
      min-width: unit(300);
    }
  }

  .grid {
    > * {
      &:has(.selfie) {
        display: none;

        @media (min-width: $breakpoint-sm) {
          display: flex;
        }
      }
    }
  }
}
</style>

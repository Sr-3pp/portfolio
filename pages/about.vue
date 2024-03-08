<script lang="ts" setup>
import about from "@/content/about.json";
const { hobbies } = about;
</script>

<template lang="pug">
.about 
  SrContainer(:with-padding="true")
    SrText(text="Who am I?" tag="h2" class="title")
    SrGrid
      SrGridColumn(:size="{mobile: '1', sm: '2/3'}")
        SrText(:html="$t('full_cover_letter')" alignment="center")
      SrGridColumn(:size="{mobile: '1', sm: '1/3'}" style="--align-items: center; --justify-content: center;")
        SrPicture.selfie(src="/img/me.jpg" alt="Martin Ruiz" width="300" height="300")
  SrContainer(:with-padding="true")
    SrText(:text="$t('why_vue')" class="title" tag="h2" style="--text-align: center;")
    SrGrid.why
      SrGridColumn(:size="{mobile: '1', sm: '1/3'}")
        SrPicture(src="/img/logos/vue.png" alt="Martin Ruiz" width="300" height="300")
      SrGridColumn(:size="{mobile: '1', sm: '2/3'}" style="--align-items: center; --justify-content: center;")
        SrText(:text="$t('why_vue_answer')" alignment="center")
  SrContainer(:with-padding="true")
    SrText(text="Hobbies" tag="h2" class="title")
    SrGrid(tag="ul" class="hobbies-list")
      SrGridColumn.hobbies-list-hobby(tag="li" :size="{mobile: '1/2', sm: '1/4'}" v-for="hobby in hobbies" :key="hobby")
        HobbyCard(v-bind="hobby")
</template>

<style lang="scss">
.about {
  .sr-text {
    &.title {
      margin-bottom: unit(20);
    }
  }

  .why {
    max-width: unit(800) !important;
    margin: 0 auto;
  }

  .selfie.sr-picture {
    height: unit(400);
    border-radius: unit(9999);
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }
}
</style>

<script lang="ts" setup>
import about from "@/content/about.json";
const { hobbies } = about;
</script>

<template lang="pug">
.about 
  SrContainer(:with-padding="true")
    SrText(text="Who am I?" tag="h1" class="title" style="--text-align: center; --text-align-sm: left;")
    SrGrid
      SrGridColumn(:size="{mobile: '1', sm: '2/3'}")
        SrText(:html="$t('full_cover_letter')")
      SrGridColumn(:size="{mobile: '1', sm: '1/3'}" style="--align-items: center; --justify-content: center;")
        SrPicture.selfie(src="/img/me.jpg" alt="Martin Ruiz" width="300" height="300")
  SrContainer(:with-padding="true")
    SrText(:text="$t('why_vue')" class="title" tag="h2" style="--text-align: center;")
    SrGrid.why
      SrGridColumn(:size="{mobile: '1', sm: '1/3'}")
        SrPicture(src="/img/logos/vue.png" alt="Martin Ruiz" width="300" height="300")
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

  .sr-grid {
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

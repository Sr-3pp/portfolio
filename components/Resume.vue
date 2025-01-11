<template lang="pug">
.cv
    SrText(text="Education" class="title")
    ol.cv-list
        li.cv-list-item(v-for="(school, i) in cv.education" :key="i")
            .cv-label 
                SrText(:text="school.school" class="subtitle")
                small {{ school.period }}
            SrText(:text="school.degree")
    hr
    SrText(text="Profesional Experience" class="title")
    ol.cv-list
        li.cv-list-item(v-for="(job, i) in cv.experience" :key="i")
            .cv-label
                SrText(:text="job.name" class="subtitle")
                small {{ job.period }}
            SrText(:text="$t(job.position)")
            SrText.cv-description(:text="$t(job.description)")

            ul.cv-tech-list
                li.cv-tech-item(v-for="(tech, e) in job.technologies" :key="e")
                    SrPicture(:src="'/img/logos/'+tech.logo" :alt="tech.name")
    hr
    SrText(text="Freelance" class="title")
    ol.cv-list
        li.cv-list-item(v-for="(job, i) in cv.freelance" :key="i")
            .cv-label
                SrText(:text="job.name" class="subtitle")
                small {{ job.period }}
            SrText(:text="$t(job.position)")
            SrText.cv-description(:text="$t(job.description)")

            ul.cv-tech-list
                li.cv-tech-item(v-for="(tech, e) in job.technologies" :key="e")
                    SrPicture(:src="'/img/logos/'+tech.logo" :alt="tech.name")

</template>

<script setup lang="ts">
const props = defineProps({
  cv: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss">
.cv {
  > * {
    &:not(:last-child) {
      margin-bottom: unit(20);
    }
  }

  &-subtitle-container {
    display: flex;
    justify-content: space-between;
  }

  &-label {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    small {
      margin-left: auto;
    }
  }

  &-list-item {
    &:not(:last-child),
    > *:not(:last-child) {
      margin-bottom: unit(10);
    }
  }

  &-social-list,
  &-tech-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &-tech-list {
    .sr-picture {
      width: unit(60)!important;
    }
  }

  &-tech-item {
    padding: unit(8);
  }

  &-description {
    font-weight: lighter;
  }
}
</style>

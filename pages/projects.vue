<script lang="ts" setup>
import { cv } from "@/content/cv/index.json";
const modal_project = ref(false);
const currentProject = ref(null);

const getNameLabel = (cv: any) => `${cv.name} <small>${cv.birth}</small>`;
const freelanceProjects = [
  "All American Finishing",
  "Birdsual",
  "All American Cabinetery",
  "Quivi",
  "Mayel Inegnieria",
  "ICCN",
];

const freelance = cv.freelance.filter((project: any) =>
  freelanceProjects.includes(project.name)
);

const contractors = cv.experience;

const projectDetails = (project: any) => {
  currentProject.value = project;
  modal_project.value = true;
};
</script>

<template lang="pug">
.projects
  SrContainer(:with-padding="true")
    SrText(text="Freelance" tag="h1")
    SrGrid(tag="ul" class="projects-list")
      SrGridColumn.projects-list-project(tag="li" :size="{mobile: '1', sm: '1/3'}" v-for="project in freelance" :key="project.name")
        button(@click="projectDetails(project)")
          ProjectCard(v-bind="project" :is-vue="true")
    SrText(text="Contractors" tag="h1")
    SrGrid(tag="ul" class="projects-list")
      SrGridColumn.projects-list-project(tag="li" :size="{mobile: '1', sm: '1/3'}" v-for="project in contractors" :key="project.name")
          SrButton.projects-list-contractor(@click="projectDetails(project)")
            SrPicture(:src="`/img/logos/${project.logo}`" :alt="project.name" width="200" height="200")

  SrModal(:active="modal_project" @close="modal_project = false")
    template(#body)
      .sr-modal-body(v-if="currentProject")
        SrText(:text="currentProject.name")
</template>

<style lang="scss">
.projects {
  min-height: calc(100svh - unit(80));
  background-color: $color-vue-bg;
  color: $color-vue-text;
  position: relative;
  z-index: 1;

  &-list {
    &-project {
      padding: unit(40) unit(10);
      button {
        background: none;
        border: none;
        color: currentColor;
        cursor: pointer;
      }
    }

    &-contractor {
      max-width: initial;
      width: 80%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: unit(40) unit(10);
      margin: 0 auto;

      .sr-picture {
        img {
          border-radius: unit(9999);
          overflow: hidden;
        }
      }
    }
  }
}
</style>

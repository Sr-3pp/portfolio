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
  section
    SrPicture.projects-bg(src="/img/stripes.jpg")
    SrContainer(:with-padding="true")
      SrText(text="Freelance" tag="h2" class="title" style="--text-align: center; --text-align-sm: left;")
      SrGrid(tag="ul" class="projects-list" style="--justify-content: center;")
        SrGridColumn.projects-list-project(tag="li" :size="{mobile: '1', sm: '1/3'}" v-for="project in freelance" :key="project.name")
          button(@click="projectDetails(project)")
            ProjectCard(v-bind="project" :is-vue="true")
  section
    SrContainer(:with-padding="true")
      SrText(text="Contractors" tag="h2" class="title")
      SrGrid(tag="ul" class="projects-list" style="--justify-content: center;")
        SrGridColumn.projects-list-project(tag="li" :size="{mobile: '1/2', sm: '1/4'}" v-for="project in contractors" :key="project.name")
            SrButton.projects-list-contractor(@click="projectDetails(project)")
              SrPicture(:src="`/img/logos/${project.logo}`" :alt="project.name" width="200" height="200")

  SrModal.projects-project-detail(:active="modal_project" @close="modal_project = false")
    template(#close)
      SrIcon(name="close")
    template(#body)
      .sr-modal-body(v-if="currentProject")
        SrGrid
          SrGridColumn(:size="{mobile: '1', sm: '1/2'}" style="--justify-content: center;")
            SrPicture.projects-project-detail-thumb(:src="`${currentProject.thumb || `/img/logos/${currentProject.logo}`}`" :alt="currentProject.name" width="200" height="200")
          SrGridColumn(:size="{mobile: '1', sm: '1/2'}")
            SrText(:text="currentProject.name" class="title" tag="h2" style="--text-align: center;")
            SrText(:text="$t(currentProject.description)")
            SrText(text="Built with" class="subtitle" style="--text-align: center;" tag="h3")
            SrGrid(tag="ul" style="--justify-content: center;")
              SrGridColumn(:size="{mobile: '1/4', sm: '1/5'}" tag="li" v-for="(technology, index) in currentProject.technologies" :key="index")
                SrPicture(:src="`/img/logos/${technology.logo}`" alt="technology.name" width="100" height="100")
</template>

<style lang="scss">
.projects {
  > section {
    position: relative;
    &:nth-child(even) {
      background: linear-gradient(-135deg, $color-white 80%, $color-vue 90%);
      color: $color-text;
    }
    &:nth-child(odd) {
      background: $bg-linear-vue-dark;
      color: $color-vue-text;
    }

    .sr-container {
      position: relative;

      .sr-text {
        &.title {
          margin-bottom: unit(20);
        }
      }
    }
  }

  &-bg.sr-picture {
    mix-blend-mode: multiply;
    opacity: 0.2;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    img {
      height: 100%;
    }
  }

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

  &-project {
    &-detail {
      color: $color-text;

      .sr-text {
        margin-bottom: unit(20);
      }

      .sr-modal-content {
        max-width: unit(800);
      }

      &-thumb {
        padding: unit(20);
        background: $color-white;
        border-radius: unit(9999);
        overflow: hidden;
        border: {
          style: solid;
          width: unit(2);
          color: $color-vue-hover;
        }
      }
    }
  }
}
</style>

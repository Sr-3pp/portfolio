<script lang="ts" setup>
const projectModal = ref();
const currentProject = ref(null);

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "Sr.3pp | Portfolio",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "Checkout all my freelance projects and contractors here.",
    },
  ],
});

const { data: projectsData } = await useAsyncData("projects", () => queryCollection('content').path('/projects').first());
const cv: any = inject("cv");

const fulltime = ref(projectsData.value!.meta.fulltime);
const freelance = ref(projectsData.value!.meta.freelance);
const contractors = ref(projectsData.value!.meta.contractors);

const getNameLabel = (cv: any) => `${cv.name} <small>${cv.birth}</small>`;
const freelanceProjects = [
  "All American Finishing",
  "Birdsual",
  "All American Cabinetery",
  "Quivi",
  "Mayel Inegnieria",
  "ICCN",
];

const cvFreelance = cv.freelance.filter((project: any) =>
  freelanceProjects.includes(project.name)
);

const cvContractors = cv.experience;

const projectDetails = (project: any) => {
  currentProject.value = project;
  projectModal.value.toggle();
};
</script>

<template lang="pug">
.projects
  Suspense
    SrGrid.projects-list(tag="ul")
      SrGridColumn(
        :size="{mobile: '1',sm: '1/2', xl: '1/3'}"
        tag="li"
      )
        SrText(text="Fulltime" tag="h2" class="title" style="--text-align: center; --text-align-sm: left;")
      SrGridColumn(
        v-for="project in fulltime" :key="project.name"
        :size="{mobile: '1',sm: '1/2', xl: '1/3'}"
        tag="li"
      )
        ProjectCard(v-bind="project")
  Suspense 
    SrGrid.projects-list(tag="ul")
      SrGridColumn(
        :size="{mobile: '1',sm: '1/2', xl: '1/3'}"
        tag="li"
      )
        SrText(text="Contractors" tag="h2" class="title" style="--text-align: center; --text-align-sm: left;")
      SrGridColumn(
        v-for="project in contractors" :key="project.name"
        :size="{mobile: '1',sm: '1/2', xl: '1/3'}"
        tag="li"
      )
        ProjectCard(v-bind="project")
  
  Suspense 
    SrGrid.projects-list(tag="ul")
      SrGridColumn(
        :size="{mobile: '1',sm: '1/2', xl: '1/3'}"
        tag="li"
      )
        SrText(text="Freelance" tag="h2" class="title" style="--text-align: center; --text-align-sm: left;")
      SrGridColumn(
        v-for="project in freelance" :key="project.name"
        :size="{mobile: '1',sm: '1/2', xl: '1/3'}"
        tag="li"
      )
        ProjectCard(v-bind="project")

  SrModal.projects-project-detail(ref="projectModal")
    template(#close)
      SrIcon(name="close")
    template(#body v-if="currentProject")
        SrGrid
          SrGridColumn(:size="{mobile: '1', sm: '1/2'}" style="--justify-content: center;")
            NuxtImg.projects-project-detail-thumb(:src="`${currentProject.thumb || `/img/logos/${currentProject.logo}`}`" :alt="currentProject.name" width="200" height="200")
          SrGridColumn(:size="{mobile: '1', sm: '1/2'}")
            SrText(:text="currentProject.name" class="title" tag="h2" style="--text-align: center;")
            SrText(:text="$t(currentProject.description)")
            SrText(text="Built with" class="subtitle" style="--text-align: center;" tag="h3")
            SrGrid(tag="ul" style="--justify-content: center;")
              SrGridColumn(:size="{mobile: '1/4', sm: '1/5'}" tag="li" v-for="(technology, index) in currentProject.technologies" :key="index")
                NuxtImg(:src="`/img/logos/${technology.logo}`" alt="technology.name" width="100" height="100")
</template>

<style lang="scss">
.projects {
  overflow: hidden;

  &-list{
    margin: 0!important;
    &.grid{
      .grid-column{
        padding: 0
      }
    }

    .title{
      margin: auto;
    }
  }
}
</style>

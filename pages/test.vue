<template lang="pug">
section(class="gradient-bg")
  SrContainer(:with-padding="true")
    SrText(:text="$t('portafolio')" class="title" style="--text-align: center;")
  Slider(:style="`--slides: ${projects.length}`")
    li.slide(v-for="(project, i) in [...projects, ...projects]" :key="i")
      ProjectCard(v-bind="project")
SrPicture( class="waves-down" src="/img/down_waves.webp" alt="waves")

SrContainer(:with-padding="true" class="cv-section")
  button(@click="modal_cv = true" class="cv-action")
    SrPicture(src="/img/resume.webp")
    .cv-overlay
      SrText(:text="$t('resume_cta')" class="subtitle")

SrModal(class="resume printable" :active="modal_cv" @close="() => modal_cv = false")
  template(#header)
    .sr-modal-header
      ClientOnly
        button.print-button(@click="printResume()")
          SrIcon(name="print")
      .cv-label
        SrText(:text="cv.name" kind="title")
        small {{ cv.birth }} 
      div.cv-subtitle-container
        SrText(:text="$t(cv.position)")
        SocialList(:items="cv.social")
  template(#body)
    .sr-modal-body(v-if="cv")
      Resume(:cv="cv")
Footer

</template>

<script setup>
import { cv } from "@/content/cv/index.json";
const modal_cv = useState("modal_cv", () => false);

const getNameLabel = (cv) => `${cv.name} <small>${cv.birth}</small>`;
const projectNames = [
  "banamex",
  "All American Finishing",
  "Birdsual",
  "All American Cabinetery",
  "Quivi",
  "Mayel Inegnieria",
  "ICCN",
];

const projects = cv.freelance.filter((project) =>
  projectNames.includes(project.name)
);

const printResume = () => {
  window.print();
};
</script>

<style lang="scss">
@media print {
  #__nuxt * {
    display: none;
  }

  #__nuxt .printable,
  #__nuxt .printable * {
    display: block;
  }

  #__nuxt .resume {
    position: static;

    .sr-text {
      &.kind {
        &-title {
          font-size: unit(30) !important;
        }
      }
    }

    .sr-modal {
      &-body {
        max-height: inherit;
      }

      &-container {
        box-shadow: none;
      }

      &-backdrop,
      &-close-button,
      .print-button {
        display: none;
      }
    }

    .social-list {
      display: flex;

      &-item {
        display: flex;

        &:not(:last-child) {
          margin-right: unit(20);
        }

        .sr-icon {
          width: unit(25);
          height: unit(25);
          margin-right: unit(4);
        }
      }
    }

    .cv {
      > * {
        &:not(:last-child) {
          margin-bottom: unit(8);
        }
      }

      &-subtitle-container,
      &-tech-list,
      &-label {
        display: flex;

        .sr-img {
          width: unit(30);
        }
      }
    }
  }
}

.cv-section {
  text-align: center;
  position: relative;
  z-index: 3;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .sr-img {
    width: 50%;
  }

  .cv-action {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    border-radius: unit(8);
    overflow: hidden;

    .sr-img {
      max-width: unit(350);
      width: auto;
    }

    &:hover {
      .cv-overlay {
        opacity: 1;
      }
    }
  }

  .cv-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color-black, 0.3);
    backdrop-filter: blur(unit(8));
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-white;
    opacity: 0;
    transition: opacity 0.35s ease-in-out;
  }
}

.resume .print-button {
  position: absolute;
  top: 0;
  right: unit(34);
  background-color: $color-cta-bg;
  padding: unit(4) unit(10);
  color: $color-white;
  border: none;
  border-bottom-left-radius: unit(8);
  border-bottom-right-radius: unit(8);

  .sr-icon {
    width: unit(20);
    height: unit(20);
  }
}

.gradient-bg {
  position: relative;
  background: linear-gradient(90deg, #101324 0%, #333a4f 100%);
  z-index: 2;

  * {
    color: $color-white;
  }
}

.waves-down.sr-img {
  height: unit(200);
  margin-bottom: unit(-80);

  img {
    height: 100%;
    object-fit: fill;
  }
}
</style>

<template lang="pug">
header.navbar
    nav.navbar-nav
        ul.navbar-items
            li.navbar-item
                button(@click="() => modal_cv = true") {{ $t('resume') }}
            li.navbar-item.submenu
                SrPicture.navbar-flag(:src="`/img/${$i18n.locale}.png`")
                ol.navbar-submenu
                    li.navbar-submenu-item
                        button(@click="$i18n.locale = 'es'") ES
                    li.navbar-submenu-item
                        button(@click="$i18n.locale = 'en'") EN

</template>

<script setup lang="ts">
const modal_cv: any = useState("modal_cv", () => false);

const setLocale = (e: any) => {
  e.locale = "es";
};
</script>

<style lang="scss">
.navbar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 4;

  &-nav {
    max-width: unit(1100);
    margin: auto;
    display: flex;
    padding-top: unit(20);
  }

  &-items {
    padding-right: unit(4);
    padding-left: unit(4);
    margin-left: auto;
    display: flex;
    background-color: rgba($color-white, 0.7);
    backdrop-filter: blur(unit(8));
    border-radius: unit(100);
    box-shadow: 0 0 unit(10) rgba($color-white, 0.5);
  }

  &-flag.sr-img {
    width: unit(25) !important;
    height: unit(25) !important;
    padding: unit(5);
  }

  &-item {
    display: flex;

    &.submenu {
      position: relative;
      flex-direction: column;
      justify-content: center;
    }

    > * {
      padding: unit(8) unit(10);
      text-align: center;
      text-decoration: none;
      background-color: transparent;
      border: none;
      font-size: unit(16);
      color: $color-text;
      position: relative;
      z-index: 3;
    }

    &:hover {
      > * {
        color: $color-text-hover;
      }

      .navbar-submenu {
        max-height: 100vh;
        padding-top: unit(8);
        padding-bottom: unit(8);
      }
    }

    &:last-child {
      border-left: {
        style: solid;
        color: rgba($color-black, 0.3);
        width: unit(2);
      }
    }
  }

  &-submenu {
    background-color: rgba($color-white, 0.5);
    border-bottom-left-radius: unit(8);
    border-bottom-right-radius: unit(8);
    z-index: 1;
    position: absolute;
    top: 100%;
    right: unit(10);
    max-height: 0;
    overflow: hidden;
    padding: 0 unit(8);
    transition: max-height 0.35s ease, padding 0.35s ease;

    &-item {
      > * {
        background-color: transparent;
        border: none;
      }

      &:hover {
        > * {
          color: $color-text-hover;
        }
      }
    }
  }
}
</style>

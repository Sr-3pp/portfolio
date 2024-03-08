<template lang="pug">
div.slider
    ul.slider-list
        slot
</template>

<script lang="ts">
export default defineComponent({
    props: {
        items: {
            type: Array,
            default: () => []
        }
    }
})
</script>

<style lang="scss">
.slider {
    overflow: hidden;
    padding-top: unit(40);
    padding-bottom: unit(40);
    --speed: 15s;
    --slides: 5;

    &-list {
        display: flex;
        width: calc(40vw * var(--slides));

        &:hover {
            .slide {
                animation-play-state: paused;
            }
        }
    }

    .slide {
        flex-shrink: 0;
        width: 40vw;
        animation: translateinfinite var(--speed) linear infinite;

        .img {
            height: unit(200);

            @media (min-width: $breakpoint-sm) {
                height: unit(300);
            }

            img {
                transition: transform .35s ease;
                height: 100%;
            }
        }

        &:hover {
            .img {
                img {
                    transform: scale(1.2);
                }
            }
        }

        @keyframes translateinfinite {
            100% {
                transform: translateX(calc(-100% * var(--slides)))
            }
        }
    }
}
</style>
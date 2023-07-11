<template>
    <section id="home">
        <StripeCanvas />
        <Slider :data="Data" />

        <div class="in-development">
            <span>
                Bu proje geliştirme aşamasındadır
            </span>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SliderData } from '@/types';

import Slider from '@/components/view/Slider.vue';
import StripeCanvas from '@/components/view/StripeCanvas.vue';

defineProps(["modelValue"]);

const RandomAboutData = [`${(new Date().getFullYear()) - 2008} yaşındayım ✨`, "Ankara büyümeliyim", 'Yazılıma 5. sınıfta başladım ✨', "Bu proje sanırım 6 aylık"]

const makeAboutData = () => {
    return RandomAboutData[Math.floor(Math.random() * RandomAboutData.length)];
}

const Data = ref<Array<SliderData>>(
    [
        {
            value: "Hakkımda",
            hoverContent: {
                content: makeAboutData(),
                position: "bottom-center",
                lineStyle: "all-lines"
            }
        },
        {
            value: "Projeler",
            hoverContent: {
                content: '12 Proje',
                position: "back"
            }
        },
        {
            value: "İletişim",
            hoverContent: {
                content: "Tabii ki de ✨",
                position: "top-left",
                lineStyle: "line-left",
                lineMargin: "linemargin-left"
            }
        },
        {
            value: "Destek",
            hoverContent: {
                content: 'Çok iyi olur!',
                position: "bottom-right",
                lineStyle: "line-right",
                lineMargin: "linemargin-right"
            }
        }
    ]
)
</script>

<style lang="scss">
@import '@/style/variables.scss';

#home {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;

    .in-development {
        position: absolute;
        bottom: 1em;
        font-weight: 300;
        text-transform: uppercase;
        font-style: italic;
        transform: scaleY(.85);

        pointer-events: none;

        span {
            position: relative;

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: -3em;
                transform: translateY(-50%);
                width: 2em;
                height: .1em;
                background: #fff;
            }

            &::after {
                content: '';
                position: absolute;
                top: 50%;
                right: -3em;
                transform: translateY(-50%);
                width: 2em;
                height: .1em;
                background: #fff;
            }
        }
    }
}
</style>

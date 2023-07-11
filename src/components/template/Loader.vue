<template>
    <div class="loader" ref="Loader">
        <div class="percentage"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const Loader = ref<HTMLElement | null>(null);

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
    if (!Loader.value) return;
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            setTimeout(() => {
                Loader.value?.classList.add("load-end");
                setTimeout(() => {
                    Loader.value?.classList.add("reveal");
                    updateModel(true);
                    setTimeout(() => {
                        Loader.value?.classList.add("undisplay");
                    }, 1000);
                }, 1000)
            }, 1000)
        }
    }
})


function updateModel(data: boolean) {
    emit("update:modelValue", data);
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';

.loader {
    position: absolute;
    z-index: 800;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #121212;
    display: grid;
    place-content: center;
    transition: .1s ease;

    &.load-end {
        .percentage {
            right: unset;
            left: 0;
            width: 100%;

            animation: unset;
        }

    }

    &.reveal {
        background: transparent;

        .percentage {
            left: unset;
            right: 0;
            width: 0;
        }
    }

    &.undisplay {
        display: none;
    }

    .percentage {
        position: absolute;
        width: 0;
        height: 100%;
        background: $color-purple;
        animation-name: load;
        animation-iteration-count: infinite;
        animation-duration: 1s;
        transition: .6s ease;
        animation-fill-mode: forwards;
    }

}

@keyframes load {
    0% {
        right: unset;
        left: 0;
        width: 0;
    }

    25% {
        right: unset;
        left: 0;
        width: 100%;
    }

    26% {
        left: unset;
        right: 0;
        width: 100%;
    }

    94% {
        left: unset;
        right: 0;
        width: 0;
    }

    95% {
        right: unset;
        left: 0;
        width: 0;
    }
}
</style>
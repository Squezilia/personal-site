<!-- !DEPRECATED! - Needs Update -->

<template>
    <button interactable="true" cursor-effect="effect-color-reverse" :class="`button t-${type}`" v-if="arrow">
        <span class="content">
            <slot />
            <Arrow />
        </span>
    </button>
    <button interactable="true" cursor-effect="effect-color-reverse" :class="`button t-${type}`" v-else>
        <span class="content">
            <slot />
        </span>
    </button>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

import { TButtonType } from "@/types";

import Arrow from "../view/Arrow.vue";

defineProps({
    type: {
        type: Object as PropType<TButtonType>,
        required: false,
        default: 'primary'
    },
    arrow: {
        type: Boolean,
        required: false,
        default: false
    }
})
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss', '@/style/fonts.scss';

.button {
    padding: 1em 1.2em;
    border: none;
    background: #000;
    font-weight: bold;
    transition: .2s ease;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    position: relative;
    font-size: $font-size-default;
    overflow: hidden;

    .content {
        display: flex;
        position: relative;
        z-index: 20;
    }

    .icon {
        margin-left: 1em;
        transition: .2s ease;
    }

    &::before {
        content: '';
        position: absolute;
        width: 0%;
        height: 100%;
        right: 0;
        top: 0;
        background: #fff;
        z-index: 10;
        transition: .2s ease;
    }

    &:hover {
        &::before {
            width: 100%;
            left: 0;
            right: unset;
        }

        .icon {
            --color: #000;
        }

        color: #000;
    }
}
</style>
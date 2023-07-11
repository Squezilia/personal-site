<template>
    <canvas id="gradient-canvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Gradient } from '@/lib/gradient';

onMounted(() => {
    let gradient = new Gradient()
    gradient.initGradient('#gradient-canvas');
})
</script>

<style lang="scss" scoped>
#gradient-canvas {
    --gradient-color-1: #6e72f4;
    --gradient-color-2: #6a3aff;
    --gradient-color-3: #e1acfc;
    --gradient-color-4: #e63971;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
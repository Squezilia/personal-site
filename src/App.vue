<template>
  <Loader v-model="pageLoaded" />
  <main class="page">
    <Cursor />
    <router-view v-model="pageLoaded" />
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Loader from './components/template/Loader.vue';
import Cursor from '@/components/view/Cursor.vue';

const pageLoaded = ref<boolean>(false);
</script>

<style lang="scss">
@import '@/style/variables.scss';

* {
  font-family: 'Trueno', "Montserrat", sans-serif;
  cursor: none !important;
}

body {
  background-color: $background-dark;
  color: #fff;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: $font-size-default;
}

.page {
  background-image: url('@/assets/bg-a.jpg');
  position: relative;
  background-size: cover;
  background-position: center 0px;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
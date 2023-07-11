<!-- !DEPRECATED! - Needs Update -->

<template>
  <div v-if="icon" class="input-group">
    <Icon :icon="icon" />
    <input :type="type" :value="modelValue" :placeholder="placeholder" :id="id" class="input icon" @input="handleInput"
      interactable="true">
  </div>
  <div v-else class="input-group">
    <input class="input" :type="type" :value="modelValue" :placeholder="placeholder" :id="id" @input="handleInput"
      interactable="true">
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

defineProps({
  type: {
    required: false,
    default: "text",
  },
  placeholder: {
    required: false,
    default: ''
  },
  modelValue: {
    required: false,
  },
  id: {
    required: false,
    default: ''
  },
  icon: {
    required: false,
    default: '',
    type: String
  }
});

const emit = defineEmits(["update:modelValue"]);

function handleInput(e: any) {
  emit('update:modelValue', e.target.value);
}
</script>

<style lang="scss">
@import '@/style/variables.scss', '@/style/fonts.scss';

.input-group {
  position: relative;

  input {
    background: #000;
    border: none;
    padding: 1em 1.2em;
    outline: none;
    color: #fff;
    font-size: $font-size-default;

    &.icon {
      padding-left: 3em;
    }
  }

  svg {
    position: absolute;
    width: 1.5em;
    left: .75em;
    top: 50%;
    transform: translateY(-50%);
    height: auto;
  }
}
</style>
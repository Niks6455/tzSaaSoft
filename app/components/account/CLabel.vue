<script setup lang="ts">
  interface Props {
    title: string
    required?: boolean
  }

  defineProps<Props>()
</script>

<template>
  <label class="block text-sm font-medium text-gray-700 mb-1">
    {{ title }}
    <span class="text-red-500" v-if="required">*</span>
    <slot />
  </label>
</template>

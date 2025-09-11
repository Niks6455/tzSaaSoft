<script setup lang="ts">
  import type { Account } from '~/types/types'
  import CLabel from './CLabel.vue'

  interface Props {
    modelValue: string
    isEditing: boolean
    error?: string | null
    account: Account
    required?: boolean
  }

  interface Emits {
    (e: 'update:modelValue', value: string): void
  }

  defineProps<Props>()
  defineEmits<Emits>()
</script>

<template>
  <div>
    <CLabel title="Логин" required />
    <div v-if="!isEditing">
      {{ account.login }}
    </div>
    <div v-else>
      <InputText
        :model-value="modelValue"
        @update:model-value="(val) => $emit('update:modelValue', val || '')"
        class="w-full"
        placeholder="Логин"
      />
      <small v-if="error" class="text-red-500">{{ error }}</small>
    </div>
  </div>
</template>

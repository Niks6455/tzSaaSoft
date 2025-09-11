<script setup lang="ts">
  import type { Account } from '~/types/types'
  import CLabel from './CLabel.vue'

  interface Props {
    modelValue: string
    isEditing: boolean
    isVisible: boolean
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
  <div v-if="isVisible">
    <CLabel title="Пароль" required />
    <div v-if="!isEditing">
      <template v-if="account.password">
        <span v-for="n in account.password.length" :key="n">•</span>
      </template>
      <template v-else>-</template>
    </div>
    <div v-else>
      <Password
        :model-value="modelValue"
        @update:model-value="(val) => $emit('update:modelValue', val || '')"
        class="w-full"
        toggle-mask
        placeholder="Введите пароль"
      />
      <small v-if="error" class="text-red-500">{{ error }}</small>
    </div>
  </div>
</template>

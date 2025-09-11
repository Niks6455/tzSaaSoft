<script setup lang="ts">
  import type { Account } from '~/types/types'
  import CLabel from './CLabel.vue'

  interface Props {
    modelValue: string
    isEditing: boolean
    error?: string | null
    account: Account
  }

  interface Emits {
    (e: 'update:modelValue', value: string): void
  }

  defineProps<Props>()
  defineEmits<Emits>()
</script>

<template>
  <div>
    <CLabel title="Метки" required>
      <i
        v-if="isEditing"
        class="pi pi-question-circle text-gray-400 ml-2 cursor-pointer"
        v-tooltip="
          'Для указания нескольких меток для одной пары Логин/Пароль используйте разделитель ;'
        "
      />
    </CLabel>

    <div v-if="!isEditing" class="flex flex-wrap gap-1">
      <span
        v-if="account.label.length !== 0"
        v-for="(tag, i) in account.label"
        :key="i"
        class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
      >
        {{ tag.text }}
      </span>
      <p v-else class="text-xs text-gray-500">Меток нет</p>
    </div>
    <div v-else>
      <InputText
        :model-value="modelValue"
        @update:model-value="(val) => $emit('update:modelValue', val || '')"
        class="w-full"
        :class="{ 'p-invalid': error }"
      />
      <small v-if="error" class="text-red-500">{{ error }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Account } from '~/types/types'
  import type { SelectOption } from '~/types/types'
  import CLabel from './CLabel.vue'

  interface Props {
    modelValue: string
    isEditing: boolean
    recordTypeOptions: SelectOption[]
    getRecordTypeLabel: (type: string) => string
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
    <CLabel title="Тип записи" required />
    <div v-if="!isEditing">
      {{ getRecordTypeLabel(account.recordType) }}
    </div>
    <div v-else>
      <Select
        :model-value="modelValue"
        @update:model-value="(val) => $emit('update:modelValue', val)"
        :options="recordTypeOptions"
        option-label="title"
        option-value="id"
        class="w-full"
        :class="{ 'p-invalid': error }"
      />
      <small v-if="error" class="text-red-500">{{ error }}</small>
    </div>
  </div>
</template>

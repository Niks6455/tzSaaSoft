<script setup lang="ts">
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'

  interface Props {
    title?: string
    message?: string
  }

  interface Emits {
    (e: 'delete-account'): void
  }

  defineProps<Props>()
  defineEmits<Emits>()

  const visible = defineModel<boolean>('visible', { required: true })

  const closeDialog = () => {
    visible.value = false
  }
</script>

<template>
  <Dialog v-model:visible="visible" :header="title" :draggable="false" :dismissable-mask="true">
    <div class="flex flex-col gap-4">
      <p class="text-gray-600">{{ message }}</p>
    </div>

    <template #footer>
      <Button label="Отмена" icon="pi pi-times" @click="closeDialog" class="p-button-text" />
      <Button
        label="Удалить"
        icon="pi pi-check"
        @click="$emit('delete-account')"
        class="p-button-danger"
      />
    </template>
  </Dialog>
</template>

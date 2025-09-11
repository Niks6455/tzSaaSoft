<script setup lang="ts">
  import type { Account } from '~/types/types'

  interface ButtonConfig {
    icon: string
    action: () => void
    severity?: string
    label: string
  }

  interface Props {
    account: Account
    getActionButtons: (account: Account) => ButtonConfig[]
  }

  const { isMobile } = useWindowWidth()

  defineProps<Props>()
</script>

<template>
  <div class="flex flex-col justify-center items-center mt-4 lg:mt-0">
    <div class="flex gap-2 items-center">
      <Button
        v-for="(btn, i) in getActionButtons(account)"
        :key="i"
        :icon="btn.icon"
        :severity="btn.severity || 'primary'"
        :label="isMobile ? btn.label : ''"
        size="small"
        @click="btn.action"
      />
    </div>
  </div>
</template>

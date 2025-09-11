<script setup lang="ts">
  import { InputText } from 'primevue'
  import { useAccounts } from '~/composables/useAccounts'
  import { useFormData } from '~/stores/useFormData.store'
  import { ref, computed } from 'vue'

  const formDataStore = useFormData()
  const { addAccount } = useAccounts()
  const search = ref('')

  const filteredAccounts = computed(() => {
    if (!search.value) {
      return formDataStore.accounts
    }

    const searchTerm = search.value.toLowerCase()
    return formDataStore.accounts.filter((account) =>
      account.login.toLowerCase().includes(searchTerm)
    )
  })

  const exportAccount = () => {
    const json = JSON.stringify(formDataStore.accounts)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'accounts.json'
    link.click()
    URL.revokeObjectURL(url)
  }
</script>

<template>
  <div class="p-2 lg:p-10">
    <div class="border border-gray-300 p-5 rounded-xl w-full">
      <div class="block md:flex justify-between items-start">
        <div class="flex gap-2 items-start md:items-center md:flex-row flex-col">
          <h1 class="text-2xl">Учетные записи</h1>
          <div>
            <InputText
              v-model="search"
              placeholder="Введите Login"
              class="w-full lg:w-auto"
              icon="pi pi-search"
              type="text"
            />
          </div>
        </div>

        <div class="flex gap-2 mt-2 md;:mt-0">
          <Button
            label="Добавить"
            icon="pi pi-plus"
            icon-pos="left"
            @click="addAccount()"
            class="!text-sm"
          />
          <Button
            label="Экспорт"
            icon="pi pi-file-export"
            icon-pos="right"
            class="!text-sm"
            @click="exportAccount()"
          />
        </div>
      </div>

      <AccountList :accounts="filteredAccounts" />
    </div>
  </div>
</template>

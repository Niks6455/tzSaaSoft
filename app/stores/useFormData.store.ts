import { defineStore } from 'pinia'
import type { Account } from '~/types/types'

export const useFormData = defineStore(
  'formData',
  () => {
    const accounts = ref<Account[]>([])

    const addAccount = (account: Omit<Account, 'id'>) => {
      accounts.value.push({
        id: Date.now().toString(),
        ...account,
      })
    }

    const updateAccount = (id: string, updates: Partial<Account>) => {
      const index = accounts.value.findIndex((account) => account.id === id)
      if (index !== -1) {
        accounts.value[index] = { ...accounts.value[index], ...updates } as Account
      }
    }

    const deleteAccount = (id: string) => {
      accounts.value = accounts.value.filter((account) => account.id !== id)
    }

    const setAccountEditing = (id: string, isEditing: boolean) => {
      const account = accounts.value.find((account) => account.id === id)
      if (account) {
        account.isEditing = isEditing
      }
    }

    return {
      accounts,
      addAccount,
      updateAccount,
      deleteAccount,
      setAccountEditing,
    }
  },
  {
    persist: true,
  }
)

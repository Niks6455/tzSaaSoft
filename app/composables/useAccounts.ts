import { ref, watch } from 'vue'
import { useFormData } from '~/stores/useFormData.store'
import type { Account } from '~/types/types'
import { RecordType } from '~/enums/recordTypes'
import { accountSchema } from '~/schemas/account.schema'
import type { ZodError } from 'zod'

export const useAccounts = () => {
  const formData = useFormData()
  const editableAccounts = ref<Record<string, Account & { labelStr?: string }>>({})
  const accountErrors = ref<Record<string, ZodError | null>>({})

  watch(
    () => formData.accounts,
    (newAccounts) => {
      const currentAccountIds = new Set(newAccounts.map((a) => a.id))

      // удаляем отсутствующие
      Object.keys(editableAccounts.value).forEach((id) => {
        if (!currentAccountIds.has(id)) {
          delete editableAccounts.value[id]
          delete accountErrors.value[id]
        }
      })

      // обновляем существующие / создаем новые
      newAccounts.forEach((account) => {
        const existing = editableAccounts.value[account.id]

        if (existing?.isEditing) {
          editableAccounts.value[account.id] = {
            ...account,
            labelStr: existing.labelStr,
            login: existing.login,
            password: existing.password,
            recordType: existing.recordType,
            isEditing: true,
          }
        } else {
          editableAccounts.value[account.id] = {
            ...account,
            labelStr: Array.isArray(account.label)
              ? account.label.map((l) => l.text).join(';')
              : typeof account.label === 'string'
                ? account.label
                : '',
          }
        }
      })
    },
    { immediate: true, deep: true }
  )

  const addAccount = () => {
    const id = `new-${Date.now()}`
    const newAccount: Account = {
      id,
      label: [],
      recordType: RecordType.LOCAL,
      login: '',
      password: '',
      isEditing: true,
    }
    formData.accounts.push(newAccount)
    editableAccounts.value[id] = {
      ...newAccount,
      labelStr: '',
      isEditing: true,
    }
    accountErrors.value[id] = null
  }

  const startAccountEdit = (id: string) => {
    const account = formData.accounts.find((a) => a.id === id)
    if (account) {
      editableAccounts.value[id] = {
        ...account,
        labelStr: Array.isArray(account.label)
          ? account.label.map((l) => l.text).join(';')
          : typeof account.label === 'string'
            ? account.label
            : '',
      }
      formData.setAccountEditing(id, true)
      accountErrors.value[id] = null
    }
  }

  const validateAccount = (id: string) => {
    const account = editableAccounts.value[id]
    if (!account) return true

    try {
      accountSchema.parse({
        labelStr: account.labelStr,
        recordType: account.recordType,
        login: account.login,
        password: account.recordType === RecordType.LDAP ? '' : account.password,
      })
      accountErrors.value[id] = null
      return true
    } catch (error) {
      accountErrors.value[id] = error as ZodError
      return false
    }
  }

  const saveAccountChanges = (id: string) => {
    const updated = editableAccounts.value[id]
    if (!updated) return

    if (!validateAccount(id)) {
      return
    }

    const labelArr =
      updated.labelStr
        ?.split(';')
        .map((l) => ({ text: l.trim() }))
        .filter((l) => l.text) || []

    const accountToSave: Partial<Account> = {
      ...updated,
      label: labelArr,
      password: updated.recordType === RecordType.LDAP ? null : updated.password,
    }

    formData.updateAccount(id, accountToSave)
    formData.setAccountEditing(id, false)
    accountErrors.value[id] = null
  }

  const deleteAccount = (id: string) => {
    formData.deleteAccount(id)
    delete editableAccounts.value[id]
    delete accountErrors.value[id]
  }

  const updateEditableAccountField = (
    id: string,
    field: keyof Account | 'labelStr',
    value: any
  ) => {
    if (editableAccounts.value[id]) {
      editableAccounts.value[id] = {
        ...editableAccounts.value[id],
        [field]: value,
      }

      if (accountErrors.value[id]) {
        const errors = accountErrors.value[id]
        if (errors && 'issues' in errors) {
          errors.issues = errors.issues.filter((issue) => !issue.path.includes(field as string))
          if (errors.issues.length === 0) {
            accountErrors.value[id] = null
          }
        }
      }
    }
  }

  const getFieldError = (id: string, fieldName: string) => {
    const errors = accountErrors.value[id]
    if (!errors || !('issues' in errors)) return null

    const fieldError = errors.issues.find((issue) => issue.path.includes(fieldName))

    return fieldError?.message || null
  }

  return {
    formData,
    editableAccounts,
    accountErrors,
    addAccount,
    startAccountEdit,
    saveAccountChanges,
    deleteAccount,
    updateEditableAccountField,
    validateAccount,
    getFieldError,
  }
}

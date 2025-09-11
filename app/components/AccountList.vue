<script setup lang="ts">
  import { useAccounts } from '~/composables/useAccounts'
  import { useRecordTypes } from '~/composables/useRecordTypes'
  import { RecordType } from '~/enums/recordTypes'
  import type { Account } from '~/types/types'
  import AccountLabel from './account/AccountLabel.vue'
  import AccountRecordType from './account/AccountRecordType.vue'
  import AccountLogin from './account/AccountLogin.vue'
  import AccountPassword from './account/AccountPassword.vue'
  import AccountActions from './account/AccountActions.vue'
  import ConfirmDeleteDialog from './ConfirmDeleteDialog.vue'
  import { ref } from 'vue'

  interface Props {
    accounts?: Account[]
  }

  defineProps<Props>()

  const {
    formData,
    editableAccounts,
    startAccountEdit,
    saveAccountChanges,
    deleteAccount,
    updateEditableAccountField,
    getFieldError,
  } = useAccounts()

  const { recordTypeOptions, getRecordTypeLabel } = useRecordTypes()

  const [visible, setVisible] = useToggle(false)
  const accountToDelete = ref<string | null>(null)

  const isVisible = (recordType: string | undefined): boolean => {
    return recordType === RecordType.LOCAL
  }

  const showDeleteDialog = (id: string) => {
    accountToDelete.value = id
    setVisible(true)
  }

  const deleteConnfirmation = () => {
    if (accountToDelete.value) {
      deleteAccount(accountToDelete.value)
      accountToDelete.value = null
    }
    setVisible(false)
  }

  const getActionButtons = (account: Account) => {
    return account.isEditing
      ? [
          {
            icon: 'pi pi-check',
            action: () => saveAccountChanges(account.id),
            severity: 'success',
            label: 'Сохранить',
          },
          {
            icon: 'pi pi-trash',
            action: () => showDeleteDialog(account.id),
            severity: 'danger',
            label: 'Удалить',
          },
        ]
      : [
          {
            icon: 'pi pi-pencil',
            action: () => startAccountEdit(account.id),
            label: 'Редактировать',
          },
          {
            icon: 'pi pi-trash',
            action: () => showDeleteDialog(account.id),
            severity: 'danger',
            label: 'Удалить',
          },
        ]
  }
</script>

<template>
  <div class="mt-6">
    <div v-if="(accounts || formData.accounts).length === 0" class="text-center py-8 text-gray-500">
      <p>Нет учетных записей. Нажмите "Добавить" для создания новой.</p>
    </div>

    <div v-else class="space-y-4 h-[78vh] overflow-y-auto">
      <div
        v-for="account in accounts || formData.accounts"
        :key="account.id"
        class="border border-gray-300 rounded-lg p-4"
      >
        <div class="block md:flex justify-between items-start gap-4">
          <div
            class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start relative md:pl-10"
          >
            <div class="absolute -top-2 -left-2 hidden md:block">
              <p class="font-bold">{{ account.id.slice(-3) }}</p>
            </div>

            <AccountLabel
              :account="account"
              :model-value="editableAccounts[account.id]?.labelStr || ''"
              :is-editing="!!account.isEditing"
              :error="getFieldError(account.id, 'labelStr')"
              @update:model-value="
                (value) => updateEditableAccountField(account.id, 'labelStr', value)
              "
            />

            <AccountRecordType
              :account="account"
              :model-value="editableAccounts[account.id]?.recordType || ''"
              :is-editing="!!account.isEditing"
              :record-type-options="recordTypeOptions"
              :get-record-type-label="getRecordTypeLabel"
              :error="getFieldError(account.id, 'recordType')"
              @update:model-value="
                (value) => updateEditableAccountField(account.id, 'recordType', value)
              "
              required
            />

            <AccountLogin
              :account="account"
              :model-value="editableAccounts[account.id]?.login || ''"
              :is-editing="!!account.isEditing"
              :error="getFieldError(account.id, 'login')"
              @update:model-value="
                (value) => updateEditableAccountField(account.id, 'login', value)
              "
              :class="
                isVisible(editableAccounts[account.id]?.recordType)
                  ? 'lg:col-span-1'
                  : 'lg:col-span-2'
              "
              required
            />

            <AccountPassword
              :account="account"
              :model-value="editableAccounts[account.id]?.password || ''"
              :is-editing="!!account.isEditing"
              :is-visible="isVisible(editableAccounts[account.id]?.recordType)"
              :error="getFieldError(account.id, 'password')"
              @update:model-value="
                (value) => updateEditableAccountField(account.id, 'password', value)
              "
              required
            />
          </div>

          <AccountActions :account="account" :get-action-buttons="getActionButtons" />
        </div>
      </div>

      <ConfirmDeleteDialog
        v-model:visible="visible"
        title="Удаление"
        message="Вы уверены, что хотите удалить эту учётную запись?"
        @delete-account="deleteConnfirmation"
      />
    </div>
    <p class="mt-4">
      Всего записей: <strong>{{ (accounts || formData.accounts).length }}</strong>
    </p>
  </div>
</template>

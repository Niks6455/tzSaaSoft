import { RecordTypeLabels, RecordTypeOptions } from '~/enums/recordTypes'

export const useRecordTypes = () => {
  const getRecordTypeLabel = (type: string) => {
    return RecordTypeLabels[type as keyof typeof RecordTypeLabels] || type
  }

  return {
    recordTypeOptions: RecordTypeOptions,
    getRecordTypeLabel,
  }
}

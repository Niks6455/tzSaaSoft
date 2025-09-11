export enum RecordType {
  LDAP = 'LDAP',
  LOCAL = 'local',
}

export const RecordTypeLabels: Record<RecordType, string> = {
  [RecordType.LDAP]: 'LDAP',
  [RecordType.LOCAL]: 'Локальная',
}

export const RecordTypeOptions = Object.values(RecordType).map((type) => ({
  id: type,
  title: RecordTypeLabels[type],
}))

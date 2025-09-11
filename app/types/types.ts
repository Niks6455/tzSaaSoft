export type NonEmptyArray<T> = [T, ...T[]]
export type Nullable<T> = T | null

export interface Entity {
  id: string | number
  title: string
}

export interface SelectOption {
  id: string | number
  title: string
}

export type Account = {
  id: string
  label: { text: string }[]
  recordType: string
  login: string
  password?: string | null
  isEditing?: boolean
}

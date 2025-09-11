import { z } from 'zod'
import { RecordType } from '../enums/recordTypes'

export const accountSchema = z
  .object({
    labelStr: z.string().max(50, 'Метка не должна превышать 50 символов').optional(),
    recordType: z.nativeEnum(RecordType).or(z.string()).optional(),
    login: z
      .string()
      .min(1, 'Логин обязателен к заполнению')
      .max(100, 'Логин не должен превышать 100 символов'),
    password: z.string().max(100, 'Пароль не должен превышать 100 символов'),
  })
  .refine(
    (data) => {
      if (data.recordType === RecordType.LOCAL) {
        return data.password && data.password.length > 0
      }
      return true
    },
    {
      message: 'Пароль обязателен для локальной учетной записи',
      path: ['password'],
    }
  )

export type AccountFormData = z.infer<typeof accountSchema>
export type AccountFormErrors = z.ZodError<AccountFormData> | null

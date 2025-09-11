import { describe, it, expect } from 'vitest'
import { accountSchema } from '../schemas/account.schema'
import { RecordType } from '../enums/recordTypes'

describe('Валидация схемы аккаунта', () => {
  it('валидирует корректные LOCAL аккаунты', () => {
    const validData = {
      labelStr: 'test;label',
      recordType: RecordType.LOCAL,
      login: 'testuser',
      password: 'testpassword',
    }

    expect(() => accountSchema.parse(validData)).not.toThrow()
  })

  it('валидирует корректные LDAP аккаунты', () => {
    const validData = {
      labelStr: 'test;label',
      recordType: RecordType.LDAP,
      login: 'testuser',
      password: '', // Пароль может быть пустым для LDAP
    }

    expect(() => accountSchema.parse(validData)).not.toThrow()
  })

  it('отклоняет LOCAL аккаунты без пароля', () => {
    const invalidData = {
      labelStr: 'test;label',
      recordType: RecordType.LOCAL,
      login: 'testuser',
      password: '',
    }

    expect(() => accountSchema.parse(invalidData)).toThrow()
  })

  it('отклоняет аккаунты с логином более 100 символов', () => {
    const invalidData = {
      labelStr: 'test;label',
      recordType: RecordType.LOCAL,
      login: 'a'.repeat(101), // 101 символ
      password: 'testpassword',
    }

    expect(() => accountSchema.parse(invalidData)).toThrow()
  })

  it('отклоняет аккаунты с меткой более 50 символов', () => {
    const invalidData = {
      labelStr: 'a'.repeat(51), // 51 символ
      recordType: RecordType.LOCAL,
      login: 'testuser',
      password: 'testpassword',
    }

    expect(() => accountSchema.parse(invalidData)).toThrow()
  })

  it('отклоняет аккаунты с паролем более 100 символов', () => {
    const invalidData = {
      labelStr: 'test;label',
      recordType: RecordType.LOCAL,
      login: 'testuser',
      password: 'a'.repeat(101), // 101 символ
    }

    expect(() => accountSchema.parse(invalidData)).toThrow()
  })

  it('отклоняет аккаунты без логина', () => {
    const invalidData = {
      labelStr: 'test;label',
      recordType: RecordType.LOCAL,
      login: '',
      password: 'testpassword',
    }

    expect(() => accountSchema.parse(invalidData)).toThrow()
  })

  describe('Дополнительные положительные сценарии', () => {
    it('валидирует LOCAL аккаунт с пустой меткой', () => {
      const validData = {
        labelStr: '',
        recordType: RecordType.LOCAL,
        login: 'testuser',
        password: 'testpassword',
      }

      expect(() => accountSchema.parse(validData)).not.toThrow()
    })

    it('валидирует LOCAL аккаунт с максимальной длиной метки', () => {
      const validData = {
        labelStr: 'a'.repeat(50), // 50 символов
        recordType: RecordType.LOCAL,
        login: 'testuser',
        password: 'testpassword',
      }

      expect(() => accountSchema.parse(validData)).not.toThrow()
    })

    it('валидирует LOCAL аккаунт с максимальной длиной логина', () => {
      const validData = {
        labelStr: 'test;label',
        recordType: RecordType.LOCAL,
        login: 'a'.repeat(100), // 100 символов
        password: 'testpassword',
      }

      expect(() => accountSchema.parse(validData)).not.toThrow()
    })

    it('валидирует LOCAL аккаунт с максимальной длиной пароля', () => {
      const validData = {
        labelStr: 'test;label',
        recordType: RecordType.LOCAL,
        login: 'testuser',
        password: 'a'.repeat(100), // 100 символов
      }

      expect(() => accountSchema.parse(validData)).not.toThrow()
    })

    it('валидирует LDAP аккаунт с непустым паролем', () => {
      const validData = {
        labelStr: 'test;label',
        recordType: RecordType.LDAP,
        login: 'testuser',
        password: 'somepassword',
      }

      expect(() => accountSchema.parse(validData)).not.toThrow()
    })

    it('валидирует аккаунт без типа записи', () => {
      const validData = {
        labelStr: 'test;label',
        login: 'testuser',
        password: 'testpassword',
      }

      expect(() => accountSchema.parse(validData)).not.toThrow()
    })

    it('валидирует аккаунт со строковым типом записи', () => {
      const validData = {
        labelStr: 'test;label',
        recordType: 'SOME_STRING_TYPE',
        login: 'testuser',
        password: 'testpassword',
      }

      expect(() => accountSchema.parse(validData)).not.toThrow()
    })
  })

  // Дополнительные отрицательные тесты
  describe('Дополнительные отрицательные сценарии', () => {
    it('отклоняет LOCAL аккаунты с null паролем', () => {
      const invalidData = {
        labelStr: 'test;label',
        recordType: RecordType.LOCAL,
        login: 'testuser',
        password: null as any,
      }

      expect(() => accountSchema.parse(invalidData)).toThrow()
    })

    it('отклоняет LDAP аккаунты с null логином', () => {
      const invalidData = {
        labelStr: 'test;label',
        recordType: RecordType.LDAP,
        login: null as any,
        password: '',
      }

      expect(() => accountSchema.parse(invalidData)).toThrow()
    })

    it('отклоняет аккаунты с пустыми полями', () => {
      const invalidData = {
        labelStr: '',
        login: '',
        password: '',
      } as any

      expect(() => accountSchema.parse(invalidData)).toThrow()
    })
  })
})

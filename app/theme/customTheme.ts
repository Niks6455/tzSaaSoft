import { definePreset } from '@primeuix/styled'
import Aura from '@primevue/themes/aura'

const preset = definePreset(Aura, {
  primitive: {
    primary: {
      50: 'var(--primary-50)',
      100: 'var(--primary-100)',
      500: 'var(--primary-500)',
      600: 'var(--primary-600)',
      700: 'var(--primary-700)',
      800: 'var(--primary-800)',
      900: 'var(--primary-900)',
      950: 'var(--primary-950)',
    },
  },
  semantic: {
    primary: {
      50: 'var(--primary-50)',
      100: 'var(--primary-100)',
      500: 'var(--primary-500)',
      600: 'var(--primary-600)',
      700: 'var(--primary-700)',
      800: 'var(--primary-800)',
      900: 'var(--primary-900)',
      950: 'var(--primary-950)',
    },
    colorScheme: {
      light: {
        surface: {
          50: 'var(--surface-50)',
          100: 'var(--surface-100)',
          200: 'var(--surface-200)',
          0: '#ffffff',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
      },
    },
  },
  components: {
    form: {
      field: {
        placeholder: {
          color: 'rgba(80, 80, 84, 0.5)',
        },
      },
    },
    inputtext: {
      border: {
        radius: '{border.radius.xl}',
      },
      focus: {
        border: {
          color: 'var(--primary-600)',
        },
      },
    },
    button: {
      border: {
        radius: '{border.radius.xl}',
      },
      background: {
        color: 'var(--primary-500)',
        hoverColor: 'var(--primary-600)',
        focusColor: 'var(--primary-600)',
        activeColor: 'var(--primary-600)',
        pressedColor: 'var(--primary-600)',
      },
      text: {
        color: 'white',
      },
      focus: {
        ring: {
          color: 'var(--primary-100)',
        },
      },
    },
    dialog: {
      header: {
        padding: '1.25rem 1.25rem 0 1.25rem',
        background: 'var(--surface-100)',
        text: {
          color: 'var(--text-primary)',
        },
      },
    },
    toast: {
      width: '20rem',
      background: 'var(--surface-50)',
      summary: {
        font: {
          size: '0.875rem',
        },
        color: 'var(--text-primary)',
      },
      detail: {
        font: {
          size: '0.76rem',
        },
        color: 'var(--text-secondary)',
      },
      text: {
        gap: '0',
      },
    },
    select: {
      border: {
        radius: '{border.radius.xl}',
      },
      focus: {
        border: {
          color: 'var(--primary-600)',
        },
      },
      option: {
        selected: {
          color: 'white',
          background: 'var(--primary-500)',
          focus: {
            color: 'white',
            background: 'var(--primary-600)',
          },
        },
        border: {
          radius: '{border.radius.xs}',
        },
        padding: '.25rem .5rem',
      },
      overlay: {
        border: {
          radius: '{border.radius.sm}',
          color: 'var(--surface-200)',
        },
        background: 'var(--surface-0)',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
      },
    },
  },
})

export default {
  preset,
  options: {
    darkModeSelector: false,
  },
}

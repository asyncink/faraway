import { NameModal } from 'components/name-modal'

export const enum ModalKey {
  NAME = 'name'
}

export const MODALS = {
  [ModalKey.NAME]: NameModal
}

declare module '@mantine/modals' {
  export interface MantineModalsOverride {
    modals: typeof MODALS
  }
}

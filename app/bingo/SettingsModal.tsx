import * as React from 'react'
import type { ModalProps } from '~/Modal';
import { Modal } from '~/Modal'

export const SettingsModal = (props: Omit<ModalProps, 'children'>) => {
  return (
    <Modal
      onRequestClose={props.onRequestClose}
    >
      <h1>Settings</h1>
      <p>
        Were you hoping this game could be configured somehow?
      </p>
    </Modal>
  )
}
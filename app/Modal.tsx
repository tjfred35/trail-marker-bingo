import * as React from 'react'
import { CloseIcon } from './icons/CloseIcon'
import { createPortal } from 'react-dom'

export interface ModalProps {
  children: React.ReactNode
  onRequestClose?: () => void
}

export const Modal = ({
  children,
  onRequestClose
}: ModalProps) => {
  return createPortal(
    <div
      className='modal-overlay'
      onClick={() => onRequestClose && onRequestClose()}
    >
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          {onRequestClose && (
            <button className='icon-button modal-close' onClick={onRequestClose}>
              <CloseIcon />
            </button>
          )}
        </div>
        <div className='modal-body'>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('portals')!
  )
}
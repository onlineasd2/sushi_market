import React, { ReactNode } from 'react'
import './../styles/components/_modal.scss';

interface ModalProps {
    children: ReactNode; // Тип для дочерних элементов
  }

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <>
        <div className="overlay">
            <div className="modal">
                { children }
            </div>
        </div>
    </>
  )
}

export default Modal;

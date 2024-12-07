"use client";

import React, { ReactNode } from "react";
import "./styles.scss";

interface ModalProps {
    children: ReactNode; // Тип для дочерних элементов
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
    /* Функционал модального окна */
    const [isModalActive, setIsModalActive] = React.useState(false);

    const toggleModal = () => {
        setIsModalActive(!isModalActive);
    };
    /* Функционал модального окна */

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
            onClick={toggleModal}
            role="button"
            tabIndex={0}
            className={`overlay ${isModalActive ? "active" : ""}`}
            aria-label="Modal window"
        >
            <span className="modal__element" />
            <div className="modal">{children}</div>
        </div>
    );
};

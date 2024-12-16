"use client";

import React, { ReactNode } from "react";
import "./styles.scss";

interface ModalProps {
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
    const [isModalActive, setIsModalActive] = React.useState(false);

    const toggleModal = () => {
        setIsModalActive(!isModalActive);
    };

    return (
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

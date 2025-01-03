"use client";

import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

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
            className={`${styles.overlay} ${isModalActive ? styles.active : ""}`}
            aria-label="Modal window"
        >
            <span className={styles.modal__element} />
            <div className={styles.modal}>{children}</div>
        </div>
    );
};

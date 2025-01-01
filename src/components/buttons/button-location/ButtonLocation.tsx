import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

export const ButtonLocation = ({ onClick, children }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${styles.button__location} ${styles.header__buttonLocation}`}
            tabIndex={0}
            aria-label="Кнопка"
        >
            {children}
        </button>
    );
};

import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

export const ButtonOrderCancel = ({ onClick, children }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${styles.button__orderCancel}`}
            tabIndex={0}
            aria-label="Кнопка"
        >
            <span>{"<"}</span>
            {children}
        </button>
    );
};

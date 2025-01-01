import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

export const ButtonOrder = ({ onClick, children }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${styles.button__order}`}
            tabIndex={0}
            aria-label="Кнопка"
        >
            {children}
            <span>{">"}</span>
        </button>
    );
};

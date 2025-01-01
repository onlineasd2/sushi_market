import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

export const ButtonIcon = ({
    onClick,
    children,
}: ButtonProps): React.JSX.Element => {
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${styles.button__mobile}`}
            tabIndex={0}
            aria-label="Кнопка"
        >
            {children}
        </button>
    );
};

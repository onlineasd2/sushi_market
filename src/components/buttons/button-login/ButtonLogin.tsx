import React from "react";
import "./styles.scss";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

export const ButtonLogin = ({ onClick, children }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="button button__login"
            tabIndex={0}
            aria-label="Кнопка"
        >
            {children}
        </button>
    );
};

import React from "react";
import "./styles.scss";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

export const ButtonLocation = ({ onClick, children }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="button button__location header__button-location"
            tabIndex={0}
            aria-label="Кнопка"
        >
            {children}
        </button>
    );
};

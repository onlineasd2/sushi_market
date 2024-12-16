import React from "react";
import "./styles.scss";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

export const ButtonCart = ({
    onClick,
    children,
}: ButtonProps): React.JSX.Element => {
    return (
        <button
            onClick={onClick}
            className="button button__cart"
            tabIndex={0}
            aria-label="Кнопка"
        >
            {children}
        </button>
    );
};

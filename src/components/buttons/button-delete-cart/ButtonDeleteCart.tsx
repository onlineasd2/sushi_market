import React from "react";
import "./styles.scss";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

export const ButtonDeleteCart = ({
    onClick,
    children,
}: ButtonProps): React.JSX.Element => {
    return (
        <button
            onClick={onClick}
            className="button button__trash"
            tabIndex={0}
            aria-label="Кнопка"
        >
            {children}
        </button>
    );
};

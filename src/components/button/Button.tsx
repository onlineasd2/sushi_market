import React from "react";
import "./styles.scss";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className: string;
}

export const Button = ({ onClick, children, className }: ButtonProps) => {
    return (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <button
            onClick={onClick}
            className={className}
            tabIndex={0}
            aria-label="Кнопка"
        >
            {children}
        </button>
    );
};

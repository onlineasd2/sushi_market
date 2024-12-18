import React from "react";
import "./styles.scss";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

export const ButtonOrderCancel = ({ onClick, children }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="button button__order-cancel"
            tabIndex={0}
            aria-label="Кнопка"
        >
            <span>{"<"}</span>
            {children}
        </button>
    );
};

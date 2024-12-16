import React from "react";
import "./styles.scss";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
}

export const ButtonIcon = ({
    onClick,
    children,
}: ButtonProps): React.JSX.Element => {
    return (
        // eslint-disable-next-line jsx-a11y/no-redundant-roles
        <button
            onClick={onClick}
            className="button button__mobile"
            tabIndex={0}
            aria-label="Кнопка"
        >
            {children}
        </button>
    );
};

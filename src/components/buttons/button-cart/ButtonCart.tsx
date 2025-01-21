"use client";

import React from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

interface ButtonProps {
    onClick?: () => void;
    ref?: React.Ref<HTMLButtonElement>;
    value?: number;
}

export const ButtonCart = ({
    onClick,
    ref,
    value,
}: ButtonProps): React.JSX.Element => {
    return (
        <Link href="/cart">
            <button
                onClick={onClick}
                className={`${styles.button} ${styles.button__cart}`}
                tabIndex={0}
                aria-label="Кнопка"
                ref={ref}
            >
                {`${value ? `Корзина | ${value}` : `Корзина`}`}
            </button>
        </Link>
    );
};

"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import styles from "./styles.module.scss";

interface ButtonProps {
    onClick?: () => void;
    ref?: React.Ref<HTMLButtonElement>;
}

export const ButtonCart = ({
    onClick,
    ref,
}: ButtonProps): React.JSX.Element => {
    const orders = useSelector((state: RootState) => state.cart.orders);

    const totalCount = orders.reduce((acc, order) => acc + order.count, 0);

    return (
        <Link href="/cart">
            <button
                onClick={onClick}
                className={`${styles.button} ${styles.button__cart}`}
                tabIndex={0}
                aria-label="Кнопка"
                ref={ref}
            >
                {`${totalCount ? `Корзина | ${totalCount}` : `Корзина`}`}
            </button>
        </Link>
    );
};

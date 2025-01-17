"use client";

import React, { useEffect } from "react";
import { db } from "@/services/db";
import Link from "next/link";
import styles from "./styles.module.scss";

interface ButtonProps {
    onClick?: () => void;
    ref?: React.Ref<HTMLButtonElement>;
}

export const ButtonCart = ({
    onClick,
    ref,
}: ButtonProps): React.JSX.Element => {
    const [countOrders, setCountOrders] = React.useState<number>(0);
    const GetOrder = async () => {
        const res = await db.orders.toArray();
        setCountOrders(res.reduce((acc, order) => acc + order.count, 0));
    };

    useEffect(() => {
        GetOrder();
    }, []);

    return (
        <Link href="/cart">
            <button
                onClick={onClick}
                className={`${styles.button} ${styles.button__cart}`}
                tabIndex={0}
                aria-label="Кнопка"
                ref={ref}
            >
                {`${countOrders ? `Корзина | ${countOrders}` : `Корзина`}`}
            </button>
        </Link>
    );
};

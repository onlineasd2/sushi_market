"use client";

import React, { useEffect } from "react";
import { db } from "@/services/db";
import Link from "next/link";
import styles from "./styles.module.scss";

interface ButtonProps {
    onClick?: () => void;
}

export const ButtonCart = ({ onClick }: ButtonProps): React.JSX.Element => {
    const [countOrders, setCountOrders] = React.useState<number>(0);
    const GetOrder = async () => {
        setCountOrders(
            await db.orders.toArray().then((values) => {
                return values.length;
            })
        );
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
            >
                {`${countOrders ? `Корзина | ${countOrders}` : `Корзина`}`}
            </button>
        </Link>
    );
};

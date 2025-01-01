import React from "react";
import { db, Order } from "@/services/db";
import styles from "./styles.module.scss";

interface ButtonProps {
    children?: React.ReactNode;
    Order?: Order | null;
    clearAll?: boolean;
}

export const ButtonDeleteCart = ({
    children,
    Order,
    clearAll,
}: ButtonProps): React.JSX.Element => {
    const DeleteOrder = async (): Promise<void> => {
        await db.orders.delete(Order?.id);
    };
    const DeleteAllOrders = async (): Promise<void> => {
        await db.orders.clear();
    };
    return (
        <button
            onClick={clearAll ? DeleteAllOrders : DeleteOrder}
            className={`${styles.button} ${styles.button__trash}`}
            tabIndex={0}
            aria-label="Кнопка"
        >
            {children}
        </button>
    );
};

import React from "react";
import "./styles.scss";
import { db, Order } from "@/services/db";

interface ButtonProps {
    children: React.ReactNode;
    Order: Order | null;
}

export const ButtonDeleteCart = ({
    children,
    Order,
}: ButtonProps): React.JSX.Element => {
    const DeleteOrder = async (): Promise<void> => {
        await db.orders.delete(Order?.id);
    };
    return (
        <button
            onClick={DeleteOrder}
            className="button button__trash"
            tabIndex={0}
            aria-label="Кнопка"
        >
            {children}
        </button>
    );
};

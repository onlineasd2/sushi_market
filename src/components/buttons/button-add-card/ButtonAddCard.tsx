import "./styles.scss";
import React, { useEffect } from "react";
import { db } from "@/services/db";

interface ButtonProps {
    children?: React.ReactNode;
    keyCard: number;
}

export const ButtonAddCard = ({
    children,
    keyCard,
}: ButtonProps): React.JSX.Element => {
    const [toggleCounter, setToggleCounter] = React.useState(false);
    const [orderCount, setOrderCount] = React.useState(1);
    const [status, setStatus] = React.useState("");
    const [count, setCount] = React.useState(0);
    const [key, setKey] = React.useState(0);
    const [id, setId] = React.useState(0);

    const DeleteOrder = async (): Promise<void> => {
        await db.orders.delete(id);
    };

    const EditOrder = async (newOrderCount: number): Promise<void> => {
        await db.orders.update(id, {
            count: newOrderCount,
        });
    };

    const AddOrder = async () => {
        try {
            const newId = await db.orders.add({
                key,
                count,
            });
            setId(newId);
        } catch (error) {
            setStatus(`Error ${error}`);
        }
    };

    const handleOrderPlus = () => {
        if (orderCount < 10) {
            const newOrderCount = orderCount + 1;
            setOrderCount(orderCount + 1);
            EditOrder(newOrderCount);
        } else {
            const newOrderCount = 10;
            setOrderCount(10);
            EditOrder(newOrderCount);
        }
    };

    const handleOrderMinus = () => {
        if (orderCount === 1) {
            setToggleCounter(false);
            const newOrderCount = 0;
            EditOrder(newOrderCount);
            DeleteOrder();
        } else {
            const newOrderCount = orderCount - 1;
            setOrderCount(newOrderCount);
            EditOrder(newOrderCount);
        }
    };

    const handleAddCart = () => {
        setOrderCount(1);
        AddOrder();
        setToggleCounter(true);
    };

    const GetStateButton = async () => {
        try {
            const res = await db.orders.where("key").equals(keyCard).first();
            if (res?.key === keyCard) {
                setToggleCounter(true);
                setOrderCount(res.count);
                setId(res.id);
            } else setToggleCounter(false);
        } catch (error) {
            setStatus(`Error ${error}`);
        }
    };

    useEffect(() => {
        GetStateButton();
    });

    useEffect(() => {
        setCount(orderCount);
        setKey(keyCard);
    }, [keyCard, orderCount]);

    return toggleCounter ? (
        <div className="counter-order">
            <button className="button-counter" onClick={handleOrderMinus}>
                -
            </button>
            <h3 className="counter">
                <b>{status || orderCount}</b>
            </h3>
            <button className="button-counter" onClick={handleOrderPlus}>
                +
            </button>
        </div>
    ) : (
        <button
            onClick={handleAddCart}
            className="button button__add-cart"
            tabIndex={0}
            aria-label="Кнопка"
        >
            {children}
        </button>
    );
};

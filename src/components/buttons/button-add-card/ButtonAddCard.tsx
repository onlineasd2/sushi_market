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
    const [orderCount, setOrderCount] = React.useState(0);
    const [status, setStatus] = React.useState("");
    const [count, setCount] = React.useState(0);
    const [key, setKey] = React.useState(0);
    const [id, setId] = React.useState(0);

    const EditOrder = async () => {
        db.orders.update(id, {
            count: orderCount,
        });
    };
    const AddOrder = async () => {
        try {
            setId(
                await db.orders.add({
                    key,
                    count: orderCount + 1,
                })
            );
            setStatus(`Count ${count} Key ${key}`);
        } catch (error) {
            setStatus(`Failed to add ${count}: ${error}`);
        }
    };

    const handleOrderPlus = () => {
        if (orderCount < 10) {
            setOrderCount(orderCount + 1);
            EditOrder();
        } else setOrderCount(10);

        setStatus(`Count ${count} Key ${key}`);
    };
    const handleOrderMinus = () => {
        if (orderCount === 1) setToggleCounter(false);
        else {
            setOrderCount(orderCount - 1);
            EditOrder();
        }
    };

    const handleAddCart = () => {
        setToggleCounter(true);
        setOrderCount(1);
        AddOrder();
    };
    useEffect(() => {
        setCount(orderCount);
        setKey(keyCard);
    }, [keyCard, orderCount]);
    return toggleCounter ? (
        <div className="counter-order">
            <p>{status}</p>
            <button className="button-counter" onClick={handleOrderMinus}>
                -
            </button>
            <h3 className="counter">
                <b>{orderCount}</b>
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

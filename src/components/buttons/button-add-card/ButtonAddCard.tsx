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
    const [status, setStatus] = React.useState("");
    const [count, setCount] = React.useState(1);
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
                count: 1,
            });
            setId(newId);
        } catch (error) {
            setStatus(`Error ${error}`);
        }
    };

    const handleOrderPlus = () => {
        if (count < 10) {
            const newOrderCount = count + 1;
            setCount(count + 1);
            EditOrder(newOrderCount);
        } else {
            const newOrderCount = 10;
            setCount(10);
            EditOrder(newOrderCount);
        }
    };

    const handleOrderMinus = () => {
        if (count <= 1) DeleteOrder();
        else {
            const newOrderCount = count - 1;
            setCount(newOrderCount);
            EditOrder(newOrderCount);
        }
    };

    const handleAddCart = () => {
        const newOrderCount = count + 1;
        setCount(1);
        EditOrder(newOrderCount);
        AddOrder();
    };

    const GetStateButton = async () => {
        try {
            const res = await db.orders.where("key").equals(keyCard).first();
            if (res?.key === keyCard) {
                setCount(res.count);
                setId(res.id);
            } else setCount(0);
        } catch (error) {
            setStatus(`Error ${error}`);
        }
    };

    useEffect(() => {
        GetStateButton();
    }, []);

    useEffect(() => {
        setCount(count);
        setKey(keyCard);
    }, [keyCard, count]);

    return count ? (
        <div className="counter-order">
            <button className="button-counter" onClick={handleOrderMinus}>
                -
            </button>
            <h3 className="counter">
                <b>{status || count}</b>
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

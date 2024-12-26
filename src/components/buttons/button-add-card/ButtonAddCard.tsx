import "./styles.scss";
import React from "react";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";

interface ButtonProps {
    value?: number;
    onChange?: (e: number) => void;
}

export const ButtonAddCard = ({
    value,
    onChange,
}: ButtonProps): React.JSX.Element => {
    // const DeleteOrder = async (): Promise<void> => {
    //     await db.orders.delete(id);
    // };
    // const addDB = async () => {
    //     try {
    //         await db.orders.add({
    //             name: order.title,
    //             weight: order.weight,
    //             key: order.id,
    //             count: 1,
    //             price: order.price,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    //
    const onCart = () => {
        onChange?.(1);
    };

    // const EditOrder = async (newOrderCount: number): Promise<void> => {
    //     await db.orders.update(id, {
    //         count: newOrderCount,
    //     });
    // };

    //
    // const handleAddCart = () => {
    //     const newOrderCount = count + 1;
    //     setCount(1);
    //     EditOrder(newOrderCount);
    //     AddOrder();
    // };
    //
    // const GetStateButton = async () => {
    //     try {
    //         const res = await db.orders.where("key").equals(Order.key).first();
    //         if (res?.key === Order.key) {
    //             setCount(res.count);
    //             if (res.id !== undefined) setId(res.id);
    //             // else setStatus("Status res.id undefined");
    //         } else setCount(0);
    //     } catch (error) {
    //         console.log(error);
    //         // setStatus(`Error ${error}`);
    //     }
    // };
    //
    // useEffect(() => {
    //     GetStateButton();
    // }, []);
    //
    // useEffect(() => {
    //     addDB();
    //     console.log("count", count);
    // }, [count);

    return value !== 0 ? (
        <ButtonCounter onChange={onChange} value={value} />
    ) : (
        <button
            onClick={onCart}
            className="button button__add-cart"
            tabIndex={0}
            aria-label="Кнопка в корзину"
        >
            В корзину
        </button>
    );
};

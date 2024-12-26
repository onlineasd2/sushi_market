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

    const onCart = () => {
        onChange?.(1);
    };

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

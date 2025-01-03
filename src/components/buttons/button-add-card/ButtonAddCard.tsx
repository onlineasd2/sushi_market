import React from "react";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";
import styles from "./styles.module.scss";

interface ButtonProps {
    value?: number;
    onChange?: (e: number) => void;
}

export const ButtonAddCard = ({
    value,
    onChange,
}: ButtonProps): React.JSX.Element => {
    const onCart = () => {
        onChange?.(1);
    };

    return value !== 0 ? (
        <ButtonCounter onChange={onChange} value={value} />
    ) : (
        <button
            onClick={onCart}
            className={`${styles.button} ${styles.button__addCart}`}
            tabIndex={0}
            aria-label="Кнопка в корзину"
        >
            В корзину
        </button>
    );
};

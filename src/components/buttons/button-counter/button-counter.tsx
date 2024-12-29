import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
    value?: number;
    onChange?: (e: number) => void;
}

export const ButtonCounter = ({
    value,
    onChange,
}: ButtonProps): React.JSX.Element => {
    const onAdd = () => {
        onChange?.(1);
    };
    const onRemove = () => {
        onChange?.(-1);
    };

    return (
        <div className={styles.counterOrder}>
            <button className={styles.buttonCounter} onClick={onRemove}>
                -
            </button>
            <h3 className={styles.counter}>{value}</h3>
            <button className={styles.buttonCounter} onClick={onAdd}>
                +
            </button>
        </div>
    );
};

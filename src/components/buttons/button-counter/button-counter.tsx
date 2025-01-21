import React from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
    value?: number;
    onChange?: (e: number) => void;
    disabled?: boolean;
}

export const ButtonCounter = ({
    value,
    onChange,
    disabled,
}: ButtonProps): React.JSX.Element => {
    const onAdd = () => {
        onChange?.(1);
    };
    const onRemove = () => {
        onChange?.(-1);
    };

    return (
        <div className={styles.counterOrder}>
            <button
                disabled={disabled}
                className={styles.buttonCounter}
                onClick={onRemove}
            >
                -
            </button>
            <h3 className={styles.counter}>{value}</h3>
            <button
                disabled={disabled}
                className={styles.buttonCounter}
                onClick={onAdd}
            >
                +
            </button>
        </div>
    );
};

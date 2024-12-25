import "./styles.scss";
import React from "react";

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
        <div className="counter-order">
            <button className="button-counter" onClick={onRemove}>
                -
            </button>
            <h3 className="counter">
                <b>{value}</b>
            </h3>
            <button className="button-counter" onClick={onAdd}>
                +
            </button>
        </div>
    );
};

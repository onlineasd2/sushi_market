import "./styles.scss";
import React from "react";

interface ButtonProps {
    children?: React.ReactNode;
}

export const ButtonAddCard = ({ children }: ButtonProps): React.JSX.Element => {
    const [toggleCounter, setToggleCounter] = React.useState(false);
    const [orderCount, setOrderCount] = React.useState(0);
    const handleAddCart = () => {
        setToggleCounter(true);
        setOrderCount(1);
    };
    const handleOrderPlus = () => {
        setOrderCount(orderCount < 10 ? orderCount + 1 : 10);
    };
    const handleOrderMinus = () => {
        if (orderCount === 1) setToggleCounter(false);
        else setOrderCount(1);
    };

    return toggleCounter ? (
        <div className="counter-order">
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

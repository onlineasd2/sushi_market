import "./styles.scss";
import React from "react";

export const ButtonListCart = (): React.JSX.Element => {
    const [orderCount, setOrderCount] = React.useState(1);

    const handleOrderPlus = () => {
        setOrderCount(orderCount < 10 ? orderCount + 1 : 10);
    };
    const handleOrderMinus = () => {
        if (orderCount > 1) setOrderCount(orderCount - 1);
    };

    return (
        <div className="counter-order">
            <button
                className={
                    orderCount === 1
                        ? "button-counter disable"
                        : "button-counter"
                }
                onClick={handleOrderMinus}
            >
                -
            </button>
            <h3 className="counter">
                <b>{orderCount}</b>
            </h3>
            <button className="button-counter" onClick={handleOrderPlus}>
                +
            </button>
        </div>
    );
};

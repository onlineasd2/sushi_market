import "./styles.scss";
import React, { useEffect } from "react";

export const ButtonListCart = (): React.JSX.Element => {
    const [orderCount, setOrderCount] = React.useState(1);
    const [activeCounter, setActiveCounter] = React.useState(false);

    const handleOrderPlus = () => {
        setOrderCount(orderCount < 10 ? orderCount + 1 : 10);
    };
    const handleOrderMinus = () => {
        if (orderCount > 1) setOrderCount(orderCount - 1);
    };

    useEffect(() => {
        if (orderCount === 1) setActiveCounter(true);
        else setActiveCounter(false);
    }, [orderCount]);

    return (
        <div className="counter-order">
            <button
                className={
                    activeCounter ? "button-counter disable" : "button-counter"
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

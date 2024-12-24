import "./styles.scss";
import React, { useEffect } from "react";
import { db, Sticks } from "@/services/db";

interface ButtonProps {
    props: Sticks;
}

export const ButtonListCartSticks = ({
    props,
}: ButtonProps): React.JSX.Element => {
    const [count, setCount] = React.useState<number>(1);

    const GetStickCount = async () => {
        try {
            const stick = await db.sticks.get(0);
            setCount(stick ? stick.count : 1);
        } catch (error) {
            console.error(error);
        }
    };

    const AddStick = async (_sticksOrder: Sticks) => {
        try {
            const countSticksDB = await db.sticks.toArray();
            if (countSticksDB.length === 0) await db.sticks.add(_sticksOrder);
        } catch (error) {
            console.log(error);
        }
    };

    const EditOrder = async (newOrderCount: number): Promise<void> => {
        try {
            await db.sticks.update(props.id, {
                count: newOrderCount,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleOrderPlus = () => {
        if (count < 10) {
            const newOrderCount = count + 1;
            setCount(count + 1);
            EditOrder(newOrderCount);
        } else {
            const newOrderCount = 10;
            setCount(newOrderCount);
            EditOrder(newOrderCount);
        }
    };

    const handleOrderMinus = () => {
        if (count <= 1) setCount(1);
        else {
            const newOrderCount = count - 1;
            setCount(newOrderCount);
            EditOrder(newOrderCount);
        }
    };

    useEffect(() => {
        AddStick(props);
        GetStickCount();
    }, []);

    return (
        <div className="counter-order">
            <button
                className={
                    count === 1 ? "button-counter disable" : "button-counter"
                }
                onClick={handleOrderMinus}
                disabled={count === 1}
            >
                -
            </button>
            <h3 className="counter">
                <b>{count}</b>
            </h3>
            <button className="button-counter" onClick={handleOrderPlus}>
                +
            </button>
        </div>
    );
};

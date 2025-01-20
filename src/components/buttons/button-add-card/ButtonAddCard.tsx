import React, { useEffect, useRef } from "react";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";
import { useDatabase } from "@/hooks/useDatabase";
import { Order } from "@/services/db";
import { useDispatch } from "react-redux";
import {
    addOrderToDBRedux,
    deleteOrderWithIdFromDBRedux,
    editOrderFromDBRedux,
} from "@/redux/ordersSlice";
import { AppDispatch } from "@/redux/store";
import styles from "./styles.module.scss";

interface ButtonProps {
    card: Order;
}

const MAX_VALUE = 10;

export const ButtonAddCard = ({ card }: ButtonProps): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const isFirstRender = useRef(true);
    const { countState, setCountState, getOrderFromDB } = useDatabase();

    const handleRangeLimitCounterButton = (e: number) => {
        if (e > 0 && countState === 0) {
            setCountState((prev) => prev + e);
            console.log("Добавить");
        } else if (e > 0 && countState < MAX_VALUE && countState !== 0) {
            setCountState((prev) => prev + e);
            console.log("Изменить +");
        } else if (e < 0 && countState <= MAX_VALUE && countState > 0) {
            setCountState((prev) => prev + e);
            console.log("Изменить -");
        } else if (e < 0 && countState <= 1) {
            setCountState((prev) => prev + e);
            console.log("Удалить");
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            getOrderFromDB(card);
        }

        if (countState > 1 && countState <= MAX_VALUE && countState !== 0) {
            dispatch(
                editOrderFromDBRedux({ id: card.id ?? 0, newCount: countState })
            );
            console.log("card.id ", card.id);
        } else if (countState === 1) dispatch(addOrderToDBRedux(card));
        else if (countState <= 0)
            dispatch(deleteOrderWithIdFromDBRedux(card.id ?? 0));
    }, [countState]);

    return countState !== 0 ? (
        <ButtonCounter
            onChange={handleRangeLimitCounterButton}
            value={countState}
        />
    ) : (
        <button
            onClick={() => handleRangeLimitCounterButton(1)}
            className={`${styles.button} ${styles.button__addCart}`}
            tabIndex={0}
            aria-label="Кнопка в корзину"
        >
            В корзину
        </button>
    );
};

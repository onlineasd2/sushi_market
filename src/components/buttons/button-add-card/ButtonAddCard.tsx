import React, { useEffect, useRef } from "react";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";
import { useDatabase } from "@/hooks/useDatabase";
import { ICard } from "@/components/sets/ICard";
import styles from "./styles.module.scss";

interface ButtonProps {
    card: ICard;
}

export const ButtonAddCard = ({ card }: ButtonProps): React.JSX.Element => {
    const isFirstRender = useRef(true);
    const {
        countState,
        idState,
        setCountState,
        addOrderToDB,
        editOrderFromDB,
        deleteOrderFromDB,
        getOrderFromDB,
    } = useDatabase();
    const MAX_VALUE = 10;

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            getOrderFromDB(card);
        }

        if (countState > 1 && countState <= MAX_VALUE && countState !== 0)
            editOrderFromDB();
        else if (countState === 1 && idState === null) addOrderToDB(card);
        else if (countState <= 0 && idState !== null) deleteOrderFromDB();
    }, [countState]);

    const handleRangeLimitCounterButton = (e: number) => {
        if (e > 0 && countState === 0) setCountState((prev) => prev + e);
        else if (e > 0 && countState < MAX_VALUE && countState !== 0)
            setCountState((prev) => prev + e);
        else if (e < 0 && countState <= MAX_VALUE && countState > 0)
            setCountState((prev) => prev + e);
        else if (e < 0 && countState === 1) setCountState((prev) => prev + e);
    };

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

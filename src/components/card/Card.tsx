"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ICard } from "@/components/sets/ICard";
import { ButtonAddCard } from "@/components/buttons/button-add-card/ButtonAddCard";
import { useDatabase } from "@/hooks/useDatabase";
import styles from "./styles.module.scss";

interface CardProps {
    card: ICard;
}

export const Card: React.FC<CardProps> = ({ card }: CardProps) => {
    const [src, setSrc] = useState(card.image || "/productBlurIcon.png");
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

    return (
        <div key={card.id} className={styles.card}>
            <Image
                src={src}
                width={262}
                height={262}
                className={styles.card__image}
                alt={card.title}
                onError={() => setSrc("/productBlurIcon.png")}
            />
            <div className={styles.card__content}>
                <div className={styles.card__option}>
                    <h4 className={styles.card__title}>
                        <b>{card.title}</b>
                    </h4>
                    <p className={styles.card__weight}>{card.weight} г</p>
                </div>
                <p className={styles.card__description}>{card.description}</p>
                <div className={styles.card__option}>
                    <h3 className={styles.card__price}>
                        <b>{card.price} ₸</b>
                    </h3>
                    <ButtonAddCard
                        value={countState}
                        onChange={handleRangeLimitCounterButton}
                    />
                </div>
            </div>
        </div>
    );
};

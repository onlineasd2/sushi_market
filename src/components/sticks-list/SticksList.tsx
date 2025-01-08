import styles from "@/app/cart/styles.module.scss";
import Image from "next/image";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";
import React from "react";
import { Sticks } from "@/services/db";

interface Props {
    sticks: Sticks[];
    handlerButtonCounterSticks: (e: number) => void;
}

export const SticksList = ({ handlerButtonCounterSticks, sticks }: Props) => {
    return (
        <>
            <hr />
            <div className={styles.cart__title}>
                <h2>
                    <b>Приборы</b>
                </h2>
            </div>
            <div className={styles.cart__item}>
                <Image src="/sticks.webp" width={60} height={60} alt="Суша" />
                <div className={styles.cart__text}>
                    <h3>
                        <b>Палочки</b>
                    </h3>
                </div>
                <ButtonCounter
                    value={sticks[0].count}
                    onChange={handlerButtonCounterSticks}
                />
                <div className={styles.cart__price}>
                    <h3>{sticks[0].price} ₸</h3>
                </div>
            </div>
        </>
    );
};

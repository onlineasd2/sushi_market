import Image from "next/image";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";
import React from "react";
import { Sticks } from "@/services/db";
import styles from "./styles.module.scss";

interface Props {
    sticks: Sticks[];
    handleButtonCounterSticks: (e: number) => void;
}

export const SticksList = ({ handleButtonCounterSticks, sticks }: Props) => {
    return (
        <>
            <hr />
            <div className={styles.title}>
                <h2>
                    <b>Приборы</b>
                </h2>
            </div>
            <div className={styles.item}>
                <Image src="/sticks.webp" width={60} height={60} alt="Суша" />
                <div className={styles.text}>
                    <h3>
                        <b>Палочки</b>
                    </h3>
                </div>
                <ButtonCounter
                    value={sticks[0].count}
                    onChange={handleButtonCounterSticks}
                />
                <div className={styles.price}>
                    <h3>{sticks[0].price} ₸</h3>
                </div>
            </div>
        </>
    );
};

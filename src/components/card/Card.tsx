"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ButtonAddCard } from "@/components/buttons/button-add-card/ButtonAddCard";
import { Order } from "@/services/db";
import styles from "./styles.module.scss";

interface CardProps {
    card: Order;
}

export const Card: React.FC<CardProps> = ({ card }: CardProps) => {
    const [src, setSrc] = useState(card.image || "/productBlurIcon.png");

    return (
        <div className={styles.card}>
            <Image
                src={src}
                width={262}
                height={262}
                className={styles.card__image}
                alt={card.title}
                onError={() => setSrc("/productBlurIcon.png")}
            />
            <p>asdasd</p>
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
                    <ButtonAddCard card={card} />
                </div>
            </div>
        </div>
    );
};

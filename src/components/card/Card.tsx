import React, { useEffect } from "react";
import "./styles.scss";
import Image from "next/image";
import { ICard } from "@/components/sets/ICard";
import { ButtonAddCard } from "@/components/buttons/button-add-card/ButtonAddCard";
import { db } from "@/services/db";

interface CardProps {
    card: ICard;
}

export const Card: React.FC<CardProps> = ({ card }) => {
    const [src, setSrc] = React.useState(card.image || "/productBlurIcon.png");
    const [countState, setCountState] = React.useState(0);
    const [idState, setIdState] = React.useState<number | undefined>(0);
    const MAX_VALUE = 10;

    // const OrderProp: Order = {
    //     name: card.title,
    //     image: card.image,
    //     weight: card.weight,
    //     key: card.id,
    //     count: countState,
    //     price: card.price,
    // };

    const addDB = async (): Promise<void> => {
        try {
            const id = await db.orders.add({
                name: card.title,
                image: card.image,
                weight: card.weight,
                key: card.id,
                count: countState,
                price: card.price,
            });
            if (id !== undefined) setIdState(id);
        } catch (error) {
            console.error(error);
        }
    };

    const editDB = async (): Promise<void> => {
        await db.orders.update(idState, {
            count: countState,
        });
    };

    useEffect(() => {
        if (countState === 1) addDB();
        else if (countState > 1) editDB();
        console.log("card.id = ", card.id);
        console.log("DB = ", card);
    }, [countState]);

    return (
        <div key={card.id} className="card">
            <Image
                src={src}
                width={262}
                height={262}
                className="card__image"
                alt={card.title}
                onError={() => setSrc("/productBlurIcon.png")}
            />
            <div className="card__content">
                <div className="card__option">
                    <h4 className="card__title">
                        <b>{card.title}</b>
                    </h4>
                    <p className="card__weight">{card.weight} г</p>
                </div>
                <p className="card__description">{card.description}</p>
                <div className="card__option">
                    <h3 className="card__price">
                        <b>{card.price} ₸</b>
                    </h3>
                    <ButtonAddCard
                        value={countState}
                        onChange={(e) => {
                            if (countState < MAX_VALUE)
                                setCountState(countState + e);
                            else if (countState >= MAX_VALUE && e < 0)
                                setCountState(countState + e);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

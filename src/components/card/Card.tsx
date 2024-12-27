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
    const [countState, setCountState] = React.useState<number>(0);
    const [idState, setIdState] = React.useState<number | null>(null);
    const isFirstRender = React.useRef(true);
    const MAX_VALUE = 10;

    const addDB = async (): Promise<void> => {
        try {
            const id = await db.orders.add({
                name: card.title,
                image: src,
                weight: card.weight,
                key: card.id,
                count: countState,
                price: card.price,
            });
            setIdState(id ?? null);
        } catch (error) {
            console.error(error);
        }
    };

    const editDB = async (): Promise<void> => {
        if (idState !== null)
            await db.orders.update(idState, {
                count: countState,
            });
    };

    const deleteDB = async (): Promise<void> => {
        if (idState !== null) await db.orders.delete(idState);
        setIdState(null);
    };

    const getDB = async () => {
        try {
            const res = await db.orders.where("key").equals(card.id).first();
            if (res?.key === card.id) {
                setCountState(res.count);
                if (res.id !== undefined) setIdState(res.id);
            } else setCountState(0);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            getDB();
        }

        if (countState > 1 && countState < MAX_VALUE && countState !== 0)
            editDB();
        else if (countState === 1 && idState === null) addDB();
        else if (countState <= 0 && idState !== null) deleteDB();
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
                            if (e > 0 && countState === 0)
                                setCountState((prev) => prev + e);
                            else if (
                                e > 0 &&
                                countState < MAX_VALUE &&
                                countState !== 0
                            )
                                setCountState((prev) => prev + e);
                            else if (
                                e < 0 &&
                                countState <= MAX_VALUE &&
                                countState > 1
                            )
                                setCountState((prev) => prev + e);
                            else if (e < 0 && countState === 1)
                                setCountState((prev) => prev + e);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

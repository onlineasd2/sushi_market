"use client";

import "./styles.scss";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Section } from "@/components/section/Section";
import Image from "next/image";
import { ButtonOrder } from "@/components/buttons/button-order/ButtonOrder";
import { ButtonOrderCancel } from "@/components/buttons/button-order-cancel/ButtonOrderCancel";
import Link from "next/link";
import { db, Order, Sticks } from "@/services/db";
import React, { useEffect, useState } from "react";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";
import { ButtonIcon } from "@/components/buttons/button-icon/ButtonIcon";

export default function Page() {
    const [error, setError] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const PRICE_STICK = 30;
    const [sticks, setSticks] = useState<Sticks[]>([
        { id: 0, count: 1, price: PRICE_STICK },
    ]);
    const MAX_VALUE: number = 10;

    const sumOrder = orders.reduce(
        (acc, order) => acc + order.price * order.count,
        0
    );
    const sumSticks = sticks.reduce(
        (acc, stick) => acc + stick.price * stick.count,
        0
    );
    const totalSum = sumOrder + sumSticks;

    const isSticksLoaded = async (): Promise<boolean> => {
        return (await db.sticks.get(0)) !== undefined; // Проверка сразу возвращает boolean
    };

    const addSticksDB = async (): Promise<void> => {
        try {
            if (await isSticksLoaded)
                await db.sticks.add({
                    id: 0,
                    count: sticks[0].count,
                    price: PRICE_STICK,
                });
        } catch (error) {
            console.error(error);
        }
    };

    const GetSets = async () => {
        try {
            const res = await db.orders.toArray();
            setOrders(res);
        } catch (error) {
            setError(`Error ${error}`);
        }
    };

    const GetSticks = async () => {
        try {
            if (await isSticksLoaded) {
                const res = await db.sticks.toArray();
                setSticks(res);
            }
            addSticksDB();
        } catch (error) {
            setError(`Error ${error}`);
        }
    };

    const editDB = async (id: number, countState: number): Promise<void> => {
        try {
            await db.orders.update(id, {
                count: countState,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const editSticksDB = async (
        id: number,
        countState: number
    ): Promise<void> => {
        try {
            if (await isSticksLoaded)
                await db.sticks.update(id, {
                    count: countState,
                });
            addSticksDB();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteDB = async (id: number): Promise<void> => {
        try {
            await db.orders.delete(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClearAllOrders = () => {
        orders.forEach((order) => {
            deleteDB(order.id ?? 0);
        });
        setOrders([]);
    };

    const changeCounter = (e: number, count: number): boolean => {
        if (e > 0 && count < MAX_VALUE) return true;

        if (e < 0 && count <= MAX_VALUE && count >= 1) return true;

        if (e < 0 && count <= 1) return false;

        return false;
    };

    useEffect(() => {
        if (sticks) addSticksDB();
        GetSets();
        GetSticks();
    }, []);

    useEffect(() => {
        orders.forEach((order) => {
            if (order.count <= 0) {
                deleteDB(order.id ?? 0);
                GetSets();
            }
            if (order.count >= 1 && order.count <= MAX_VALUE)
                editDB(order.id ?? 0, order.count);
        });

        sticks.forEach((stick) => {
            if (stick.count >= 0 && stick.count <= MAX_VALUE)
                editSticksDB(stick.id ?? 0, stick.count);
        });
    }, [orders, sticks]);

    return (
        <>
            <Header />
            <Section>
                <div className="cart">
                    <div className="cart__content">
                        <hr />
                        <div className="cart__title">
                            <h1>
                                <b>Корзина</b>
                            </h1>
                            {orders.length !== 0 ? (
                                <ButtonIcon onClick={handleClearAllOrders}>
                                    <Image
                                        width={18}
                                        height={18}
                                        src="/trash-svgrepo-com.svg"
                                        alt="delete"
                                    />
                                </ButtonIcon>
                            ) : (
                                ""
                            )}
                        </div>
                        {/* Хз как тут сделать */}
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {error ? (
                            <h1>{error}</h1>
                        ) : orders.length === 0 ? (
                            <div className="not-found">
                                <Image
                                    width={240}
                                    height={240}
                                    src="/emptyCartIcon.svg"
                                    alt="icon"
                                />
                                <h1>Ой, а тут пусто!</h1>
                                <p>Добавьте что-нибудь из меню</p>

                                <button className="button button__login">
                                    <Link href="/"> Перейти в меню</Link>
                                </button>
                            </div>
                        ) : (
                            orders
                                .sort((a, b) => a.key - b.key)
                                .map((localOrder) => (
                                    <div
                                        key={localOrder.key}
                                        className="cart__item"
                                    >
                                        <Image
                                            src={localOrder.image}
                                            width={60}
                                            height={60}
                                            alt="Суша"
                                        />
                                        <div className="cart__text">
                                            <h3>
                                                <b>{localOrder.name}</b>
                                                <p>{localOrder.weight}</p>
                                            </h3>
                                        </div>
                                        <ButtonCounter
                                            value={localOrder.count}
                                            onChange={(e: number) => {
                                                setOrders((prevState) => {
                                                    const prevState1 =
                                                        prevState.filter(
                                                            (set) =>
                                                                set.key !==
                                                                localOrder.key
                                                        );
                                                    if (
                                                        changeCounter(
                                                            e,
                                                            localOrder.count
                                                        )
                                                    ) {
                                                        const arr = [
                                                            ...prevState1,
                                                            {
                                                                ...localOrder,
                                                                count:
                                                                    localOrder.count +
                                                                    e,
                                                            },
                                                        ];
                                                        return arr.sort(
                                                            (a, b) => {
                                                                return (
                                                                    a.key -
                                                                    b.key
                                                                );
                                                            }
                                                        );
                                                    }
                                                    const arr = [
                                                        ...prevState1,
                                                        {
                                                            ...localOrder,
                                                            count: localOrder.count,
                                                        },
                                                    ];
                                                    return arr.sort((a, b) => {
                                                        return a.key - b.key;
                                                    });
                                                });
                                            }}
                                        />
                                        <div className="cart__price">
                                            <h3>{localOrder.price} ₸</h3>
                                        </div>
                                        <ButtonIcon
                                            onClick={() => {
                                                setOrders((prevState) => {
                                                    const prevState1 =
                                                        prevState.filter(
                                                            (set) =>
                                                                set.key !==
                                                                localOrder.key
                                                        );
                                                    const arr = [
                                                        ...prevState1,
                                                        {
                                                            ...localOrder,
                                                            count: 0,
                                                        },
                                                    ];
                                                    return arr.sort((a, b) => {
                                                        return a.key - b.key;
                                                    });
                                                });
                                            }}
                                        >
                                            <Image
                                                width={18}
                                                height={18}
                                                src="/trash-svgrepo-com.svg"
                                                alt="delete"
                                            />
                                        </ButtonIcon>
                                    </div>
                                ))
                        )}
                    </div>
                </div>

                <div className="cart">
                    <div className="cart__content">
                        <hr />
                        <div className="cart__title">
                            <h2>
                                <b>Приборы</b>
                            </h2>
                        </div>
                        <div className="cart__item">
                            <Image
                                src="/sticks.webp"
                                width={60}
                                height={60}
                                alt="Суша"
                            />
                            <div className="cart__text">
                                <h3>
                                    <b>Палочки</b>
                                </h3>
                            </div>
                            <ButtonCounter
                                value={sticks[0].count}
                                onChange={(e: number) => {
                                    if (changeCounter(e, sticks[0].count))
                                        setSticks((prevState) => {
                                            const prevState1 = prevState.filter(
                                                (stick) =>
                                                    stick.id !== sticks[0].id
                                            );
                                            return [
                                                ...prevState1,
                                                {
                                                    ...sticks[0],
                                                    count: sticks[0].count + e,
                                                },
                                            ];
                                        });
                                }}
                            />
                            <div className="cart__price">
                                <h3>{sticks[0].price} ₸</h3>
                            </div>
                        </div>
                        <div className="order-details">
                            <h2>
                                <b>Сумма заказа: {totalSum} ₸</b>
                            </h2>
                            <div className="order-details__button-conainer">
                                <Link href="/">
                                    <ButtonOrderCancel>
                                        Отменить
                                    </ButtonOrderCancel>
                                </Link>
                                <ButtonOrder>Заказать</ButtonOrder>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
            <Footer />
        </>
    );
}

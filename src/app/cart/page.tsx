"use client";

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
import { ButtonLogin } from "@/components/buttons/button-login/ButtonLogin";
import styles from "./styles.module.scss";

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
        return (await db.sticks.get(0)) !== undefined;
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

    const getOrdersFromDB = async () => {
        try {
            const res = await db.orders.toArray();
            setOrders(res);
        } catch (error) {
            setError(`Error ${error}`);
        }
    };

    const getSticksFromDB = async () => {
        try {
            const sticksCount = await db.sticks.count();
            if (sticksCount === 0) await addSticksDB();
            if (await isSticksLoaded) {
                const res = await db.sticks.toArray();
                setSticks(res);
            }
        } catch (error) {
            setError(`Error ${error}`);
        }
    };

    const editOrdersToDB = async (
        id: number,
        countState: number
    ): Promise<void> => {
        try {
            await db.orders.update(id, {
                count: countState,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const editSticksToDB = async (
        id: number,
        countState: number
    ): Promise<void> => {
        try {
            if (sticks === null) await addSticksDB();
            if (await isSticksLoaded)
                await db.sticks.update(id, {
                    count: countState,
                });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteOrderFromDB = async (id: number): Promise<void> => {
        try {
            await db.orders.delete(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClearAllOrders = () => {
        orders.forEach((order) => {
            deleteOrderFromDB(order.id ?? 0);
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
        getSticksFromDB();
        getOrdersFromDB();
    }, []);

    useEffect(() => {
        orders.forEach((order) => {
            if (order.count <= 0) {
                deleteOrderFromDB(order.id ?? 0);
                getOrdersFromDB();
            }
            if (order.count >= 1 && order.count <= MAX_VALUE)
                editOrdersToDB(order.id ?? 0, order.count);
        });

        sticks.forEach((stick) => {
            if (stick.count >= 0 && stick.count <= MAX_VALUE)
                editSticksToDB(stick.id ?? 0, stick.count);
        });
    }, [orders, sticks]);

    const handleButtonCounter = (e: number, localOrder: Order) => {
        setOrders((prevState) => {
            const filteredPrevState = prevState.filter(
                (set) => set.key !== localOrder.key
            );
            if (changeCounter(e, localOrder.count)) {
                const arr = [
                    ...filteredPrevState,
                    {
                        ...localOrder,
                        count: localOrder.count + e,
                    },
                ];
                return arr.sort((a, b) => {
                    return a.key - b.key;
                });
            }
            const arr = [
                ...filteredPrevState,
                {
                    ...localOrder,
                    count: localOrder.count,
                },
            ];
            return arr.sort((a, b) => {
                return a.key - b.key;
            });
        });
    };

    const handleButtonCounterSticks = (e: number) => {
        if (changeCounter(e, sticks[0].count))
            setSticks((prevState) => {
                const filteredPrevState = prevState.filter(
                    (stick) => stick.id !== sticks[0].id
                );
                return [
                    ...filteredPrevState,
                    {
                        ...sticks[0],
                        count: sticks[0].count + e,
                    },
                ];
            });
    };

    const handleDeleteOrder = (localOrder: Order) => {
        setOrders((prevState) => {
            const filteredPrevState = prevState.filter(
                (set) => set.key !== localOrder.key
            );
            const arr = [
                ...filteredPrevState,
                {
                    ...localOrder,
                    count: 0,
                },
            ];
            return arr.sort((a, b) => {
                return a.key - b.key;
            });
        });
    };

    return (
        <>
            <Header />
            <Section>
                <div className={styles.cart}>
                    <div className={styles.cart__content}>
                        <hr />
                        <div className={styles.cart__title}>
                            <h1>
                                <b>Корзина</b>
                            </h1>
                            {orders.length !== 0 && (
                                <ButtonIcon onClick={handleClearAllOrders}>
                                    <Image
                                        width={18}
                                        height={18}
                                        src="/trash-svgrepo-com.svg"
                                        alt="delete"
                                    />
                                </ButtonIcon>
                            )}
                        </div>
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {error ? (
                            <h1>{error}</h1>
                        ) : orders.length === 0 ? (
                            <div className={styles.notFound}>
                                <Image
                                    width={240}
                                    height={240}
                                    src="/emptyCartIcon.svg"
                                    alt="icon"
                                />
                                <h1>Ой, а тут пусто!</h1>
                                <p>Добавьте что-нибудь из меню</p>

                                <ButtonLogin>
                                    <Link href="/"> Перейти в меню</Link>
                                </ButtonLogin>
                            </div>
                        ) : (
                            orders
                                .sort((a, b) => a.key - b.key)
                                .map((localOrder) => (
                                    <div
                                        key={localOrder.key}
                                        className={styles.cart__item}
                                    >
                                        <Image
                                            src={localOrder.image}
                                            width={60}
                                            height={60}
                                            alt="Суша"
                                        />
                                        <div className={styles.cart__text}>
                                            <h3>
                                                <b>{localOrder.name}</b>
                                                <p>{localOrder.weight}</p>
                                            </h3>
                                        </div>
                                        <ButtonCounter
                                            value={localOrder.count}
                                            onChange={(e) =>
                                                handleButtonCounter(
                                                    e,
                                                    localOrder
                                                )
                                            }
                                        />
                                        <div className={styles.cart__price}>
                                            <h3>
                                                {localOrder.price *
                                                    localOrder.count}{" "}
                                                ₸
                                            </h3>
                                        </div>
                                        <ButtonIcon
                                            onClick={() =>
                                                handleDeleteOrder(localOrder)
                                            }
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

                <div className={styles.cart}>
                    <div className={styles.cart__content}>
                        <hr />
                        <div className={styles.cart__title}>
                            <h2>
                                <b>Приборы</b>
                            </h2>
                        </div>
                        <div className={styles.cart__item}>
                            <Image
                                src="/sticks.webp"
                                width={60}
                                height={60}
                                alt="Суша"
                            />
                            <div className={styles.cart__text}>
                                <h3>
                                    <b>Палочки</b>
                                </h3>
                            </div>
                            <ButtonCounter
                                value={sticks[0].count}
                                onChange={handleButtonCounterSticks}
                            />
                            <div className={styles.cart__price}>
                                <h3>{sticks[0].price} ₸</h3>
                            </div>
                        </div>
                        <div className={styles.orderDetails}>
                            <h2>
                                <b>Сумма заказа: {totalSum} ₸</b>
                            </h2>
                            <div
                                className={styles.orderDetails__buttonConainer}
                            >
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

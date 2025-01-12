"use client";

import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Section } from "@/components/section/Section";
import { ButtonOrder } from "@/components/buttons/button-order/ButtonOrder";
import { ButtonOrderCancel } from "@/components/buttons/button-order-cancel/ButtonOrderCancel";
import Link from "next/link";
import { db, Order, Sticks } from "@/services/db/db";
import React, { useEffect, useState } from "react";
import { OrderList } from "@/components/order-list/OrderList";
import { SticksList } from "@/components/sticks-list/SticksList";
import { CartWrapper } from "@/components/cart-wrapper/CartWrapper";
import styles from "./styles.module.scss";

const MAX_VALUE: number = 10;
const PRICE_STICK = 30;

export default function Page() {
    const [error, setError] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [sticks, setSticks] = useState<Sticks[]>([]);

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
        const stick = await db.sticks.get(0);
        return stick !== undefined;
    };

    const addSticksDB = async (): Promise<void> => {
        try {
            const stickExists = await isSticksLoaded();
            if (!stickExists)
                await db.sticks.add({
                    id: 0,
                    count: 1,
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
            const stickExists = await isSticksLoaded();
            if (!stickExists) await addSticksDB();

            const res = await db.sticks.toArray();
            setSticks(res);
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
            const stickExists = await isSticksLoaded();
            if (!stickExists) await addSticksDB();
            if (await isSticksLoaded())
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
        if (sticks.length > 0)
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

    return (
        <>
            <Header />
            <Section>
                <CartWrapper>
                    <OrderList
                        orders={orders}
                        handleClearAllOrders={handleClearAllOrders}
                        handlerDeleteOrder={handleDeleteOrder}
                        handlerButtonCounter={handleButtonCounter}
                        error={error}
                    />
                </CartWrapper>
                <CartWrapper>
                    {sticks.length > 0 && (
                        <SticksList
                            sticks={sticks}
                            handlerButtonCounterSticks={
                                handleButtonCounterSticks
                            }
                        />
                    )}
                </CartWrapper>
                <CartWrapper>
                    <div className={styles.orderDetails}>
                        <h2>
                            <b>Сумма заказа: {totalSum} ₸</b>
                        </h2>
                        <div className={styles.orderDetails__buttonConainer}>
                            <Link href="/">
                                <ButtonOrderCancel>Отменить</ButtonOrderCancel>
                            </Link>
                            <ButtonOrder>Заказать</ButtonOrder>
                        </div>
                    </div>
                </CartWrapper>
            </Section>
            <Footer />
        </>
    );
}

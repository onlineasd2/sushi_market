"use client";

import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Section } from "@/components/section/Section";
import { ButtonOrder } from "@/components/buttons/button-order/ButtonOrder";
import { ButtonOrderCancel } from "@/components/buttons/button-order-cancel/ButtonOrderCancel";
import Link from "next/link";
import React, { useEffect } from "react";
import { OrderList } from "@/components/order-list/OrderList";
import { SticksList } from "@/components/sticks-list/SticksList";
import { CartWrapper } from "@/components/cart-wrapper/CartWrapper";
import { Order } from "@/services/db";
import { useDatabase } from "@/hooks/useDatabase";
import styles from "./styles.module.scss";

const MAX_VALUE: number = 10;

export default function Page() {
    const {
        getAllSticksFromDB,
        getAllOrdersFromDB,
        deleteOrderWithIdFromDB,
        editOrdersToDB,
        editSticksToDB,
        handleClearAllOrders,
        orders,
        setOrders,
        sticks,
        setSticks,
        error,
    } = useDatabase();

    const sumOrder = orders.reduce(
        (acc, order) => acc + order.price * order.count,
        0
    );
    const sumSticks = sticks.reduce(
        (acc, stick) => acc + stick.price * stick.count,
        0
    );
    const totalSum = sumOrder + sumSticks;

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
        getAllSticksFromDB();
        getAllOrdersFromDB();
    }, []);

    useEffect(() => {
        orders.forEach((order) => {
            if (order.count <= 0) {
                deleteOrderWithIdFromDB(order.id ?? 0);
                getAllOrdersFromDB();
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
                        handleDeleteOrder={handleDeleteOrder}
                        handleButtonCounter={handleButtonCounter}
                        error={error}
                    />
                </CartWrapper>
                <CartWrapper>
                    {sticks.length > 0 && (
                        <SticksList
                            sticks={sticks}
                            handleButtonCounterSticks={
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

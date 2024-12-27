"use client";

import "./styles.scss";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Section } from "@/components/section/Section";
import Image from "next/image";
import { ButtonDeleteCart } from "@/components/buttons/button-delete-cart/ButtonDeleteCart";
import { ButtonOrder } from "@/components/buttons/button-order/ButtonOrder";
import { ButtonOrderCancel } from "@/components/buttons/button-order-cancel/ButtonOrderCancel";
import Link from "next/link";
import { db, Order, Sticks } from "@/services/db";
import React, { useEffect, useState } from "react";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";
import { ButtonIcon } from "@/components/buttons/button-icon/ButtonIcon";
import { ButtonListCartSticks } from "@/components/buttons/button-list-cart-sticks/ButtonListCartSticks";

export default function Page() {
    const [error, setError] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const PRICE_STICK = 30;
    const sticksOrder: Sticks[] = [{ id: 0, count: 1, price: PRICE_STICK }];
    // const isFirstRender = React.useRef(true);
    const [totalPriceSticks, setTotalPriceSticks] =
        useState<number>(PRICE_STICK);
    const MAX_VALUE: number = 10;

    // const totalPrice = setOrders посчитать тут полную цену

    const handleGetSticks = (_totalPriceSticks: number) => {
        setTotalPriceSticks(totalPriceSticks + _totalPriceSticks);
    };

    const GetSets = async () => {
        try {
            const res = await db.orders.toArray();
            setOrders(res);
        } catch (error) {
            setError(`Error ${error}`);
        }
    };

    const GetTotalPrice = async () => {
        try {
            const res = await db.orders.toArray();
            const sumTotal = res.reduce((acc, order) => acc + order.price, 0);
            setTotalPrice(sumTotal);
            console.log(sumTotal);
        } catch (error) {
            setError(`Error ${error}`);
        }
    };

    // const GetTotalPriceSticks = async () => {
    //     try {
    //         const resStick = await db.sticks.toArray();
    //         resStick.forEach((stick) => {
    //             setTotalPriceSticks((prevPrice) =>
    //                 prevPrice !== null ? stick.price * stick.count : 0
    //             );
    //         });
    //     } catch (error) {
    //         setError(`Error ${error}`);
    //     }
    // };

    const editDB = async (id: number, countState: number): Promise<void> => {
        try {
            await db.orders.update(id, {
                count: countState,
            });
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

    useEffect(() => {
        GetSets();
    }, []);

    useEffect(() => {
        GetTotalPrice();
        console.log("useEFfects");
        orders.forEach((order) => {
            if (order.count <= 0) {
                deleteDB(order.id ?? 0);
                GetSets();
            }
            if (order.count >= 1 && order.count <= MAX_VALUE)
                editDB(order.id ?? 0, order.count);
        });
    }, [orders]);

    const changeCounter = (e: number, count: number): boolean => {
        if (e > 0 && count < MAX_VALUE) {
            console.log("Edit +");
            return true;
        }
        if (e < 0 && count <= MAX_VALUE && count > 1) {
            console.log("Edit -");
            return true;
        }
        if (e < 0 && count <= 1) {
            console.log("Delete");

            return true;
        }

        return false;
    };

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
                            <ButtonIcon>
                                <Image
                                    width={18}
                                    height={18}
                                    src="/trash-svgrepo-com.svg"
                                    alt="delete"
                                />
                            </ButtonIcon>
                        </div>
                        {/* ИСПРАВИТЬ ТУТ КОД СДЕЛАТЬ НА IF */}
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {error ? (
                            <h1>{error}</h1>
                        ) : orders.length === 0 ? (
                            <h1>Здесь пока пусто</h1>
                        ) : (
                            orders.map((localOrder) => (
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
                                                    return arr.sort((a, b) => {
                                                        return a.key - b.key;
                                                    });
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
                                    <ButtonDeleteCart Order={localOrder}>
                                        <Image
                                            width={18}
                                            height={18}
                                            src="/trash-svgrepo-com.svg"
                                            alt="delete"
                                        />
                                    </ButtonDeleteCart>
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
                            <ButtonListCartSticks
                                onSendTotalPrice={handleGetSticks}
                                props={sticksOrder[0]}
                            />
                            <div className="cart__price">
                                <h3>{totalPriceSticks} ₸</h3>
                            </div>
                        </div>
                        <div className="order-details">
                            <h2>
                                <b>Сумма заказа: {totalPrice} ₸</b>
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

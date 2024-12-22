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
import { useEffect, useState } from "react";

export default function Page() {
    const [error, setError] = useState("");
    const [setsOrder, setOrderSets] = useState<Order[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const sticksOrder: Sticks = {
        count: 1,
        price: 30,
    };
    const AddStick = async (_sticksOrder: Sticks) => {
        try {
            const countSticksDB = await db.sticks.toArray();
            if (countSticksDB.length === 0) await db.sticks.add(_sticksOrder);
        } catch (error) {
            setError(`Error ${error}`);
        }
    };

    const GetSets = async () => {
        try {
            const res = await db.orders.toArray();
            setOrderSets(res);
        } catch (error) {
            setError(`Error ${error}`);
        }
    };

    const GetTotalPrice = async () => {
        try {
            const res = await db.orders.toArray();
            res.forEach((order) => {
                setTotalPrice(
                    (prevPrice) => prevPrice + order.price * order.count
                );
            });
        } catch (error) {
            setError(`Error ${error}`);
        }
    };

    useEffect(() => {
        AddStick(sticksOrder);
        GetSets();
        GetTotalPrice();
    }, []);

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
                        </div>
                        {error ? (
                            <h1>{error}</h1>
                        ) : (
                            setsOrder.map((setOrder) => (
                                <div key={setOrder.key} className="cart__item">
                                    <Image
                                        src="/sushi-card1.png"
                                        width={60}
                                        height={60}
                                        alt="Суша"
                                    />
                                    <div className="cart__text">
                                        <h3>
                                            <b>{setOrder.name}</b>
                                            <p>{setOrder.weight}</p>
                                        </h3>
                                    </div>
                                    {/* <ButtonListCart Order={setOrder} /> */}
                                    <div className="cart__price">
                                        <h3>{setOrder.price} ₸</h3>
                                    </div>
                                    <ButtonDeleteCart Order={setOrder}>
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
                                src="/sushi-card1.png"
                                width={60}
                                height={60}
                                alt="Суша"
                            />
                            <div className="cart__text">
                                <h3>
                                    <b>Палочки</b>
                                </h3>
                            </div>
                            {/* <ButtonListCart /> */}
                            <div className="cart__price">
                                <h3>{30} ₸</h3>
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

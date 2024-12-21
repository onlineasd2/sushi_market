"use client";

import React from "react";
import "./styles.scss";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Section } from "@/components/section/Section";
import Image from "next/image";
import { ButtonListCart } from "@/components/buttons/button-list-cart/ButtonListCart";
import { ButtonDeleteCart } from "@/components/buttons/button-delete-cart/ButtonDeleteCart";
import { ButtonOrder } from "@/components/buttons/button-order/ButtonOrder";
import { ButtonOrderCancel } from "@/components/buttons/button-order-cancel/ButtonOrderCancel";

export default function Page() {
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
                        <div className="cart__item">
                            <Image
                                src="/sushi-card1.png"
                                width={60}
                                height={60}
                                alt="Суша"
                            />
                            <div className="cart__text">
                                <h3>
                                    <b>Суши 1</b>
                                    <p>1670 г</p>
                                </h3>
                            </div>
                            <ButtonListCart />
                            <h3>12 990 ₸</h3>
                            <ButtonDeleteCart>
                                <Image
                                    width={18}
                                    height={18}
                                    src="/trash-svgrepo-com.svg"
                                    alt="delete"
                                />
                            </ButtonDeleteCart>
                        </div>
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
                            <ButtonListCart />
                            <h3>20 ₸</h3>
                            <ButtonDeleteCart>
                                <Image
                                    width={18}
                                    height={18}
                                    src="/trash-svgrepo-com.svg"
                                    alt="delete"
                                />
                            </ButtonDeleteCart>
                        </div>
                        <div className="order-details">
                            <h2>
                                <b>Сумма заказа: 72 980 ₸</b>
                            </h2>
                            <div className="order-details__button-conainer">
                                <ButtonOrderCancel>Отменить</ButtonOrderCancel>
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

"use client";

import React from "react";
import "./styles.scss";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Section } from "@/components/section/Section";
import Image from "next/image";
// import { withButton } from "@/components/buttons/HOC/withButton";
// import { ButtonIcon } from "@/components/buttons/button-icon/ButtonIcon";
// import { ButtonAddCard } from "@/components/buttons/button-add-card/ButtonAddCard";
import { ButtonListCart } from "@/components/buttons/button-list-cart/ButtonListCart";
import { ButtonDeleteCart } from "@/components/buttons/button-delete-cart/ButtonDeleteCart";

export default function Page() {
    // const ButtonIconCardExtended = withButton(ButtonIcon);
    // const ButtonAddCardExtended = withButton(ButtonAddCard);
    return (
        <>
            <Header />
            <Section>
                <div className="cart">
                    <div className="cart__content">
                        <hr />
                        <div className="cart__trash">
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
                                    width={16}
                                    height={16}
                                    src="/trash-svgrepo-com.svg"
                                    alt="delete"
                                />
                            </ButtonDeleteCart>
                        </div>
                    </div>
                </div>
            </Section>
            <Footer />
        </>
    );
}

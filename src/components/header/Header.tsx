"use client";

import "./styles.scss";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/button/Button";
import { Section } from "@/components/section/Section";

export const Header = () => {
    /* Кнопка бургер-меню */
    const [isBurgerActive, setIsBurgerActive] = React.useState(false);

    const toggleMenu = () => {
        setIsBurgerActive(!isBurgerActive);
    };
    /* Кнопка бургер-меню */

    return (
        <Section>
            <div className="header">
                <div className="header__container">
                    <div className="header__logo">
                        <Image
                            src="/logo.svg"
                            width={178}
                            height={56}
                            alt="logo"
                        />
                    </div>
                    <div className="header__location">
                        <h3>
                            Ваш город <span className="text-red">Павлодар</span>
                        </h3>
                        <h3>
                            <span className="text-red">+7 747 095 83 04</span>
                        </h3>
                    </div>
                    <div className="header__find">
                        <Button className="button button__location header__button-location">
                            <Image
                                src="/placeholder.png"
                                width={16}
                                height={16}
                                alt=""
                            />
                            Выберите адрес
                        </Button>
                    </div>
                    <Button className="button button__login">Войти</Button>
                </div>
            </div>

            <div className="header-mobile">
                <div className="header-mobile__container">
                    <div className="header-mobile__content">
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={toggleMenu}
                            aria-label="menu"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ")
                                    toggleMenu();
                            }}
                            className={`header-mobile__burger-menu ${isBurgerActive ? "active" : ""}`}
                        >
                            <span />
                        </div>
                        <Button className="button button__login header-mobile__button-login">
                            Позвонить
                        </Button>
                    </div>
                    <Image
                        src="./mobileLogo.svg"
                        width={30}
                        height={30}
                        alt="logo"
                    />
                    <Image
                        src="/logout.png"
                        width={24}
                        height={24}
                        alt="logo"
                    />
                </div>
                <nav
                    className={`header-mobile__nav-menu ${isBurgerActive ? "" : "hidden"}`}
                >
                    <Image
                        onClick={toggleMenu}
                        role={isBurgerActive ? "button" : "button"}
                        tabIndex={0}
                        width={24}
                        height={24}
                        src="/close.png"
                        alt=""
                        className="header-mobile__close-btn"
                    />
                    <ul className="header-mobile__menu-box">
                        <li>
                            <Image
                                src="/free-icon-profile-9344418.png"
                                width={24}
                                height={24}
                                alt=""
                            />
                            <Link href="/#">Войти</Link>
                        </li>
                        <li>
                            <Image
                                src="/free-icon-building-2568551.png"
                                width={24}
                                height={24}
                                alt=""
                            />
                            <Link href="/#">Павлодар</Link>
                            <p>Сменить город</p>
                        </li>
                        <li>
                            <Image
                                src="/free-icon-world-16002767.png"
                                width={24}
                                height={24}
                                alt=""
                            />
                            <Link href="/#">Русский</Link>
                            <p>Сменить язык</p>
                        </li>
                        <li>
                            <Link href="/#">Политика конфиденциальности</Link>
                        </li>
                        <li>
                            <Link href="/#">Согласие на обработку ПД</Link>
                        </li>
                        <li>
                            <Link href="/#">
                                Контактная и правовая информация
                            </Link>
                        </li>
                        <li>
                            <Link href="/#">Акции</Link>
                        </li>
                        <li>
                            <Link href="/#">
                                Программа лояльности “Ёби-клуб”
                            </Link>
                        </li>
                        <li>
                            <Link href="/#">Доставка и оплата</Link>
                        </li>
                        <li>
                            <Link href="/#">О компании</Link>
                        </li>
                        <li>
                            <Link href="/#">+7 747 095 83 04</Link>
                        </li>
                    </ul>
                </nav>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <div
                    onClick={toggleMenu}
                    role="button"
                    tabIndex={0}
                    aria-label="toggleMenu"
                    className={`header-mobile__overlay ${isBurgerActive ? "" : "hidden"}`}
                />
            </div>
        </Section>
    );
};

"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Section } from "@/components/section/Section";
import { ButtonLogin } from "@/components/buttons/button-login/ButtonLogin";
import { ButtonLocation } from "@/components/buttons/button-location/ButtonLocation";
import { usePopover } from "@/hooks/usePopover";
import { ModalAdress } from "@/components/modal-adress/ModalAdress";
import styles from "./styles.module.scss";

export const Header = () => {
    const [isBurgerActive, setIsBurgerActive] = React.useState(false);

    const {
        refs,
        isOpen,
        getFloatingProps,
        getReferenceProps,
        floatingStyles,
    } = usePopover({ event: ["click"] });

    const toggleMenu = () => {
        setIsBurgerActive(!isBurgerActive);
    };

    return (
        <Section>
            <div className={styles.header}>
                <div className={styles.header__logo}>
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            width={178}
                            height={56}
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className={styles.header__location}>
                    <h3>
                        Ваш город{" "}
                        <span className={styles.textRed}>Павлодар</span>
                    </h3>
                    <h3>
                        <span className={styles.textRed}>+7 747 095 83 04</span>
                    </h3>
                </div>
                <div className={styles.header__find}>
                    <ButtonLocation
                        ref={refs.setFloating}
                        {...getReferenceProps()}
                    >
                        <Image
                            src="/placeholder.png"
                            width={16}
                            height={16}
                            alt=""
                        />
                        Выберите адрес
                    </ButtonLocation>
                </div>
                <ButtonLogin>Войти</ButtonLogin>
            </div>

            {isOpen && (
                <ModalAdress
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                />
            )}

            <div className={styles.headerMobile}>
                <div className={styles.headerMobile__container}>
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={toggleMenu}
                        aria-label="menu"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                                toggleMenu();
                        }}
                        className={`${styles.headerMobile__burgerMenu} ${isBurgerActive ? styles.active : ""}`}
                    >
                        <span />
                    </div>
                    <ButtonLogin>Позвонить</ButtonLogin>
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
            </div>
            <nav
                className={`${styles.headerMobile__navMenu} ${isBurgerActive ? "" : styles.hidden}`}
            >
                <Image
                    onClick={toggleMenu}
                    role={isBurgerActive ? "button" : "button"}
                    tabIndex={0}
                    width={24}
                    height={24}
                    src="/close.png"
                    alt=""
                    className={styles.headerMobile__closeBtn}
                />
                <ul className={styles.headerMobile__menuBox}>
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
                        <Link href="/#">Контактная и правовая информация</Link>
                    </li>
                    <li>
                        <Link href="/#">Акции</Link>
                    </li>
                    <li>
                        <Link href="/#">Программа лояльности “Ёби-клуб”</Link>
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
            <div
                onClick={toggleMenu}
                role="button"
                tabIndex={0}
                aria-label="toggleMenu"
                className={`${styles.headerMobile__overlay} ${isBurgerActive ? "" : styles.hidden}`}
            />
        </Section>
    );
};

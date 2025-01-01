import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SectionFooter } from "@/components/section-footer/SectionFooter";
import styles from "./styles.module.scss";

export const Footer = () => {
    return (
        <SectionFooter>
            <div className={styles.footer__container}>
                <div className={styles.footer__logo}>
                    <Image
                        src="/footerLogo.svg"
                        width={159}
                        height={50}
                        className={styles.card__image}
                        alt=""
                    />
                    <h2>+7 747 095 83 04</h2>
                </div>
                <hr className={styles.ShowMobile} />
                <div className={styles.footer__apps}>
                    <Link href="/#">
                        <Image
                            src="/appstore.svg"
                            width={120}
                            height={40}
                            className={styles.card__image}
                            alt=""
                        />
                    </Link>
                    <Link href="/#">
                        <Image
                            src="/googleplay.png"
                            width={120}
                            height={40}
                            className={styles.card__image}
                            alt=""
                        />
                    </Link>
                </div>
                <hr className={styles.footerShowMobile} />
                <div className={styles.footer__options}>
                    <ul>
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
                            <Link href="/#">О компании</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className={styles.footer__adress}>
                <p>ЁбиДоёби - Доставка суши и роллов в Павлодаре</p>
            </div>
            <hr />
            <div className={styles.footer__copy}>
                <div>
                    <h4>Ёбидоёби, 2024</h4>
                    <p>
                        Информация на сайте носит справочный характер. Внешний
                        вид и состав блюд могут отличаться от представленных на
                        сайте. Подробности у операторов. акции и скидки не
                        суммируются и не распространяются на наборы, десерты,
                        напитки
                    </p>
                </div>
                <div>
                    <Link href="/#">Наверх</Link>
                </div>
            </div>
        </SectionFooter>
    );
};

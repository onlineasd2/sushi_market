import React from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/button/Button";

export const Category = () => {
    return (
        <div className="section">
            <div className="category wrapper">
                <div className="category__content">
                    <div className="category__main-container">
                        <div className="category__list">
                            <ul>
                                <li className="active">
                                    <Link href="/#">Наборы</Link>
                                </li>
                                <li>
                                    <Link href="/#">Роллы и суши</Link>
                                </li>
                                <li>
                                    <Link href="/#">Премиум</Link>
                                </li>
                                <li>
                                    <Link href="/#">Темпура</Link>
                                </li>
                                <li>
                                    <Link href="/#">Запеченные</Link>
                                </li>
                                <li>
                                    <Link href="/#">Горячее и салаты</Link>
                                </li>
                                <li>
                                    <Link href="/#">Напитки и десерты</Link>
                                </li>
                                <li>
                                    <Link href="/#">Специи</Link>
                                </li>
                                <li>
                                    <Link href="/#">Соусы</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="category__options">
                            <div className="category__delivery">
                                <h4>Доставка и оплата</h4>
                            </div>
                            <span className="category__line" />
                            <div className="category__language">
                                <h4>RU</h4>
                                <h4>/</h4>
                                <h4>KZ</h4>
                            </div>
                        </div>
                        <div className="category__filters">
                            <Button className="button button__mobile">
                                <Image
                                    width={14}
                                    height={14}
                                    src="/free-icon-search-8272068.png"
                                    alt=""
                                />
                            </Button>
                            <Button className="button button__mobile">
                                <Image
                                    width={14}
                                    height={14}
                                    src="/free-icon-sort-8105950.png"
                                    alt=""
                                />
                            </Button>
                        </div>
                    </div>
                    <Button className="button button__cart">В корзину</Button>
                </div>
            </div>
        </div>
    );
};

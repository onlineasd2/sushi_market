import React from "react";
import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/button/Button";
import { Section } from "@/components/section/Section";

const categories = [
    { id: 1, title: "Наборы" },
    { id: 2, title: "Роллы и суши" },
    { id: 3, title: "Премиум" },
    { id: 4, title: "Темпура" },
    { id: 5, title: "Запеченные" },
    { id: 6, title: "Горячее и салаты" },
    { id: 7, title: "Напитки и десерты" },
    { id: 8, title: "Специи" },
    { id: 9, title: "Соусы" },
];

const CategoryList = () => (
    <div className="category__list">
        <ul>
            {categories.map((item, index) => (
                <li key={item.id} className={index === 0 ? "active" : ""}>
                    <Link href="/#">{item.title}</Link>
                </li>
            ))}
        </ul>
    </div>
);

const CategoryOptions = () => (
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
);

const CategoryFilters = () => (
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
);

export const Category = () => (
    <Section>
        <div className="category">
            <div className="category__content">
                <div className="category__main-container">
                    <CategoryList />
                    <CategoryOptions />
                    <CategoryFilters />
                </div>
                <Button className="button button__cart">В корзину</Button>
            </div>
        </div>
    </Section>
);

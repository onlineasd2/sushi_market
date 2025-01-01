import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/section/Section";
import { ButtonIcon } from "@/components/buttons/button-icon/ButtonIcon";
import { ButtonCart } from "@/components/buttons/button-cart/ButtonCart";
import styles from "./styles.module.scss";

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
    <div className={styles.category__list}>
        <ul>
            {categories.map((item, index) => (
                <li key={item.id} className={index === 0 ? styles.active : ""}>
                    <Link href="/#">{item.title}</Link>
                </li>
            ))}
        </ul>
    </div>
);

const CategoryOptions = () => (
    <div className={styles.category__options}>
        <div className={styles.category__delivery}>
            <h4>Доставка и оплата</h4>
        </div>
        <span className={styles.category__line} />
        <div className={styles.category__language}>
            <h4>RU</h4>
            <h4>/</h4>
            <h4>KZ</h4>
        </div>
    </div>
);

const CategoryFilters = () => (
    <div className={styles.category__filters}>
        <ButtonIcon>
            <Image
                width={14}
                height={14}
                src="/free-icon-search-8272068.png"
                alt=""
            />
        </ButtonIcon>
        <ButtonIcon>
            <Image
                width={14}
                height={14}
                src="/free-icon-sort-8105950.png"
                alt=""
            />
        </ButtonIcon>
    </div>
);

export const Category = () => (
    <Section>
        <div className={styles.category}>
            <div className={styles.category__content}>
                <div className={styles.category__mainContainer}>
                    <CategoryList />
                    <CategoryOptions />
                    <CategoryFilters />
                </div>
                <ButtonCart />
            </div>
        </div>
    </Section>
);

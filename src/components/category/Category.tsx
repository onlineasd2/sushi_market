"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/section/Section";
import { ButtonIcon } from "@/components/buttons/button-icon/ButtonIcon";
import { ButtonCart } from "@/components/buttons/button-cart/ButtonCart";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";
import { db, Order } from "@/services/db";
import {
    useHover,
    useFloating,
    autoUpdate,
    useInteractions,
    safePolygon,
    offset,
} from "@floating-ui/react";
import moduleStyles from "./styles.module.scss";

const MAX_VALUE = 10;

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
    <div className={moduleStyles.category__list}>
        <ul>
            {categories.map((item, index) => (
                <li
                    key={item.id}
                    className={index === 0 ? moduleStyles.active : ""}
                >
                    <Link href="/#">{item.title}</Link>
                </li>
            ))}
        </ul>
    </div>
);

const changeCounter = (e: number, count: number): boolean => {
    if (e > 0 && count < MAX_VALUE) return true;

    if (e < 0 && count <= MAX_VALUE && count >= 1) return true;

    if (e < 0 && count <= 1) return false;

    return false;
};

const CategoryOptions = () => (
    <div className={moduleStyles.category__options}>
        <div className={moduleStyles.category__delivery}>
            <h4>Доставка и оплата</h4>
        </div>
        <span className={moduleStyles.category__line} />
        <div className={moduleStyles.category__language}>
            <h4>RU</h4>
            <h4>/</h4>
            <h4>KZ</h4>
        </div>
    </div>
);

const CategoryFilters = () => (
    <div className={moduleStyles.category__filters}>
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

export const Category = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const [isOpen, setIsOpen] = useState(false);

    const GAP = 14;

    const sumOrder = orders.reduce(
        (acc, order) => acc + order.price * order.count,
        0
    );

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
        middleware: [offset(GAP)],
    });

    const hover = useHover(context, {
        handleClose: safePolygon(),
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

    const getOrdersFromDB = async () => {
        try {
            const res = await db.orders.toArray();
            setOrders(res);
        } catch (error) {
            console.error(error);
        }
    };

    const editOrdersToDB = async (
        id: number,
        countState: number
    ): Promise<void> => {
        try {
            await db.orders.update(id, {
                count: countState,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteOrderFromDB = async (id: number): Promise<void> => {
        try {
            await db.orders.delete(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handlerButtonCounter = (e: number, localOrder: Order) => {
        setOrders((prevState) => {
            const prevState1 = prevState.filter(
                (set) => set.key !== localOrder.key
            );
            if (changeCounter(e, localOrder.count)) {
                const arr = [
                    ...prevState1,
                    {
                        ...localOrder,
                        count: localOrder.count + e,
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
    };

    const handlerDeleteOrder = (localOrder: Order) => {
        setOrders((prevState) => {
            const prevState1 = prevState.filter(
                (set) => set.key !== localOrder.key
            );
            const arr = [
                ...prevState1,
                {
                    ...localOrder,
                    count: 0,
                },
            ];
            return arr.sort((a, b) => {
                return a.key - b.key;
            });
        });
    };

    useEffect(() => {
        orders.forEach((order) => {
            if (order.count <= 0) {
                deleteOrderFromDB(order.id ?? 0);
                getOrdersFromDB();
            }
            if (order.count >= 1 && order.count <= MAX_VALUE)
                editOrdersToDB(order.id ?? 0, order.count);
        });
    }, [orders]);

    useEffect(() => {
        getOrdersFromDB();
    }, []);

    return (
        <Section>
            <div className={moduleStyles.category}>
                <div className={moduleStyles.category__content}>
                    <div className={moduleStyles.category__mainContainer}>
                        <CategoryList />
                        <CategoryOptions />
                        <CategoryFilters />
                    </div>
                    <ButtonCart
                        ref={refs.setReference}
                        {...getReferenceProps()}
                    />
                    {isOpen && (
                        <div
                            className={moduleStyles.category__popoverContent}
                            ref={refs.setFloating}
                            style={floatingStyles}
                            {...getFloatingProps()}
                        >
                            {orders.length === 0 ? (
                                <div className={moduleStyles.notFound}>
                                    <Image
                                        width={140}
                                        height={140}
                                        src="/emptyCartIcon.svg"
                                        alt="icon"
                                    />
                                    <h2>Ой, а тут пусто!</h2>
                                    <p>Добавьте что-нибудь из меню</p>
                                </div>
                            ) : (
                                orders
                                    .sort((a, b) => a.key - b.key)
                                    .map((localOrder) => (
                                        <div
                                            key={localOrder.key}
                                            className={
                                                moduleStyles.category__order
                                            }
                                        >
                                            <Image
                                                src={localOrder.image}
                                                width={80}
                                                height={80}
                                                alt="Суша"
                                            />
                                            <div
                                                className={
                                                    moduleStyles.category__topContainer
                                                }
                                            >
                                                <h3>{localOrder.name}</h3>
                                                <p>{localOrder.weight}</p>
                                                <ButtonCounter
                                                    value={localOrder.count}
                                                    onChange={(e) =>
                                                        handlerButtonCounter(
                                                            e,
                                                            localOrder
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div
                                                className={
                                                    moduleStyles.category__botContainer
                                                }
                                            >
                                                <ButtonIcon
                                                    onClick={() =>
                                                        handlerDeleteOrder(
                                                            localOrder
                                                        )
                                                    }
                                                >
                                                    <Image
                                                        width={14}
                                                        height={14}
                                                        src="/trash-svgrepo-com.svg"
                                                        alt="delete"
                                                    />
                                                </ButtonIcon>
                                                <h3>
                                                    {localOrder.price *
                                                        localOrder.count}
                                                </h3>
                                            </div>
                                        </div>
                                    ))
                            )}
                            {orders.length === 0 ? (
                                ""
                            ) : (
                                <div
                                    className={
                                        moduleStyles.category__totalPrice
                                    }
                                >
                                    <h3>Сумма заказа</h3>
                                    <h3>{sumOrder}</h3>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
};

"use client";

import React, { useEffect } from "react";
import { ButtonCart } from "@/components/buttons/button-cart/ButtonCart";
import Image from "next/image";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";
import { ButtonIcon } from "@/components/buttons/button-icon/ButtonIcon";
import { Order } from "@/services/db";
import { usePopover } from "@/hooks/usePopover";
import { useDatabase } from "@/hooks/useDatabase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { decrement, increment } from "@/store/counterSlice";
// import { ICard } from "@/components/sets/ICard";
import moduleStyles from "./styles.module.scss";

const MAX_VALUE = 10;
const GAP_MODAL_TOP = 14;

export const CartPopover = () => {
    const cartCount = useSelector((state: RootState) => state.cartCount.value);
    // const cartOrders = useSelector((state: RootState) => state.cartOrders);
    // Сделать конверт из ICard в Order и вывести
    // Все записи сохроняются в Redux
    const dispatch = useDispatch();
    const {
        editOrdersToDB,
        deleteOrderWithIdFromDB,
        getAllOrdersFromDB,
        orders,
        setOrders,
    } = useDatabase();

    const sumOrder = orders.reduce(
        (acc, order) => acc + order.price * order.count,
        0
    );

    const counterLimiter = (e: number, count: number): boolean => {
        if (e > 0 && count < MAX_VALUE) {
            dispatch(increment());
            return true;
        }

        if (e < 0 && count <= MAX_VALUE && count >= 1) {
            dispatch(decrement());
            return true;
        }

        if (e < 0 && count <= 1) {
            dispatch(decrement());
            return false;
        }

        return false;
    };

    const {
        refs,
        isOpen,
        getFloatingProps,
        getReferenceProps,
        floatingStyles,
    } = usePopover({ gap: GAP_MODAL_TOP });

    const handleButtonCounter = (e: number, localOrder: Order) => {
        setOrders((prevState) => {
            const prevStateFiltred = prevState.filter(
                (set) => set.key !== localOrder.key
            );
            if (counterLimiter(e, localOrder.count)) {
                const arr = [
                    ...prevStateFiltred,
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
                ...prevStateFiltred,
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

    const handleDeleteOrder = (localOrder: Order) => {
        setOrders((prevState) => {
            const prevStateFiltred = prevState.filter(
                (set) => set.key !== localOrder.key
            );
            const arr = [
                ...prevStateFiltred,
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
                deleteOrderWithIdFromDB(order.id ?? 0);
                getAllOrdersFromDB();
            }
            if (order.count >= 1 && order.count <= MAX_VALUE)
                editOrdersToDB(order.id ?? 0, order.count);
        });
    }, [orders]);

    useEffect(() => {}, [cartCount]);

    useEffect(() => {
        getAllOrdersFromDB();
    }, []);

    return (
        <>
            <ButtonCart ref={refs.setReference} {...getReferenceProps()} />
            {isOpen && (
                <div
                    className={moduleStyles.popoverContent}
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
                                    className={moduleStyles.order}
                                >
                                    <Image
                                        src={localOrder.image}
                                        width={80}
                                        height={80}
                                        alt="Суша"
                                    />
                                    <div className={moduleStyles.leftContainer}>
                                        <h3>{localOrder.name}</h3>
                                        <p>{localOrder.weight}</p>
                                        <ButtonCounter
                                            value={localOrder.count}
                                            onChange={(e) =>
                                                handleButtonCounter(
                                                    e,
                                                    localOrder
                                                )
                                            }
                                        />
                                    </div>
                                    <div
                                        className={moduleStyles.rightContainer}
                                    >
                                        <ButtonIcon
                                            onClick={() =>
                                                handleDeleteOrder(localOrder)
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
                    {orders.length > 0 && (
                        <div className={moduleStyles.totalPrice}>
                            <h3>Сумма заказа</h3>
                            <h3>{sumOrder}</h3>
                            <h3>{cartCount}</h3>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

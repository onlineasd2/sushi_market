"use client";

import React, { useEffect } from "react";
import { ButtonCart } from "@/components/buttons/button-cart/ButtonCart";
import Image from "next/image";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";
import { ButtonIcon } from "@/components/buttons/button-icon/ButtonIcon";
import { usePopover } from "@/hooks/usePopover";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
    deleteOrderWithIdFromDBRedux,
    editOrderFromDBRedux,
    getAllOrdersFromDBRedux,
} from "@/redux/ordersSlice";
import moduleStyles from "./styles.module.scss";

const MAX_VALUE = 10;
const GAP_MODAL_TOP = 14;

export const CartPopover = () => {
    const dispatch = useDispatch<AppDispatch>();

    const orders = useSelector((state: RootState) => state.cart.orders);
    const totalCountCart = orders.reduce((acc, order) => acc + order.count, 0);
    const sumOrder = orders.reduce(
        (acc, order) => acc + order.price * order.count,
        0
    );

    const {
        refs,
        isOpen,
        getFloatingProps,
        getReferenceProps,
        floatingStyles,
    } = usePopover({ gap: GAP_MODAL_TOP });

    const counterLimiter = (delta: number, count: number): boolean => {
        return (
            (delta > 0 && count < MAX_VALUE) ||
            (delta < 0 && count > 0 && count <= MAX_VALUE)
        );
    };

    const handleButtonCounter = (delta: number, orderId: number) => {
        const order = orders.find((o) => o.id === orderId);
        if (!order || !counterLimiter(delta, order.count)) return;

        dispatch(
            editOrderFromDBRedux({ id: orderId, newCount: order.count + delta })
        );
    };

    const handleDeleteOrder = (orderId: number) => {
        dispatch(deleteOrderWithIdFromDBRedux(orderId));
    };

    useEffect(() => {
        dispatch(getAllOrdersFromDBRedux());
    }, [dispatch]);

    return (
        <>
            <ButtonCart
                ref={refs.setReference}
                {...getReferenceProps()}
                value={totalCountCart}
            />
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
                        orders.map((order) => (
                            <div key={order.id} className={moduleStyles.order}>
                                <Image
                                    src={order.image}
                                    width={80}
                                    height={80}
                                    alt={order.title}
                                />
                                <div className={moduleStyles.leftContainer}>
                                    <h3>{order.title}</h3>
                                    <p>{order.weight}</p>
                                    <ButtonCounter
                                        value={order.count}
                                        onChange={(localOrder) =>
                                            handleButtonCounter(
                                                localOrder,
                                                order.id ?? 0
                                            )
                                        }
                                    />
                                </div>
                                <div className={moduleStyles.rightContainer}>
                                    <ButtonIcon
                                        onClick={() =>
                                            handleDeleteOrder(order.id ?? 0)
                                        }
                                    >
                                        <Image
                                            width={14}
                                            height={14}
                                            src="/trash-svgrepo-com.svg"
                                            alt="delete"
                                        />
                                    </ButtonIcon>
                                    <h3>{order.price * order.count}</h3>
                                </div>
                            </div>
                        ))
                    )}
                    {orders.length > 0 && (
                        <div className={moduleStyles.totalPrice}>
                            <h3>Сумма заказа</h3>
                            <h3>{sumOrder}</h3>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

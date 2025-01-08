import React, { useEffect, useState } from "react";
import { ButtonCart } from "@/components/buttons/button-cart/ButtonCart";
import moduleStyles from "@/components/category/styles.module.scss";
import Image from "next/image";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";
import { ButtonIcon } from "@/components/buttons/button-icon/ButtonIcon";
import { db, Order } from "@/services/db";
import { usePopover } from "@/hooks/usePopover";

const MAX_VALUE = 10;

const counterLimiter = (e: number, count: number): boolean => {
    if (e > 0 && count < MAX_VALUE) return true;

    if (e < 0 && count <= MAX_VALUE && count >= 1) return true;

    if (e < 0 && count <= 1) return false;

    return false;
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

export const CartPopover = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const sumOrder = orders.reduce(
        (acc, order) => acc + order.price * order.count,
        0
    );

    const popover = usePopover();

    const getOrdersFromDB = async () => {
        try {
            const res = await db.orders.toArray();
            setOrders(res);
        } catch (error) {
            console.error(error);
        }
    };

    const handlerButtonCounter = (e: number, localOrder: Order) => {
        setOrders((prevState) => {
            const prevState1 = prevState.filter(
                (set) => set.key !== localOrder.key
            );
            if (counterLimiter(e, localOrder.count)) {
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
        <>
            <ButtonCart
                ref={popover.refs.setReference}
                {...popover.getReferenceProps()}
            />
            {popover.isOpen && (
                <div
                    className={moduleStyles.category__popoverContent}
                    ref={popover.refs.setFloating}
                    style={popover.floatingStyles}
                    {...popover.getFloatingProps()}
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
                                                handlerButtonCounter(
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
                                                handlerDeleteOrder(localOrder)
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

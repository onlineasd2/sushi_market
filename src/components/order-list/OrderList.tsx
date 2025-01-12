import React from "react";
import { ButtonIcon } from "@/components/buttons/button-icon/ButtonIcon";
import Image from "next/image";
import { ButtonLogin } from "@/components/buttons/button-login/ButtonLogin";
import Link from "next/link";
import { ButtonCounter } from "@/components/buttons/button-counter/button-counter";
import { Order } from "@/services/db";
import styles from "./styles.module.scss";

interface Props {
    orders: Order[];
    handleClearAllOrders(): void;
    handleButtonCounter(e: number, localOrder: Order): void;
    handleDeleteOrder(localOrder: Order): void;
    error: string;
}

export const OrderList = ({
    orders,
    handleClearAllOrders,
    handleButtonCounter,
    handleDeleteOrder,
    error,
}: Props) => {
    return (
        <>
            <hr />
            <div className={styles.title}>
                <h1>
                    <b>Корзина</b>
                </h1>
                {orders.length !== 0 && (
                    <ButtonIcon onClick={handleClearAllOrders}>
                        <Image
                            width={18}
                            height={18}
                            src="/trash-svgrepo-com.svg"
                            alt="delete"
                        />
                    </ButtonIcon>
                )}
            </div>
            {/* eslint-disable-next-line no-nested-ternary */}
            {error ? (
                <h1>{error}</h1>
            ) : orders.length === 0 ? (
                <div className={styles.notFound}>
                    <Image
                        width={240}
                        height={240}
                        src="/emptyCartIcon.svg"
                        alt="icon"
                    />
                    <h1>Ой, а тут пусто!</h1>
                    <p>Добавьте что-нибудь из меню</p>

                    <ButtonLogin>
                        <Link href="/"> Перейти в меню</Link>
                    </ButtonLogin>
                </div>
            ) : (
                orders
                    .sort((a, b) => a.key - b.key)
                    .map((localOrder) => (
                        <div key={localOrder.key} className={styles.item}>
                            <Image
                                src={localOrder.image}
                                width={60}
                                height={60}
                                alt="Суша"
                            />
                            <div className={styles.text}>
                                <h3>
                                    <b>{localOrder.name}</b>
                                    <p>{localOrder.weight}</p>
                                </h3>
                            </div>
                            <ButtonCounter
                                value={localOrder.count}
                                onChange={(e) =>
                                    handleButtonCounter(e, localOrder)
                                }
                            />
                            <div className={styles.price}>
                                <h3>{localOrder.price * localOrder.count} ₸</h3>
                            </div>
                            <ButtonIcon
                                onClick={() => handleDeleteOrder(localOrder)}
                            >
                                <Image
                                    width={18}
                                    height={18}
                                    src="/trash-svgrepo-com.svg"
                                    alt="delete"
                                />
                            </ButtonIcon>
                        </div>
                    ))
            )}
        </>
    );
};

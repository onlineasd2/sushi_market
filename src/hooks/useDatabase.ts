import React, { useState } from "react";
import { db, Address, Order, Sticks } from "@/services/db";
import { ICard } from "@/components/sets/ICard";
import axios from "axios";

export const useDatabase = () => {
    const [countState, setCountState] = React.useState<number>(0);
    const [idState, setIdState] = React.useState<number | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [sticks, setSticks] = useState<Sticks[]>([]);
    const [address, setAddress] = useState<Address[]>([]);
    const [error, setError] = useState<string>("");
    const PRICE_STICK = 30;
    const MAX_VALUE = 10;

    const isSticksLoaded = async (): Promise<boolean> => {
        const stick = await db.sticks.get(0);
        return stick !== undefined;
    };

    const validateImageUrl = async (url: string): Promise<string> => {
        try {
            const response = await axios.head(url);
            if (response.status >= 200 && response.status < 300) return url;
        } catch (error) {
            console.error(
                "Ошибка метод validateImageUrl, картинка не найдена useDatabase: ",
                error
            );
        }
        return "/productBlurIcon.png";
    };

    const addOrderToDB = async (card: ICard): Promise<void> => {
        try {
            const img = await validateImageUrl(card.image);
            const id = await db.orders.add({
                name: card.title,
                image: img,
                weight: card.weight,
                key: card.id,
                count: countState,
                price: card.price,
            });
            setIdState(id ?? null);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteOrderFromDB = async (): Promise<void> => {
        if (idState !== null) await db.orders.delete(idState);
        setIdState(null);
    };

    const getOrderFromDB = async (card: ICard) => {
        try {
            const res = await db.orders.where("key").equals(card.id).first();
            if (res?.key === card.id) {
                setCountState(res.count);
                if (res.id !== undefined) setIdState(res.id);
            } else setCountState(0);
        } catch (error) {
            console.error(error);
        }
    };

    const editOrderFromDB = async (): Promise<void> => {
        if (idState !== null)
            await db.orders.update(idState, {
                count: countState,
            });
    };

    const addSticksDB = async (): Promise<void> => {
        try {
            const stickExists = await isSticksLoaded();
            if (!stickExists)
                await db.sticks.add({
                    id: 0,
                    count: 1,
                    price: PRICE_STICK,
                });
        } catch (error) {
            console.error(error);
        }
    };

    const getAllOrdersFromDB = async () => {
        try {
            const res = await db.orders.toArray();
            setOrders(res);
        } catch (error) {
            setError(`Error ${error}`);
        }
    };

    const getAllSticksFromDB = async () => {
        try {
            const stickExists = await isSticksLoaded();
            if (!stickExists) await addSticksDB();

            const res = await db.sticks.toArray();
            setSticks(res);
        } catch (error) {
            setError(`Error ${error}`);
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

    const editSticksToDB = async (
        id: number,
        countState: number
    ): Promise<void> => {
        try {
            const stickExists = await isSticksLoaded();
            if (!stickExists) await addSticksDB();
            if (await isSticksLoaded())
                await db.sticks.update(id, {
                    count: countState,
                });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteOrderWithIdFromDB = async (id: number): Promise<void> => {
        try {
            await db.orders.delete(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClearAllOrders = () => {
        orders.forEach((order) => {
            deleteOrderWithIdFromDB(order.id ?? 0);
        });
        setOrders([]);
    };

    const isAddressLoaded = async (): Promise<boolean> => {
        return (await db.address.get(0)) !== undefined;
    };

    const addAddressDB = async (): Promise<void> => {
        try {
            if (await isAddressLoaded)
                await db.address.add({
                    id: 0,
                    street: "",
                    house: "",
                    structure: "",
                    entrance: "",
                    floor: "",
                    apartment: "",
                    description: "",
                });
        } catch (error) {
            console.error(error);
        }
    };

    const getAddressFromDB = async () => {
        try {
            const res = await db.address.toArray();
            if (res.length === 0) await addAddressDB();
            if (await isAddressLoaded()) setAddress(res);
        } catch (error) {
            console.error(`Error ${error}`);
        }
    };

    const editAddressToDB = async (address: Address): Promise<void> => {
        try {
            const addressCount = await db.address.count();
            if (addressCount === 0) await addAddressDB();
            if (await isAddressLoaded())
                await db.address.update(address.id, {
                    street: address.street,
                    house: address.house,
                    structure: address.structure,
                    entrance: address.entrance,
                    floor: address.floor,
                    apartment: address.apartment,
                    description: address.description,
                });
        } catch (error) {
            console.error(error);
        }
    };

    return {
        addOrderToDB,
        editOrderFromDB,
        getOrderFromDB,
        deleteOrderFromDB,
        idState,
        countState,
        setCountState,
        PRICE_STICK,
        MAX_VALUE,
        getAllSticksFromDB,
        addSticksDB,
        editSticksToDB,
        getAllOrdersFromDB,
        editOrdersToDB,
        deleteOrderWithIdFromDB,
        handleClearAllOrders,
        getAddressFromDB,
        addAddressDB,
        editAddressToDB,
        orders,
        setOrders,
        sticks,
        setSticks,
        address,
        setAddress,
        error,
        setError,
    };
};

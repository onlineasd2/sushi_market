import { db, Address, Order, Sticks } from "@/services/db";
import axios from "axios";

const isSticksLoaded = async (): Promise<boolean> => {
    const stick = await db.sticks.get(0);
    return stick !== undefined;
};

export const validateImageUrl = async (url: string): Promise<string> => {
    try {
        const response = await axios.head(url);
        if (response.status >= 200 && response.status < 300) return url;
    } catch (error) {
        throw new Error(String(error));
    }
    return "/productBlurIcon.png";
};

export const addOrderToDB = async (card: Order): Promise<Order> => {
    try {
        const img = await validateImageUrl(card.image);
        const finalCount = 1;
        const id = await db.orders.add({
            title: card.title,
            image: img,
            weight: card.weight,
            key: card.id ?? 0,
            count: finalCount,
            price: card.price,
            description: card.description,
        });
        return {
            ...card,
            key: Number(card.id ?? 0),
            id: id ?? 0,
            count: finalCount,
        };
    } catch (error) {
        throw new Error(String(error));
    }
};

export const deleteOrderFromDB = async (id: number): Promise<number> => {
    await db.orders.delete(id);
    return id;
};

export const getOrderFromDB = async (card: Order): Promise<Order> => {
    try {
        const res = await db.orders
            .where("key")
            .equals(card.id ?? 0)
            .first();
        if (!res) throw new Error("Order не найден");
        return res;
    } catch (error) {
        throw new Error(String(error));
    }
};

export const editOrderFromDB = async (
    id: number,
    count: number
): Promise<{ id: number; count: number }> => {
    try {
        const newId = await db.orders.update(id, {
            count,
        });
        console.log("newId: ", newId);

        return { id, count };
    } catch (error) {
        throw new Error(String(error));
    }
};

export const addSticksDB = async (): Promise<Sticks> => {
    try {
        const PRICE_STICK = 30;
        const stickExists = await isSticksLoaded();
        if (!stickExists)
            await db.sticks.add({
                id: 0,
                count: 1,
                price: PRICE_STICK,
            });
        return {
            id: 0,
            count: 1,
            price: PRICE_STICK,
        };
    } catch (error) {
        throw new Error(String(error));
    }
};

export const getAllOrdersFromDB = async (): Promise<Order[]> => {
    try {
        return await db.orders.toArray();
    } catch (error) {
        throw new Error(String(error));
    }
};

export const getAllSticksFromDB = async (): Promise<Sticks[]> => {
    try {
        const stickExists = await isSticksLoaded();
        if (!stickExists) await addSticksDB();
        return await db.sticks.toArray();
    } catch (error) {
        throw new Error(String(error));
    }
};

export const editOrdersToDB = async (
    id: number,
    countState: number
): Promise<number> => {
    try {
        return await db.orders.update(id, {
            count: countState,
        });
    } catch (error) {
        throw new Error(String(error));
    }
};

export const editSticksToDB = async (
    id: number,
    countState: number
): Promise<number> => {
    try {
        const stickExists = await isSticksLoaded();
        if (!stickExists) await addSticksDB();
        return await db.sticks.update(id, {
            count: countState,
        });
    } catch (error) {
        throw new Error(String(error));
    }
};

export const deleteOrderWithIdFromDB = async (id: number): Promise<number> => {
    try {
        await db.orders.delete(id);
        return id;
    } catch (error) {
        throw new Error(String(error));
    }
};

const isAddressLoaded = async (): Promise<boolean> => {
    return (await db.address.get(0)) !== undefined;
};

export const addAddressDB = async (): Promise<Address> => {
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
        return {
            id: 0,
            street: "",
            house: "",
            structure: "",
            entrance: "",
            floor: "",
            apartment: "",
            description: "",
        };
    } catch (error) {
        throw new Error(String(error));
    }
};

export const getAddressFromDB = async (): Promise<Address[]> => {
    try {
        const res = await db.address.toArray();
        if (res.length === 0) await addAddressDB();
        if (await isAddressLoaded()) return res;
        throw new Error("Адресс не найден");
    } catch (error) {
        throw new Error(String(error));
    }
};

export const editAddressToDB = async (address: Address): Promise<Address> => {
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
        return {
            id: 0,
            street: address.street,
            house: address.house,
            structure: address.structure,
            entrance: address.entrance,
            floor: address.floor,
            apartment: address.apartment,
            description: address.description,
        };
    } catch (error) {
        throw new Error(String(error));
    }
};

import { db, Order } from "@/services/db";

export const AddOrder = async (orderProps: Order): Promise<boolean> => {
    try {
        await db.orders.add({
            name: orderProps.name,
            weight: orderProps.weight,
            key: orderProps.key,
            count: orderProps.count,
            price: orderProps.price,
        });
        return true;
    } catch {
        return false;
    }
};

export const ChangeCount = async (
    newOrderCount: number,
    id: number
): Promise<number | undefined | null> => {
    try {
        return await db.orders.update(id, {
            count: newOrderCount,
        });
    } catch {
        return null;
    }
};

export const DeleteOrder = async (id: number): Promise<void | null> => {
    try {
        return await db.orders.delete(id);
    } catch {
        return null;
    }
};

export const GetOrderByKey = async (
    orderKey: number
): Promise<Order | null | undefined> => {
    try {
        return await db.orders.where("key").equals(orderKey).first();
    } catch {
        return null;
    }
};

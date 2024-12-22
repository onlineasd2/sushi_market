import Dexie, { type EntityTable } from "dexie";

interface Order {
    id?: number;
    name: string;
    weight: number;
    key: number;
    count: number;
    price: number;
}

const db = new Dexie("OrdersDatabase") as Dexie & {
    orders: EntityTable<Order, "id">;
};

db.version(1).stores({
    orders: "++id, name, weight, key, count, price",
});

export type { Order };
export { db };

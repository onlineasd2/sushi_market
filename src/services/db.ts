import Dexie, { type EntityTable } from "dexie";

interface Order {
    id?: number;
    name: string;
    image: string;
    weight: number;
    key: number;
    count: number;
    price: number;
}

interface Sticks {
    id?: number;
    count: number;
    price: number;
}

const db = new Dexie("OrdersDatabase") as Dexie & {
    orders: EntityTable<Order, "id">;
    sticks: EntityTable<Sticks, "id">;
};

db.version(1).stores({
    orders: "++id, name, image, weight, key, count, price",
    sticks: "id, count, price",
});

export type { Order };
export type { Sticks };
export { db };

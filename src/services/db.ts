import Dexie, { type EntityTable } from "dexie";

interface Order {
    id: number;
    key: number;
    count: number;
}

const db = new Dexie("OrdersDatabase") as Dexie & {
    orders: EntityTable<Order, "id">;
};

db.version(1).stores({
    orders: "++id, key, count",
});

export type { Order };
export { db };

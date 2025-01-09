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

interface Address {
    id?: number;
    street: string;
    house: string;
    structure: string;
    entrance: string;
    floor: string;
    apartment: string;
    description: string;
}

const db = new Dexie("OrdersDatabase") as Dexie & {
    orders: EntityTable<Order, "id">;
    sticks: EntityTable<Sticks, "id">;
    address: EntityTable<Address, "id">;
};

db.version(1).stores({
    orders: "++id, name, image, weight, key, count, price",
    sticks: "id, count, price",
    address:
        "id, street, house, structure, entrance, floor, apartment, description",
});

export type { Order, Sticks, Address };
export { db };

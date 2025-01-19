import Dexie, { type EntityTable } from "dexie";

export interface Order {
    id?: number;
    title: string;
    image: string;
    weight: number;
    description: string;
    key: number;
    count: number;
    price: number;
}

export interface Sticks {
    id?: number;
    count: number;
    price: number;
}

export interface Address {
    id?: number;
    street: string;
    house: string;
    structure: string;
    entrance: string;
    floor: string;
    apartment: string;
    description: string;
}

export const db = new Dexie("OrdersDatabase") as Dexie & {
    orders: EntityTable<Order, "id">;
    sticks: EntityTable<Sticks, "id">;
    address: EntityTable<Address, "id">;
};

db.version(1).stores({
    orders: "++id, title, image, weight, key, count, price, description",
    sticks: "id, count, price",
    address:
        "id, street, house, structure, entrance, floor, apartment, description",
});

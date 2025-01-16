import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { Order } from "@/services/db";

interface OrdersState {
    items: Order[];
}

const initialState: OrdersState = {
    items: [],
};

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrders: (
            state,
            action: PayloadAction<{
                id: number;
                name: string;
                image: string;
                weight: number;
                key: number;
                count: number;
                price: number;
            }>
        ) => {
            const { id, count, price } = action.payload;

            const existingOrder = state.items.find((item) => item.id === id);

            if (existingOrder) {
                existingOrder.count = count;
                existingOrder.price = price;
            } else state.items.push(action.payload);
        },
        deleteOrders: (state, action: PayloadAction<{ id: number }>) => {
            const { id } = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
        },
        clearOrders: (state) => {
            state.items = [];
        },
    },
});

export const { addOrders, deleteOrders, clearOrders } = ordersSlice.actions;

export const selectCount = (state: RootState) => state.cartCount.value;

export default ordersSlice.reducer;

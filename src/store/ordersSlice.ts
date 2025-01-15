import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { ICard } from "@/components/sets/ICard";

interface OrdersState {
    items: ICard[];
}

const initialState: OrdersState = {
    items: [],
};

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrders: (state, action: PayloadAction<ICard>) => {
            state.items.push(action.payload);
        },
        deleteOrders: (state, action: PayloadAction<ICard>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            );
        },
        clearOrders: (state) => {
            state.items = [];
        },
    },
});

export const { addOrders, deleteOrders, clearOrders } = ordersSlice.actions;

export const selectCount = (state: RootState) => state.cartCount.value;

export default ordersSlice.reducer;

import { Order } from "@/services/db";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrderToDB } from "@/services/dbUtils";

interface OrdersState {
    orders: Order[];
    loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: OrdersState = {
    orders: [],
    loading: "idle",
};

export const addOrderToDBRedux = createAsyncThunk(
    "orders/addOrder",
    async (card: Order): Promise<Order> => {
        return addOrderToDB(card);
    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addOrderToDBRedux.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(addOrderToDBRedux.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders.push(action.payload);
                console.log(action.payload);
            })
            .addCase(addOrderToDBRedux.rejected, (state, action) => {
                state.loading = "failed";
                console.error(
                    "Ошибка добавления в БД Redux: ",
                    action.error.message
                );
            });
    },
});
// export const {  } = ordersSlice.actions;

export default ordersSlice.reducer;

import { Order } from "@/services/db";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrderToDB, editOrderFromDB } from "@/services/dbUtils";

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

export const editOrderFromDBRedux = createAsyncThunk(
    "orders/editOrder",
    async ({
        id,
        newCount,
    }: {
        id: number;
        newCount: number;
    }): Promise<{ id: number; count: number }> => {
        const res = await editOrderFromDB(id, newCount);
        return res;
    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addOrderToDBRedux.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders.push(action.payload);
            })
            .addCase(addOrderToDBRedux.rejected, (state, action) => {
                state.loading = "failed";
                console.error(
                    "Ошибка добавления в БД Redux: ",
                    action.error.message
                );
            })
            .addCase(editOrderFromDBRedux.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders = state.orders.map((order) =>
                    order.id === action.payload.id
                        ? { ...order, count: action.payload.count } // Обновляем только count
                        : order
                );
                console.log("state.orders ", state.orders);
            })
            .addCase(editOrderFromDBRedux.rejected, (state, action) => {
                state.loading = "failed";
                console.error(
                    "Ошибка редактирования в БД Redux: ",
                    action.error.message
                );
            });
    },
});
// export const {  } = ordersSlice.actions;

export default ordersSlice.reducer;

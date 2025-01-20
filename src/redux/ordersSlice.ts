import { Order } from "@/services/db";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addOrderToDB,
    deleteOrderWithIdFromDB,
    editOrderToDB,
    getAllOrdersFromDB,
} from "@/services/dbUtils";

interface OrdersState {
    orders: Order[];
    loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: OrdersState = {
    orders: [],
    loading: "idle",
};

export const deleteOrderWithIdFromDBRedux = createAsyncThunk(
    "orders/deleteId",
    async (id: number): Promise<number> => {
        return deleteOrderWithIdFromDB(id ?? 0);
    }
);

export const getAllOrdersFromDBRedux = createAsyncThunk(
    "orders/getAllOrders",
    async (): Promise<Order[]> => {
        return getAllOrdersFromDB();
    }
);

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
    }): Promise<{ id: number; newCount: number }> => {
        const res = await editOrderToDB(id, newCount);
        return { id: res.id, newCount: res.countState };
    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrdersFromDBRedux.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders = action.payload;
            })
            .addCase(getAllOrdersFromDBRedux.rejected, (state, action) => {
                state.loading = "failed";
                console.error(
                    "Ошибка добавления в БД Redux GetAll Func: ",
                    action.error.message
                );
            })
            .addCase(addOrderToDBRedux.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders.push(action.payload);
            })
            .addCase(addOrderToDBRedux.rejected, (state, action) => {
                state.loading = "failed";
                console.error(
                    "Ошибка добавления в БД Redux Add Func: ",
                    action.error.message
                );
            })
            .addCase(editOrderFromDBRedux.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders = state.orders.map((order) =>
                    order.id === action.payload.id
                        ? { ...order, count: action.payload.newCount }
                        : order
                );
            })
            .addCase(editOrderFromDBRedux.rejected, (state, action) => {
                state.loading = "failed";
                console.error(
                    "Ошибка редактирования в БД Redux Edit Func: ",
                    action.error.message
                );
            })
            .addCase(
                deleteOrderWithIdFromDBRedux.fulfilled,
                (state, action) => {
                    state.loading = "succeeded";
                    state.orders = state.orders.filter(
                        (order) => order.id !== action.payload
                    );
                }
            )
            .addCase(deleteOrderWithIdFromDBRedux.rejected, (state, action) => {
                state.loading = "failed";
                console.error(
                    "Ошибка добавления в БД Redux Delete Func: ",
                    action.error.message
                );
            });
    },
});
// export const {  } = ordersSlice.actions;

export default ordersSlice.reducer;

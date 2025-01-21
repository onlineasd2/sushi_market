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
    isLoading: boolean;
}

const initialState: OrdersState = {
    orders: [],
    loading: "idle",
    isLoading: false,
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
            .addCase(getAllOrdersFromDBRedux.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrdersFromDBRedux.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllOrdersFromDBRedux.rejected, (state, action) => {
                state.loading = "failed";
                console.error(
                    "Ошибка добавления в БД Redux GetAll Func: ",
                    action.error.message
                );
                state.isLoading = false;
            })
            .addCase(addOrderToDBRedux.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addOrderToDBRedux.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders.push(action.payload);
                state.isLoading = false;
            })
            .addCase(addOrderToDBRedux.rejected, (state, action) => {
                state.loading = "failed";
                console.error(
                    "Ошибка добавления в БД Redux Add Func: ",
                    action.error.message
                );
                state.isLoading = false;
            })
            .addCase(editOrderFromDBRedux.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editOrderFromDBRedux.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.orders = state.orders.map((order) =>
                    order.id === action.payload.id
                        ? { ...order, count: action.payload.newCount }
                        : order
                );
                state.isLoading = false;
            })
            .addCase(editOrderFromDBRedux.rejected, (state, action) => {
                state.loading = "failed";
                console.error(
                    "Ошибка редактирования в БД Redux Edit Func: ",
                    action.error.message
                );
                state.isLoading = false;
            })
            .addCase(deleteOrderWithIdFromDBRedux.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                deleteOrderWithIdFromDBRedux.fulfilled,
                (state, action) => {
                    state.loading = "succeeded";
                    state.orders = state.orders.filter(
                        (order) => order.id !== action.payload
                    );
                    state.isLoading = false;
                }
            )
            .addCase(deleteOrderWithIdFromDBRedux.rejected, (state, action) => {
                state.loading = "failed";
                console.error(
                    "Ошибка добавления в БД Redux Delete Func: ",
                    action.error.message
                );
                state.isLoading = false;
            });
    },
});

export default ordersSlice.reducer;

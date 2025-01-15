import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import ordersReducer from "./ordersSlice";

export const store = configureStore({
    reducer: {
        cartCount: counterReducer,
        cartOrders: ordersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

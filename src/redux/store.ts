import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import ordersSlice from "./ordersSlice";

export const store = configureStore({
    reducer: {
        cart: ordersSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

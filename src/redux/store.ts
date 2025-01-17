import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import cartReducer from "./cartReducer";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

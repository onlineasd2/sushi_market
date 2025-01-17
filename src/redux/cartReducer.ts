// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { db, Order } from "@/services/db";
// import { ICard } from "@/components/sets/ICard";
// import axios from "axios";
//
// interface OrdersState {
//     orders: Order[];
//     error: string | null;
// }
//
// const initialState: OrdersState = {
//     orders: [],
//     error: null,
// };
//
// const validateImageUrl = async (url: string): Promise<string> => {
//     try {
//         const response = await axios.head(url);
//         if (response.status >= 200 && response.status < 300) return url;
//     } catch (error) {
//         console.error(
//             "Ошибка метод validateImageUrl, картинка не найдена useDatabase: ",
//             error
//         );
//     }
//     return "/productBlurIcon.png";
// };
//
// // const addOrderToDB = createAsyncThunk(
// //     "cart/addOrderToDB",
// //     async (card: ICard) => {
// //         try {
// //             const img = await validateImageUrl(card.image);
// //             await db.orders.add({
// //                 name: card.title,
// //                 image: img,
// //                 weight: card.weight,
// //                 key: card.id,
// //                 count: 1,
// //                 price: card.price,
// //             });
// //         } catch (error) {
// //             console.error("Ошибка при добавлении заказа:", error);
// //             throw error;
// //         }
// //     }
// // );
//
// // const cartReducer = createSlice({
// //     name: "cart",
// //     initialState,
// //     reducers: {},
// //     extraReducers: (builder) => {
// //         builder
// //             .addCase(addOrderToDB.fulfilled, (state, action) => {})
// //             .addCase(addOrderToDB.rejected, (state, action) => {
// //                 state.error = action.error.message || "Не известная ошибка";
// //             });
// //     },
// // });
//
// // Статичный экспорт объектов из редакса ртк
// // export const { addToDB } = cartReducer.actions;
//
// export default cartReducer.reducer;

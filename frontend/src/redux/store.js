import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice.js'
import booksApi from './features/books/booksApi'
import ordersApi from './features/orders/ordersApi'
import wishlistReducer from './features/wishlist/wishlistSlice'; // wishlist slice import
export const store = configureStore({
    reducer:{
        cart:cartReducer,
        wishlist: wishlistReducer,
        [booksApi.reducerPath]: booksApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
    },
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware,ordersApi.middleware),
})
export default store;
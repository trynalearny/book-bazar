import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

// Load cart from local storage
const loadCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

// Save cart to local storage
const saveCart = (cartItems) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
};

const initialState = {
    cartItems: loadCart(), // Load saved cart on startup
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Increased item quantity",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added to the Cart",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            saveCart(state.cartItems); // Save to local storage
        },
        removeFromCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            }
            saveCart(state.cartItems); // Save updated cart
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cart"); // Clear local storage
        },
        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload._id);
            if (item) {
                item.quantity += 1;
            }
            saveCart(state.cartItems); // Save updated cart
        },
        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload._id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            saveCart(state.cartItems); // Save updated cart
        },
    },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;

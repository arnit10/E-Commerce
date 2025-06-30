import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if exists
const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartItems: savedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(i => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(i => i._id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(i => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

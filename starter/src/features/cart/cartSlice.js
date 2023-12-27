import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    increaseAmount: (state, { payload }) => {
      const itemId = payload.id;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount++;
    },

    // increaseAmount: (state, action) => {
    //   const itemId = action.payload;
    //   const cartItem = state.cartItems.find((item) => item.id === itemId);
    //   cartItem.amount++;
    // },

    decreaseAmount: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount--;
    },

    calculateAmountAndTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.price * item.amount;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

console.log("cartSlice: ", cartSlice); // outputs as {name: "cart", reducer: {…}, actions: {…}, caseReducers: {…}, extraReducers: {…}}

export const {
  clearCart,
  removeItem,
  increaseAmount,
  decreaseAmount,
  calculateAmountAndTotals,
} = cartSlice.actions;

export default cartSlice.reducer;

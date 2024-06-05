import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";

// use this to bypass cors error
// const url =
//   "https://cors.bridged.cc/https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (name, thunkAPI) => {
    try {
      console.log(name);
      console.log("thunkAPI: ", thunkAPI);
      console.log("thunkAPI.getState(): ", thunkAPI.getState());
      const response = await axios(url);
      console.log("response: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },

    removeItem: (state, action) => {
      console.log("action: ", action); // action is an object with a type and payload property => action: {type: "cart/removeItem", payload: id}
      console.log("action.payload: ", action.payload); // action.payload is the id of the item passed
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    increaseAmount: (state, { payload }) => {
      console.log("payload: ", payload);
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
      console.log("action: ", action); // action: {type: "cart/decreaseAmount", payload: id}
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

  extraReducers: (builder) => {
    // Lifecycle actions for createAsyncThunk
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
      });
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

import { configureStore, createSlice } from "@reduxjs/toolkit";

const FetchInitialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState: FetchInitialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

const initialState = {
  cart: [],
  total: 0,
  hasItem: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingMealIndex = state.cart.findIndex(
        (meal) => meal.id === action.payload.id
      );
      if (existingMealIndex !== -1) {
        state.cart[existingMealIndex].amount += action.payload.amount;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      const existingMealIndex = state.cart.findIndex(
        (meal) => meal.id === action.payload.id
      );
      if (existingMealIndex !== -1) {
        if (state.cart[existingMealIndex].amount > 1) {
          state.cart[existingMealIndex].amount -= action.payload.amount;
        } else {
          state.cart.pop(action.payload);
        }
      } else {
        state.cart.pop(action.payload);
      }
    },
    clearCart(state, action) {
      state.cart = action.payload;
    },
    hasItemHandler(state, action) {
      state.hasItem = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { cart: cartSlice.reducer, fetchMeals: dataSlice.reducer },
});

export const cartActions = cartSlice.actions;
export const fetchMaelActions = dataSlice.actions;

export default store;

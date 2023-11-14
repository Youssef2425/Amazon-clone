import { createSlice } from "@reduxjs/toolkit";
import { StoreProduct } from "../../../type";

interface NextState {
  products: StoreProduct[],
  favorites: StoreProduct[],
  allProducts: StoreProduct[],
  userInfo: ( null | string )
}

const initialState: NextState = {
  products: [],
  favorites: [],
  allProducts: [],
  userInfo: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(
        (product: StoreProduct) => product._id === action.payload._id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    addToFavorites: (state, action) => {
      const existingProduct = state.favorites.find(
        (product: StoreProduct) => product._id === action.payload._id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.favorites.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.products.find(
        (product: StoreProduct) => product._id === action.payload._id);
      existingProduct && existingProduct.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.products.find(
        (product: StoreProduct) => product._id === action.payload._id);
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity = 1;
      } else {
        existingProduct!.quantity--;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
      (product: StoreProduct) => product._id !== action.payload._id);
    },
    deleteFavorite: (state, action) => {
      state.products = state.favorites.filter(
      (product: StoreProduct) => product._id !== action.payload._id);
    },
    clearCart: (state) => {
      state.products = [];
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const { addToCart, addToFavorites, increaseQuantity, decreaseQuantity,
  deleteProduct, clearCart, clearFavorites , addUser, removeUser, setAllProducts, deleteFavorite } = cartSlice.actions;
  
export default cartSlice.reducer;
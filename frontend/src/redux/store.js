import { configureStore } from "@reduxjs/toolkit";
import templateSlice from "../redux/reducers/template/index";
import productsSlice from "../redux/reducers/products/index";
import authSlice from "../redux/reducers/auth/index";
import matchesSlice from "../redux/reducers/matches/index";
import cartSlice from "../redux/reducers/cart/index";
import wishlistSlice from "../redux/reducers/wishlist/index";
import categoriesSlice from "../redux/reducers/categories/index";

export default configureStore({
  reducer: {
    auth: authSlice,
    template: templateSlice,
    products: productsSlice,
    matches: matchesSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    categories: categoriesSlice,
  },
});

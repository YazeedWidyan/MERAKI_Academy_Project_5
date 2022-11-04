import { configureStore } from "@reduxjs/toolkit";
import templateSlice from "../redux/reducers/template/index";
import productsSlice from "../redux/reducers/products/index";
import authSlice from "../redux/reducers//auth/index";

export default configureStore({
  reducer: {
    auth: authSlice,
    template: templateSlice,
    products: productsSlice,
  },
});

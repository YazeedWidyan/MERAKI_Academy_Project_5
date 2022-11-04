import { configureStore } from "@reduxjs/toolkit";
import templateSlice from "../redux/reducers/template/index";

export default configureStore({
  reducer: {
    template: templateSlice,
  },
});

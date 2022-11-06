import { createSlice } from "@reduxjs/toolkit";
console.log("yazeed");
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    deleteFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((product) => {
        return product.id !== action.payload;
      });
    },
  },
});

export const { setWishlist, deleteFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

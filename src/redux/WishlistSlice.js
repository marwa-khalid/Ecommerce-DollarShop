import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const initialState = {
  wishlistItems: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
     
      const existingIndex = state.wishlistItems.findIndex(     //compare wishlist items, iterate
        (item) => item._id === action.payload._id
      );
    
      if (existingIndex >= 0) {
    
        toast.info("Product already in wishlist", {
          position: "bottom-left",
        });
      } else {
        state.wishlistItems.push({ ...action.payload });   
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
        toast.success("Product added to wishlist", {
          position: "bottom-left",
        });
      }
      
    },
    removeFromWishlist(state, action) {
        const indexToRemove = state.wishlistItems.findIndex(
          (wishlistItem) => wishlistItem._id === action.payload
        );
      
        if (indexToRemove !== -1) {
          state.wishlistItems.splice(indexToRemove, 1);
      
          toast.error("Product removed from wishlist", {
            position: "bottom-left",
          });
      
          localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
        }
      
        return state;
      },
      
  },
});

export const { addToWishlist, removeFromWishlist } =
  WishlistSlice.actions;

export default WishlistSlice.reducer;
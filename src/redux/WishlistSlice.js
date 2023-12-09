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
        state.wishlistItems[existingIndex] = {
          ...state.wishlistItems[existingIndex],
        };
    
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload };             //adding product to wishlist 
        state.wishlistItems.push(tempProductItem);                // setting initial state 1
        toast.success("Product added to wishlist", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },
    removeFromWishlist(state, action) {
        const indexToRemove = state.wishlistItems.findIndex(
          (wishlistItem) => wishlistItem._id === action.payload._id
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
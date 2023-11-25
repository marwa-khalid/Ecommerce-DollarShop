import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
     
      const existingIndex = state.cartItems.findIndex(     //compare cart items iterate
        (item) => item._id === action.payload._id
      );
    
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
    
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };             //adding product to cart 
        state.cartItems.push(tempProductItem);                                    // setting initial state 1
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(                                 // comparing prod in carts
        (item) => item._id === action.payload                                       // through ID 
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;           // if quantity > 1 then decrement
    
        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {      //if quantity =1 {delete prod}
        const nextCartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
    
        state.cartItems = nextCartItems;     // setting updated cart
    
        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }
    
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));  
    },
    incrementCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );

      if (itemIndex >= 0) {                                         //found index in cart items
        state.cartItems[itemIndex].cartQuantity += 1;

        toast.info("Increased product quantity", {
          position: "bottom-left",
        });

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {                     //del
        if (cartItem._id === action.payload._id) {
          console.log(action.payload._id)   
          console.log(cartItem._id)
          const nextCartItems = state.cartItems.filter(
            (item) => item._id !== cartItem._id
          );

          state.cartItems = nextCartItems;

          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, incrementCart, getTotals, clearCart } =
  CartSlice.actions;

export default CartSlice.reducer;
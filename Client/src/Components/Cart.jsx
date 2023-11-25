import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  clearCart,
  decreaseCart,
  getTotals,
  incrementCart,
  removeFromCart,
} from "../redux/CartSlice";
import { useEffect } from "react";

import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    console.log(product)
    dispatch(removeFromCart(product ));
  };


  const columns = [
    {
      name: "rowNumber", 
      label: "Sr No", 
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <span>{tableMeta.rowIndex + 1}</span>
        ),
      },
    },
    {
      name: "image",
      label: "Image",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <img
            src={`http://localhost:5000/${value}`}
            alt="Product"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
    },
    {
      name: "title",
      label: "Product",
    },
    {
      name: "price",
      label: "Price",
    },
    {
      name: "cartQuantity",
      label: "Quantity",
    },
    {
      name: "total",
      label: "Total",
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  const options = {
    filter: false,
    search: false,
    print: false,
    selectableRows: "none",
    responsive: "standard",
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleIncrementQuantity = (productId) => {
    dispatch(incrementCart(productId));
    
  };

  const handleDecrementQuantity = (productId) => {
    console.log(productId)
    dispatch(decreaseCart(productId));
    
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <MUIDataTable 
        title={"Cart"}
        data={cart.cartItems.map((item) => ({
          image: item.image,
          title: item.title,
          price: `Rs ${item.price.toFixed(2)}`,
          cartQuantity: (
            <div>
  <button
    onClick={() => handleDecrementQuantity(item._id)}
    style={{
      fontSize: '14px', // Adjust the font size to make the button smaller
      padding: '3px 10px', // Adjust the padding to make the button smaller
      display: 'inline-block', // Display the button as inline-block to make them horizontally aligned
      marginRight: '5px',
      borderRadius: '15px',

    }}
  >
    -
  </button>
  {item.cartQuantity}
  <button
    onClick={() => handleIncrementQuantity(item._id)}
    style={{
      fontSize: '14px', // Adjust the font size to make the button smaller
      padding: '3px 9px', // Adjust the padding to make the button smaller
      display: 'inline-block', // Display the button as inline-block to make them horizontally aligned
      marginLeft: '5px',
      borderRadius: '15px',
    }}
  >
    +
  </button>
</div>

          ),
          total: `Rs ${(item.price * item.cartQuantity).toFixed(2)}`,
          actions: (
            <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => handleRemoveFromCart(item)} 
          > 
            Remove
          </Button>
          )

        }))}
        columns={columns}
        options={options}
      /> 
      {cart.cartItems.length > 0 && (
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>
          <NavLink to="./ShippingForm" className="btn btn-primary"variant="contained">
            Proceed to Shipping
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;

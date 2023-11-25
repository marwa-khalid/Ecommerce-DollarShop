import React from "react";
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/CartSlice';
import Product from './Product';

const Wishlist = () => {
  const cartItems = useSelector(selectCart);

  // Filter products that are in the wishlist
  const wishlistProducts = cartItems.filter(item => item.isWishlist);

  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-12 mb-5">
          <h1 className="display-6 fw-bolder text-center">My Wishlist</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        {wishlistProducts.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../css/Product.css"; 
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/WishlistSlice";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  console.log(user)

  useEffect(() => { 
    getWishlist();                                                           
  }, []);

  const getWishlist = async () => {
    try {
      if(user!=null){
      const userId = user.id; 
      const response = await axios.get(`https://dollar-wala-server.vercel.app/api/wishlist/${userId}`);
      setWishlist(response.data);
      }else
      { 
        const wishlistData = JSON.parse(localStorage.getItem('wishlistItems'));
        setWishlist(wishlistData);
        console.log(wishlistData)
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = (productId)=>{
    if(user!=null){
      axios.delete(`https://dollar-wala-server.vercel.app/api/wishlist/${productId}`)
      .then((response)=>{
          getWishlist();
          console.log(response.data.message);
      })
      .catch((error)=>{
          console.log(error.response.data.message)
      })
    }
    else{
      dispatch(removeFromWishlist(productId));
      getWishlist();       
    }
  }

  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 fw-bolder text-center">Your Wishlist</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {wishlist && wishlist.length > 0 ? (
            wishlist.map((product) => (
                <div key={product._id} className="col-sm-3 mb-4">
                    <div className="card h-100 text-center p-4">
                        <div className="image-container">
                            <img
                            src={`https://dollar-wala-server.vercel.app/${product.image}`}
                            className="card-img-top"
                            alt={product.title}
                            height="150px" width="70px"
                            />
                            <div align="right">  
                                <button className="heart-red" onClick={()=>handleRemoveFromWishlist(product._id)}>
                                    <i className="fa fa-heart" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title mb-0">{product.title.substring(0, 20)}...</h5>
                            <p className="card-text lead fw-bold">Rs {product.price}</p>
                            {user!=null? (
                              <NavLink to={`/products/${product.productId}`} className="btn btn-dark">
                                  View
                              </NavLink>
                            ):
                            (
                              <NavLink to={`/products/${product._id}`} className="btn btn-dark">
                                View
                              </NavLink>
                            )
                          }
                        </div>
                </div>
            </div>
            ))
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../css/Product.css"; 
import { NavLink } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user.id; 

  useEffect(() => {                          
    getWishlist();                                                           
  }, []);

  const getWishlist = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/wishlist/${userId}`);
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = (productId)=>{
    axios.delete(`http://localhost:5000/api/wishlist/${productId}`)
    .then((response)=>{
        getWishlist();
        window.alert(response.data.message);
    })
    .catch((error)=>{
        window.alert(error.response.data.message)
    })
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
          {wishlist.length > 0 ? (
            wishlist.map((product) => (
                <div className="col-sm-3 mb-4">
                    <div className="card h-100 text-center p-4">
                        <div className="image-container">
                            <img
                            src={`http://localhost:5000/${product.image}`}
                            className="card-img-top"
                            alt={product.title}
                            height="150px" width="70px"
                            />
                            <div align="right">  
                                <button className="heart-red" onClick={()=>handleRemoveFromWishlist(product._id)}>
                                    <i class="fa fa-heart" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title mb-0">{product.title.substring(0, 20)}...</h5>
                            <p className="card-text lead fw-bold">Rs {product.price}</p>
                            <NavLink to={`/products/${product.productId}`} className="btn btn-dark">
                                View
                            </NavLink>
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

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import axios from 'axios';
import "../css/Product.css"; 

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);       
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [isHovered, setIsHovered] = useState(false);  
  const [productWishlistStates, setProductWishlistStates] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {                          
    getProducts();  
    getCategories();   
    checkProductsInWishlist();                                                          
  }, [data]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAddToWishlist = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem('userData'));
      const userId = user.id;

      await axios.post('http://localhost:5000/api/wishlist', { userId, product });
      
      // Update the state for the specific product to indicate it's in the wishlist
      setProductWishlistStates(prevStates => ({
        ...prevStates,
        [product._id]: true,
      }));

      window.alert('Product added to wishlist successfully!');
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };


  const checkProductsInWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('userData'));
      const userId = user.id;

      const response = await axios.get(`http://localhost:5000/api/wishlist/${userId}`);
      const wishlistProducts = response.data;

      // Create a map to store the wishlist state for each product
      const productWishlistMap = {};
      wishlistProducts.forEach(item => {
        productWishlistMap[item.productId] = true;
      });

      setProductWishlistStates(productWishlistMap);
    } catch (error) {
      console.error('Error checking products in wishlist:', error);
    }
  };

  const getProducts = async () => {
    await axios.get("http://localhost:5000/api/products")
    .then ((response)=>{
      setData(response.data);                                                  
      setFilter(response.data); 
    })
    .catch((error)=>{
      window.alert(error)
    })                                               
  }

  const getCategories = async () => {
    
    await axios.get("http://localhost:5000/api/categories")
    .then ((response)=>{
      setCategories(response.data);    
    })
    .catch((error)=>{
      window.alert(error)
    })                          
  }

  const handleSearch = (value) => {
    setSearchTerm(value);
    const updatedList = data.filter(
      (product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilter(updatedList);
  };


  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };


  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 fw-bolder text-center">Explore Popular Categories </h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-md-6 mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="row justify-content-center">
          
          <div className="buttons d-flex justify-content-center mt-3 pb-5">
          
          <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              className="btn btn-outline-dark me-2"
              onClick={() => filterProduct(category.category)}
            >
              {category.category}
            </button>
          ))}
        </div>
       
        <div className="row">
          {filter.map((product) => (
            
              <div className="col-sm-3 mb-4">
                <div className="card h-100 text-center p-4">
                  <div
                    className={`image-container position-relative ${isHovered ? "hovered" : ""}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={`http://localhost:5000/${product.image}`}
                      className={`card-img-top ${isHovered ? "blurred" : ""}`}
                      alt={product.title}
                      height="150px" width="70px"
                    />
                       {isHovered && (
                      <div className="image-buttons position-absolute">
                        <button className="btn btn-primary me-2"  onClick={ ()=> handleAddToCart(product)} >Add to Cart</button>
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <div align="right">
                      {productWishlistStates[product._id] ? ( 
                        
                        <button className="heart-red" onClick={()=>handleAddToWishlist(product)}>
                          <i className="fa fa-heart" aria-hidden="true"></i>
                        </button>
                      ): <button className="heart-red" onClick={()=>handleAddToWishlist(product)}>
                      <i className="fa fa-heart-o" aria-hidden="true"></i>
                    </button> }
                  </div>
                    <h5 className="card-title mb-0">{product.title.substring(0, 20)}...</h5>
                    <p className="card-text lead fw-bold">Rs {product.price}</p>
                    <NavLink to={`/products/${product._id}`} className="btn btn-dark">
                      View
                    </NavLink>
                  </div>
                </div>
              </div>
          ))}
        </div>                         
        </div>
      </div>
    </div>
  );
};

export default Products;

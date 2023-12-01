import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import axios from 'axios';
import "../css/Product.css"; 

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);         
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {                          
    getProducts();  
    getCategories();                                                             
  }, []);

  const getProducts = async () => {
    setLoading(true);
    await axios.get("https://dollarwala-server-production.up.railway.app/api/products")
    .then ((response)=>{
      setData(response.data);                                                  
      setFilter(response.data);                                                
      setLoading(false);   
    })
    .catch((error)=>{
      window.alert(error)
    })                                               
  }

  const getCategories = async () => {
    
    await axios.get("https://dollarwala-server-production.up.railway.app/api/categories")
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
  

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>

        <div className="col-md-3">
          <Skeleton height={350} />
        </div>

        <div className="col-md-3">
          <Skeleton height={350} />
        </div>

        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
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
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </>
    );
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
          {loading ? <Loading /> : <ShowProducts />}                           
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);  
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {              //redux reducer (Add to cart)
    dispatch(addToCart(product));
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
//product cards being rendered 
  return (
    <div className="col-sm-3 mb-4">
      <div className="card h-100 text-center p-4">                                           
      {/* change image while hover  */}
        <div
          className={`image-container position-relative ${isHovered ? "hovered" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={`https://dollarwala-server-production.up.railway.app/${product.image}`}
            className={`card-img-top ${isHovered ? "blurred" : ""}`}
            alt={product.title}
            height="150px" width = "70px"
          />
          {isHovered && (
            <div className="image-buttons position-absolute">
              <button className="btn btn-primary me-2"  onClick={ ()=> handleAddToCart(product)} >Add to Cart</button>
            </div>
          )}
        </div>
        <div className="card-body">
        <div align="right">
        <button className="btn btn-black">
                  <FontAwesomeIcon icon={faHeart} /> 
                </button>
                </div>
          <h5 className="card-title mb-0">{product.title.substring(0, 20)}...</h5>
          <p className="card-text lead fw-bold">Rs {product.price}</p>
         
            <NavLink to={`/products/${product._id}`} className="btn btn-dark">
              View
            </NavLink>
            
        </div>
      </div>
    </div>
  );
};

export default Products;

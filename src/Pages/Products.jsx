import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import axios from 'axios';
import "../css/Product.css"; 
import { addToWishlist} from "../redux/WishlistSlice";

const Products = () => {

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);       
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [productWishlistStates, setProductWishlistStates] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {  
    fetchWishlistItems();
    getProducts();
    getCategories();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems'));
      checkProductsInWishlist(storedWishlistItems);       

    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleAddToWishlist = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem('userData'));
      if (user!=null) {
        const userId = user.id;
        await axios.post('https://dollarwala-server-production.up.railway.app/api/wishlist', { userId, product });
  
        // Update the state for the specific product to indicate it's in the wishlist
        setProductWishlistStates(prevStates => ({
          ...prevStates,
          [product._id]: true,
        }));
  
        console.log('Product added to wishlist successfully!');
      } else {
        dispatch(addToWishlist(product));
        fetchWishlistItems();
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const checkProductsInWishlist = async (storedWishlistItems) => {
    try {
      const user = JSON.parse(localStorage.getItem('userData'));
      if(user===null){
        const productWishlistMap = {};
        
        if(storedWishlistItems!=[]){
          storedWishlistItems.map(item => {
          productWishlistMap[item._id] = true;
          setProductWishlistStates(productWishlistMap);
        });
      }
      }
      else{
        const userId = user.id;
        const response = await axios.get(`https://dollarwala-server-production.up.railway.app/api/wishlist/${userId}`);
        const wishlistProducts = response.data;

        // Create a map to store the wishlist state for each product
        const productWishlistMap = {};
        wishlistProducts.forEach(item => {
          productWishlistMap[item.productId] = true;
        });

        setProductWishlistStates(productWishlistMap);
      }

    } catch (error) {
      console.error('Error checking products in wishlist:', error);
    }
  };

  const getProducts = async () => {
    await axios.get("https://dollarwala-server-production.up.railway.app/api/products")
    .then ((response)=>{
      setData(response.data);                                                  
      setFilter(response.data); 
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
        
        <div className="row ">
          
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
       
        <div className="row p-0">
          {filter.map((product) => (
            
              <div key={product._id} className="col-sm-3 mb-4">
                <div className="card h-100 text-center p-3">
                  <div
                    className={`image-container position-relative ${hoveredProductId === product._id ? "hovered" : ""}`}
                    onMouseEnter={()=>handleMouseEnter(product._id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={`https://dollarwala-server-production.up.railway.app/${product.image}`}
                      className={`card-img-top ${hoveredProductId === product._id ? "blurred" : ""}`}
                      alt={product.title}
                      height="150px" width="70px"
                    />
                       {hoveredProductId === product._id && (
                      <div className="image-buttons position-absolute">
                        <button className="btn btn-secondary me-2"  onClick={ ()=> handleAddToCart(product)} >Add to Cart</button>
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
                    <h5 className="card-title m-0">{product.title.substring(0, 20)}...</h5>
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

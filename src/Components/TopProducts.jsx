import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {Carousel} from 'react-bootstrap';

const TopProducts = () => {
  const [top3Products, setTop3Products] = useState([]);

  useEffect(() => {
    fetchTopProducts();
  }, []);

  const fetchTopProducts = async () => {
    try {
      // Fetch all reviews
      const response = await axios.get('https://dollarwala-server-production.up.railway.app/api/reviews');
      const reviews = response.data;
  
      // Map reviews to calculate average rating and review count for each product
      const productMap = new Map();
  
      reviews.forEach((review) => {
        const { productId, rating } = review;
  
        if (!productMap.has(productId)) {
          productMap.set(productId, {
            totalRating: rating,
            reviewCount: 1,
          });
        } else {
          const productData = productMap.get(productId);
          productData.totalRating += rating;
          productData.reviewCount += 1;
        }
      });
  
      // Fetch details for the top products based on their IDs directly
      const top3ProductsDetails = await Promise.all(
        Array.from(productMap)
          .map(async ([productId, productData]) => {
            // Fetch details for the product
            const productDetailsResponse = await axios.get(`https://dollarwala-server-production.up.railway.app/api/products/${productId}`);
            return {
              ...productDetailsResponse.data,
              averageRating: productData.totalRating / productData.reviewCount,
              reviewCount: productData.reviewCount,
            };
          })
          .sort((a, b) => b.reviewCount - a.reviewCount) // Sort the array in descending order based on review count
          .slice(0, 4) // Get the top 4 products
      );
  
      // Update the state with the details of the top products
      setTop3Products(top3ProductsDetails);
      console.log(top3ProductsDetails);
    } catch (error) {
      console.error('Error fetching top products:', error.message);
    }
  };
  

  return (
    <div className='row mb-5 text-center'>
      <h2 className="mb-5">Top Rated Products</h2>
      <Carousel data-bs-theme="dark" interval="1000">
        {top3Products && top3Products.map((product) => (
          <Carousel.Item key={product._id}>
              <img
                src={`https://dollarwala-server-production.up.railway.app/${product.image}`}
                alt={product.title}
                className="img mb-2"
                height="100px"
                width="100px"
              />
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  {(product.averageRating).toFixed(2)}{' '}
                  <i className="fa fa-star" style={{ color: 'goldenrod' }} aria-hidden="true"></i>
                </p>
                <NavLink to={`/products/${product._id}`} className="btn btn-outline-dark mb-5">
                  View
                </NavLink>
          </Carousel.Item>
        ))}
      </Carousel>
    
    </div>
  );
};

export default TopProducts;

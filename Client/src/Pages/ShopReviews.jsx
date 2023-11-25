import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '../Components/StarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Make sure to import the star icon

const ShopReviews = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [averageRating, setAverageRating] = useState(0); 
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const numberOfReviews = reviews.length;

  useEffect(() => {

    const getReviews = async () => {
      
      const response = await fetch(`http://localhost:5000/api/ShopReviews`);
      const reviewData = await response.json();
      setReviews(reviewData);
      const totalRating = reviewData.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviewData.length;
      setAverageRating(averageRating); 
    };
    getReviews();
    if (reviewSubmitted) {
      getReviews(); 
      setReviewSubmitted(false); 
    }

  }, [reviewSubmitted]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const scrollToDivRef = React.useRef(null);

  const handleSubmitReview = () => {
    const reviewData = {
      rating,
      reviewText,
      customerName,
    };

    axios
      .post('http://localhost:5000/api/ShopReviews', reviewData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setReviewSubmitted(true);
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };

  const openModal = () =>{
    setIsModalOpen(!isModalOpen);
  }
  
  return (
    <div className="container py-5">
      <div ref={scrollToDivRef}>
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className='row'>
              <h5>Shop Reviews</h5>
              {reviews && reviews.length > 0 ? (
                <div className="row">
                  {reviews.map((review) => (
                    <div className="col-md-6 p-2" key={review._id}>
                      <div className="card mb-4">
                        <div className="card-body">
                          <h5 className="card-title">{review.reviewText}</h5>
                          <StarRating rating={review.rating} />
                          <p className="card-text">{review.customerName}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No reviews available for this product.</p>
              )}
            </div>
            <div className="text-right">
              <p>{numberOfReviews} Reviews</p>
              <p> 
              
            {averageRating.toFixed(2)}
            <FontAwesomeIcon
              icon={faStar}
              style={{color: 'b08504',marginLeft: '5px' }}
            />
              </p>
            </div>
          </div>
          <div className='row col-md-5'>
            <button
              className="btn btn-primary"
              onClick={openModal}
            >
              Add a Review
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className='row my-3'>
            <div className="col-md-5 mb-3">
              <label className="mb-3">Your Name </label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            
            <label className='mb-3'>Write a review: </label>
            <div className="mb-3">
              <textarea
                rows="4"
                cols="50"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
      
            <div className="mb-3">
              <label>Rate this product: </label>
              <StarRating rating={rating} onRatingChange={handleRatingChange} />
            </div>
      
            <div>
              <button onClick={handleSubmitReview}>Submit Review</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default ShopReviews;

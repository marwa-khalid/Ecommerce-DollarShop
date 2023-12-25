import React, { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import '../css/editstatus.css';

const ProductReviews = ({ productId, onReviewSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [customerName, setCustomerName] = useState('');

  const handleRatingChange = async (newRating) => {
    setRating(newRating);
  };

  const handleSubmitReview = async () => {
    const reviewData = {
      productId,
      rating,
      reviewText,
      customerName,
    };

    axios
      .post('https://dollar-wala-server.vercel.app/api/reviews', reviewData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Success');
        onReviewSubmit();
        onClose();
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <div className='modalEx'>
      <div className='modalContentIn'>

        <div className="mb-3">
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

        <div className='modalActions float-end'>
          <button className='no' onClick={onClose}>Cancel</button>
          <button className='yes' onClick={handleSubmitReview}>Submit Review</button>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;

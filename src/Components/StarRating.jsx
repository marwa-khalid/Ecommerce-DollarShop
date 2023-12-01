import React from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  const totalStars = 5;

  const handleStarClick = (clickedRating) => {
    onRatingChange(clickedRating);
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((star, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;

        // Define the style object for filled and empty stars
        const starStyle = {
          fontSize: '24px', // Adjust the size of the stars
          cursor: 'pointer',
          color: isFilled ? '#b08504' : '#ccc', // Filled star color (yellow) or empty star color (gray)
          transition: 'color 0.2s',
        };


        return (
          <span
            key={index}
            className="star"
            style={starStyle}
            onClick={() => handleStarClick(starValue)}
          >
            &#9733; {/* Unicode star character */}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;

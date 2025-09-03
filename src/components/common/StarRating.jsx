// src/components/common/StarRating.jsx
import { useState } from "react";

const StarRating = ({ totalStars = 5, initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={index}
            className={`star ${
              starValue <= (hoverRating || rating) ? "filled" : ""
            }`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <i className="fas fa-star"></i>
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;

import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RatingComponent = ({ maxRating = 5, onRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            className={`transition-all duration-200 transform ${
              ratingValue <= (hover || rating) ? 'scale-110' : 'scale-100'
            }`}
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              className={`w-8 h-8 ${
                ratingValue <= (hover || rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-200'
              }`}
            />
          </button>
        );
      })}
      {rating > 0 && (
        <span className="ml-2 text-amber-600 font-black text-lg">{rating} / {maxRating}</span>
      )}
    </div>
  );
};

export default RatingComponent;

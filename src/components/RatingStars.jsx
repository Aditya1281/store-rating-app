import { Star } from "lucide-react";

function RatingStars({
  rating = 0,
  size = 16,
}) {
  return (
    <div className="rating-stars">

      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={
            star <= Math.round(rating)
              ? "currentColor"
              : "none"
          }
        />
      ))}

      <span>{Number(rating).toFixed(1)}</span>

    </div>
  );
}

export default RatingStars;
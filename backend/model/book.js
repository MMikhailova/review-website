import mongoose, { SchemaTypes } from 'mongoose'

const book = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  reviews: [
    {
      reviewer: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      }
    },
  ],
  
});
// Define a virtual property for the average rating
book.virtual('rating').get(function () {
  if (this.reviews.length === 0) {
    return 0; // Default rating when there are no reviews
  }

  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / this.reviews.length;
});

// Ensure virtuals are included in toJSON output
book.set('toJSON', { virtuals: true });

export default mongoose.model("Book", book);


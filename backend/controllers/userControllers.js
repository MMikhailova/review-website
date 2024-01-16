import Book from "../model/book.js";
import User from "../model/user.js";

const userControllers = {
  addToFavorites: async (req, res) => {
    const { userId, bookId } = req.body;
    try {
      if (!userId || !bookId) {
        return res.status(400).json({
          message: "Incomplete request",
        });
      }
      const isBookExists = await Book.findById({ _id: bookId });

      if (!isBookExists) {
        return res.status(404).json({
          message: "Book not found",
        });
      }
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $push: {
            favorites: { bookId },
          },
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).json({
        message: `Book added to favorites for user ${userId}`,
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
    }
  },
  deleteFromFavorites: async (req, res) => {
    const { userId, bookId } = req.body;
    try {
      if (!userId || !bookId) {
        return res.status(400).json({
          message: "Incomplete request",
        });
      }
      const isBookExists = await Book.findById({ _id: bookId });
      if (!isBookExists) {
        return res.status(404).json({
          message: "Book not found",
        });
      }
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $pull: {
            favorites: { bookId },
          },
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).json({
        message: `Book added to favorites for user ${userId}`,
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export default userControllers
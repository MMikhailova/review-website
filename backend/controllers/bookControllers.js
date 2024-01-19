import Book from "../model/book.js";

const bookControllers = {
  addBook: async (req, res) => {
    const { title, author, description, url, reviews } = req.body;
    const requiredFields = ["title", "author", "description", "url"];
    const isValidRequest = requiredFields.every(
      (field) => req.body[field] !== "" || !req.body[field]
    );
    if (!isValidRequest) {
      return res.status(400).json({
        message: "Incomplete fields",
      });
    }
    const newBook = await Book.create({
      title,
      author,
      description,
      url,
    });
    return res.status(201).json(newBook);
  },
  addReview: async (req, res) => {
    const { id } = req.params;
    const { reviewer, text, rating } = req.body;

    const requiredFields = ["reviewer", "text", "rating"];
    const isValidRequest = requiredFields.every(
      (field) => req.body[field] !== "" || !req.body[field]
    );
    if (!isValidRequest) {
      return res.status(400).json({
        message: "Incomplete fields",
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          reviews: { reviewer, text, rating },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Review added successfully",
      book: updatedBook,
    });
  },
  getBooks: async (req, res) => {

    const result = await Book.find();
    return res.status(200).json({ result: result });
  },
  getBook: async (req, res) => {
    const {id} =req.params
    const result = await Book.findById({ _id: id }).populate({
      path: "reviews.reviewer",
      model: "User",
      select: "firstName lastName", 
    });
    return res.status(200).json({ result: result });
  },
  updateBook: async (req, res) => {
    const { id } = req.params;
    const { title, author, description, url } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      { _id: id },
      { title, author, description, url },
      {
        new: true,
      }
    );
    res.status(200).json({
      book: updatedBook,
    });
  },
  getBookReviews: async (req, res) => {
    const { id } = req.params;
    const books = await Book.find({ "reviews.reviewer": id })
      const reviews = books.flatMap((book) =>
        book.reviews
          .filter((review) => review.reviewer.toString() ===id)
          .map((review) => ({
            id:review.id,
            url:book.url,
            bookId: book._id,
            title: book.title,
            author: book.author,
            text: review.text,
            rating: review.rating,
          }))
      );

     return res.status(200).json({ reviews });
  }

};
export default bookControllers;

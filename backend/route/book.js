import express from 'express'
import bookControllers from '../controllers/bookControllers.js'
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router()

router.post('/books/add-book', bookControllers.addBook)
router.put("/books/add-review/:id",verifyToken, bookControllers.addReview);
router.get("/books/get-books", bookControllers.getBooks);
router.get("/books/get-book/:id",verifyToken, bookControllers.getBook);
router.put("/books/update-book/:id", bookControllers.updateBook);
router.get("/books/get-reviews/:id", verifyToken,bookControllers.getBookReviews);
export default router;
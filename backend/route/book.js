import express from 'express'
import bookControllers from '../controllers/bookControllers.js'

const router = express.Router()

router.post('/books/add-book', bookControllers.addBook)
router.put("/books/add-review/:id", bookControllers.addReview);
router.get("/books/get-books", bookControllers.getBooks);
router.get("/books/get-book/:id", bookControllers.getBook);
router.put("/books/update-book/:id", bookControllers.updateBook);
router.get("/books/get-books", bookControllers.getBooks);
router.get("/books/get-reviews/:id",bookControllers.getBookReviews)
export default router;
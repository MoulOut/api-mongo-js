import express from 'express';
import BookController from '../controllers/books/bookController.js';
import pagination from '../middlewares/pagination.js';

const bookRoutes = express.Router();

bookRoutes.get('/books', BookController.listBooks, pagination);
bookRoutes.get('/books/q', BookController.listBooksByFilter, pagination);
bookRoutes.get('/books/:id', BookController.bookById);
bookRoutes.post('/books', BookController.bookRegistry);
bookRoutes.put('/books/:id', BookController.bookUpdate);
bookRoutes.delete('/books/:id', BookController.bookDelete);

export default bookRoutes;

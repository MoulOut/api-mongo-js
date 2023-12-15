import express from 'express';
import BookController from '../controllers/books/bookController.js';

const routes = express.Router();

routes.get('/books', BookController.listBooks);
routes.get('/books/:id', BookController.bookById);
routes.post('/books', BookController.bookRegistry);
routes.delete('/books/:id', BookController.bookDelete);
routes.put('/books/:id', BookController.bookUpdate);

export default routes;

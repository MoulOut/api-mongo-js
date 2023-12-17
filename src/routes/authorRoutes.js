import express from 'express';
import AuthorController from '../controllers/authors/authorControllers.js';

const authorRoutes = express.Router();

authorRoutes.get('/authors', AuthorController.listAuthors);
authorRoutes.get('/authors/:id', AuthorController.authorById);
authorRoutes.post('/authors', AuthorController.authorRegistry);
authorRoutes.put('/authors/:id', AuthorController.authorUpdate);
authorRoutes.delete('/authors/:id', AuthorController.authorDelete);

export default authorRoutes;

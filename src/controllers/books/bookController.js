import NotFound from '../../errors/notFound.js';
import { author } from '../../models/Author.js';
import book from '../../models/Book.js';

class BookController {
  static async listBooks(req, res, next) {
    try {
      const listBooks = await book.find({});
      // const listBooks = await book.find({}).populate('author').exec(); Reference

      if (listBooks) {
        return res.status(200).json(listBooks);
      }

      next(new NotFound('Registries not found.'));
    } catch (error) {
      next(error);
    }
  }

  static async bookById(req, res, next) {
    try {
      const bookId = req.params.id;
      const bookById = await book.findById(bookId);

      if (bookById) {
        return res.status(200).json(bookById);
      }

      next(new NotFound('Book ID not found.'));
    } catch (error) {
      next(error);
    }
  }

  static async bookRegistry(req, res, next) {
    const newBook = req.body;
    try {
      const authorFound = await author.findById(newBook.author);
      const completeBook = { ...req.body, author: { ...authorFound._doc } }; //Embedding
      await book.create(completeBook);
      res
        .status(201)
        .json({ message: 'Book created with sucess', book: completeBook });
    } catch (error) {
      next(error);
    }
  }

  static async bookDelete(req, res, next) {
    try {
      const bookId = req.params.id;
      const bookToDelete = await book.findByIdAndDelete(bookId);
      if (bookToDelete) {
        res.status(204).send();
      }
      next(new NotFound('Book ID not found'));
    } catch (error) {
      next(error);
    }
  }

  static async bookUpdate(req, res, next) {
    const bookId = req.params.id;
    try {
      const authorFound = await author.findById(req.body.author);
      const completeBook = { ...req.body, author: { ...authorFound._doc } }; //Embedding
      //const newBook = req.body Reference
      const bookToUpdate = await book.findByIdAndUpdate(bookId, completeBook);
      if (bookToUpdate) {
        res.status(200).json({ message: 'Book updated with success' });
      }
      next(new NotFound('Book ID not found'));
    } catch (error) {
      next(error);
    }
  }

  static async listBooksByEditor(req, res, next) {
    const editor = req.query.editor;
    try {
      const booksByEditor = await book.find({ editor: editor });
      if (booksByEditor){
        res.status(200).json(booksByEditor);
      }

      next(new NotFound('Editor not found'));
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;

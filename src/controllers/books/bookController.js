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

      return res.status(404).json({ message: 'No registries found' });
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

      return res.status(404).json({ message: 'ID not found' });
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
      await book.findByIdAndDelete(bookId);
      res.status(204).send();
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
      await book.findByIdAndUpdate(bookId, completeBook);
      res.status(200).json({ message: 'Book updated with success' });
    } catch (error) {
      next(error);
    }
  }

  static async listBooksByEditor(req, res, next) {
    const editor = req.query.editor;
    try {
      const booksByEditor = await book.find({ editor: editor });
      res.status(200).json(booksByEditor);
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;

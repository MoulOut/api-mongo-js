import { author } from '../../models/Author.js';
import book from '../../models/Book.js';

class BookController {
  static async listBooks(req, res) {
    try {
      const listBooks = await book.find({});
      // const listBooks = await book.find({}).populate('author').exec(); Reference
      res.status(200).json(listBooks);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to get registries` });
    }
  }

  static async bookById(req, res) {
    try {
      const bookId = req.params.id;
      const bookById = await book.findById(bookId);
      res.status(200).json(bookById);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to find registry` });
    }
  }

  static async bookRegistry(req, res) {
    const newBook = req.body;
    try {
      const authorFound = await author.findById(newBook.author);
      const completeBook = { ...req.body, author: { ...authorFound._doc } }; //Embedding
      await book.create(completeBook);
      res
        .status(201)
        .json({ message: 'Book created with sucess', book: completeBook });
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to create a new registry`,
      });
    }
  }

  static async bookDelete(req, res) {
    try {
      const bookId = req.params.id;
      await book.findByIdAndDelete(bookId);
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to delete registry` });
    }
  }

  static async bookUpdate(req, res) {
    const bookId = req.params.id;
    try {
      const authorFound = await author.findById(req.body.author);
      const completeBook = { ...req.body, author: { ...authorFound._doc } }; //Embedding
      //const newBook = req.body Reference
      await book.findByIdAndUpdate(bookId, completeBook);
      res.status(200).json({ message: 'Book updated with success' });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to update registry` });
    }
  }

  static async listBooksByEditor(req, res) {
    const editor = req.query.editor;
    try {
      const booksByEditor = await book.find({ editor: editor });
      res.status(200).json(booksByEditor);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to find books` });
    }
  }
}

export default BookController;

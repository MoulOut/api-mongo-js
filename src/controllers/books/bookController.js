import NotFound from '../../errors/notFound.js';
import models from '../../models/index.js';

class BookController {
  static async listBooks(req, res, next) {
    try {
      const listBooks = await models.book.find({});
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
      const bookById = await models.book.findById(bookId);

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
      const authorFound = await models.author.findById(newBook.author);
      const completeBook = { ...req.body, author: { ...authorFound._doc } }; //Embedding
      await models.book.create(completeBook);
      return res
        .status(201)
        .json({ message: 'Book created with sucess', book: completeBook });
    } catch (error) {
      next(error);
    }
  }

  static async bookDelete(req, res, next) {
    try {
      const bookId = req.params.id;
      const bookToDelete = await models.book.findByIdAndDelete(bookId);
      if (bookToDelete) {
        return res.status(204).send();
      }
      next(new NotFound('Book ID not found'));
    } catch (error) {
      next(error);
    }
  }

  static async bookUpdate(req, res, next) {
    const bookId = req.params.id;
    try {
      const authorFound = await models.author.findById(req.body.author);
      const completeBook = { ...req.body, author: { ...authorFound._doc } }; //Embedding
      //const newBook = req.body Reference
      const bookToUpdate = await models.book.findByIdAndUpdate(
        bookId,
        completeBook
      );
      if (bookToUpdate) {
        return res.status(200).json({ message: 'Book updated with success' });
      }
      next(new NotFound('Book ID not found'));
    } catch (error) {
      next(error);
    }
  }

  static async listBooksByFilter(req, res, next) {
    try {
      const filteredValue = await filter(req.query);

      const booksByEditor = await models.book.find(filteredValue);

      if (booksByEditor) {
        return res.status(200).json(booksByEditor);
      }
      console.log(booksByEditor);
      next(new NotFound('Query not found'));
    } catch (error) {
      next(error);
    }
  }
}

async function filter(params) {
  const { title, editor, minPages, maxPages, authorName } = params;
  const filteredValue = {};

  if (title) filteredValue.title = { $regex: title, $options: 'i' };
  if (editor) filteredValue.editor = { $regex: editor, $options: 'i' };

  if (minPages || maxPages) filteredValue.pages = {};

  if (minPages) filteredValue.pages.$gte = minPages;
  if (maxPages) filteredValue.pages.$lte = maxPages;

  if (authorName) {
    const author = await models.author.find({
      name: { $regex: authorName, $options: 'i' },
    });

    if (author) {
      filteredValue.author = author.map((author) => {
        return author._doc;
      });
    }
  }

  return filteredValue;
}

export default BookController;

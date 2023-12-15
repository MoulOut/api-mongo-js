import book from '../../models/Book.js';

class BookController {

  static async listBooks(req, res) {
    try {
      const listBooks = await book.find({});
      res.status(200).json(listBooks);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to get registries` });
    }
  }

  static async bookById(req,res) {
    try {
      const bookById = await book.findById(req.params.id);
      res.status(200).json(bookById);
    } catch (error) {
      res.status(500).json({message: `${error.message} - Failed to find registry`})
    }
  }

  static async bookRegistry(req, res) {
    try {
      const newBook = await book.create(req.body);
      res
        .status(201)
        .json({ message: 'Book created with sucess', book: newBook });
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to create a new registry`,
      });
    }
  }

  static async bookDelete(req, res) {
    try {
      await book.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to delete registry` });
    }
  }

  static async bookUpdate(req, res) {
    try {
      await book.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to update registry` });
    }
  }
}

export default BookController;

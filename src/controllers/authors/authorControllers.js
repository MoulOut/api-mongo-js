import { author } from '../../models/Author.js';

class AuthorController {
  static async listAuthors(req, res, next) {
    try {
      const listAuthors = await author.find({});
      if (listAuthors) {
        res.status(200).json(listAuthors);
      }
      res.status(404).json({ message: 'Registries not found' });
    } catch (error) {
      next(error);
    }
  }

  static async authorById(req, res, next) {
    try {
      const authorId = req.params.id;
      const authorById = await author.findById(authorId);
      if (authorById) {
        res.status(200).json(authorById);
      }
      res.status(404).json({ message: 'ID not found' });
    } catch (error) {
      next(error);
    }
  }

  static async authorRegistry(req, res, next) {
    try {
      const newauthor = await author.create(req.body);
      res
        .status(201)
        .json({ message: 'author created with sucess', author: newauthor });
    } catch (error) {
      next(error);
    }
  }

  static async authorDelete(req, res, next) {
    try {
      const authorId = req.params.id;
      await author.findByIdAndDelete(authorId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async authorUpdate(req, res, next) {
    try {
      const authorId = req.params.id;
      await author.findByIdAndUpdate(authorId, req.body);
      res.status(200).json({ message: 'author updated with success' });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthorController;

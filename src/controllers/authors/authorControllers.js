import NotFound from '../../errors/notFound.js';
import models from '../../models/index.js';

class AuthorController {
  static async listAuthors(req, res, next) {
    try {
      const listAuthors = await models.author.find({});
      if (listAuthors) {
        res.status(200).json(listAuthors);
      }
      next(new NotFound('Registries not found.'));
    } catch (error) {
      next(error);
    }
  }

  static async authorById(req, res, next) {
    try {
      const authorId = req.params.id;
      const authorById = await models.author.findById(authorId);
      if (authorById) {
        res.status(200).json(authorById);
      }
      next(new NotFound('Author ID not found.'));
    } catch (error) {
      next(error);
    }
  }

  static async authorRegistry(req, res, next) {
    try {
      const newauthor = await models.author.create(req.body);
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
      const authorDeleted = await models.author.findByIdAndDelete(authorId);
      if (authorDeleted) {
        res.status(204).send();
      }
      next(new NotFound('Author ID Not found'));
    } catch (error) {
      next(error);
    }
  }

  static async authorUpdate(req, res, next) {
    try {
      const authorId = req.params.id;
      const authorToUpdate = await models.author.findByIdAndUpdate(authorId, req.body);
      if (authorToUpdate) {
        res.status(200).json({ message: 'author updated with success' });
      }
      next(new NotFound('Author ID not found'));
    } catch (error) {
      next(error);
    }
  }
}

export default AuthorController;

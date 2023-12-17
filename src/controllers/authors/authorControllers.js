import {author} from '../../models/Author.js';

class AuthorController {

  static async listAuthors(req, res) {
    try {
      const listauthors = await author.find({});
      res.status(200).json(listauthors);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to get registries` });
    }
  }

  static async authorById(req,res) {
    try {
      const authorId = req.params.id
      const authorById = await author.findById(authorId);
      res.status(200).json(authorById);
    } catch (error) {
      res.status(500).json({message: `${error.message} - Failed to find registry`})
    }
  }

  static async authorRegistry(req, res) {
    try {
      const newauthor = await author.create(req.body);
      res
        .status(201)
        .json({ message: 'author created with sucess', author: newauthor });
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Failed to create a new registry`,
      });
    }
  }

  static async authorDelete(req, res) {
    try {
      const authorId = req.params.id
      await author.findByIdAndDelete(authorId);
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to delete registry` });
    }
  }

  static async authorUpdate(req, res) {
    try {
      const authorId = req.params.id
      await author.findByIdAndUpdate(authorId, req.body);
      res.status(200).json({message: 'author updated with success'});
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to update registry` });
    }
  }
}

export default AuthorController;

import NotFound from '../errors/notFound.js';
import IncorrectRequest from '../errors/incorrectRequest.js';

async function pagination(req, res, next) {
  try {
    let { limit = 5, pages = 1, ordering = 'title:-1' } = req.query;

    let [orderCamp, order] = ordering.split(':');
    limit = parseInt(limit);
    pages = parseInt(pages);
    order = parseInt(order);

    const searchResult = req.searchResult;

    if (limit > 0 && pages > 0) {
      const paginatedList = await searchResult
        .find({})
        .sort({ [orderCamp]: order })
        .skip((pages - 1) * limit)
        .limit(limit);
      // const listBooks = await book.find({}).populate('author').exec(); Reference

      if (paginatedList) {
        return res.status(200).json(paginatedList);
      }

      next(new NotFound('Registries not found.'));
    }
    next(new IncorrectRequest('Invalid Query Parameters'));
  } catch (error) {
    next(error);
  }
}

export default pagination;
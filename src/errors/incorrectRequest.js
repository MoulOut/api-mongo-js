import BaseError from './baseError.js';

class IncorretRequest extends BaseError {
  constructor(message = 'Following error(s) encountered:') {
    super(message, 400);
  }
}

export default IncorretRequest;

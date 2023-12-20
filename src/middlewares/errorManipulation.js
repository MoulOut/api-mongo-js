import mongoose from 'mongoose';
import BaseError from '../errors/baseError.js';
import IncorretRequest from '../errors/incorrectRequest.js';
import ValidationError from '../errors/ValidationError.js';

// eslint-disable-next-line no-unused-vars
function ErrorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new IncorretRequest().sendMessage(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendMessage(res);
  }
  new BaseError().sendMessage(res);
}

export default ErrorHandler;

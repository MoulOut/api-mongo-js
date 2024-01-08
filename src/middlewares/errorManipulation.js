import mongoose from 'mongoose';
import BaseError from '../errors/baseError.js';
import IncorretRequest from '../errors/incorrectRequest.js';
import ValidationError from '../errors/ValidationError.js';

// eslint-disable-next-line no-unused-vars
function ErrorHandler(error, req, res, next) {
  console.log(error);
  if (error instanceof mongoose.Error.CastError) {
    return new IncorretRequest().sendMessage(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    return new ValidationError(error).sendMessage(res);
  } else if (error instanceof BaseError) {
    return error.sendMessage(res);
  }
  return new BaseError().sendMessage(res);
}

export default ErrorHandler;

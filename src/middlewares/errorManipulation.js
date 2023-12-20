import mongoose from 'mongoose';

// eslint-disable-next-line no-unused-vars
function ErrorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'Invalid data format.' });
  }
  
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: `${error.message}` });
  }

  return res.status(500).json({ message: 'Internal server error' });
}

export default ErrorHandler;

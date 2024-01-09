import mongoose from 'mongoose';
import { authorSchema } from './Author.js';

const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: {
      type: String,
      required: [true, 'Field "title" is required.'],
    },
    editor: {
      type: String,
      required: [true, 'Field "editor" is required.'],
    },
    price: { type: Number },
    pages: {
      type: Number,
      // min: [
      //   10,
      //   'At least 10 pages are required.Value sent on request: {VALUE}',
      // ],
      // max: [
      //   5000,
      //   'Maximum of 5000 pages exceeded.Value sent on request: {VALUE}',
      // ],
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 5000;
        },
        message: 'Pages must range from 10 to 5000. Value informed: {VALUE}'
      },
    },
    author: {
      type: authorSchema,
      required: [true, 'Field "author" is required.'],
    }, //embedding
    // author: {type: mongoose.Schema.Types.ObjectId, ref: 'author', required: true} Reference
  },
  { versionKey: false }
);

const book = mongoose.model('book', bookSchema);

export default book;

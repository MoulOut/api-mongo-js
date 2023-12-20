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
    pages: { type: Number },
    author: authorSchema, //embedding
    // author: {type: mongoose.Schema.Types.ObjectId, ref: 'author', required: true} Reference
  },
  { versionKey: false }
);

const book = mongoose.model('book', bookSchema);

export default book;

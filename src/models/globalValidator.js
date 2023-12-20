import mongoose from 'mongoose';

mongoose.Schema.Types.String.set('validate', {
  validator: (value) => value.trim() !== '',
  message: ({ path }) => `Field ${path} is empty.`,
});

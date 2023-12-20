// eslint-disable-next-line no-unused-vars
import mongoose from 'mongoose';
import './globalValidator.js';
import { author } from './Author.js';
import book from './Book.js';

const models = { author, book };
export default models;

import express from 'express';
import connectToDatabase from './config/dbConnect.js';
import routes from './routes/index.js';
import ErrorHandler from './middlewares/errorManipulation.js';
import page404 from './middlewares/page404.js';

const connection = await connectToDatabase();

connection.on('error',(error) =>{
  console.error('Connection error:',error);
});

connection.once('open',() =>{
  console.log('connected with database successfully.');
});

const app = express();
routes(app);
app.use(page404);
app.use(ErrorHandler);

export default app;

import express from 'express';
import connectToDatabase from './config/dbConnect.js';
import routes from './routes/index.js';

const connection = await connectToDatabase();

connection.on('error',(error) =>{
  console.error('Connection error:',error);
})

connection.once('open',() =>{
  console.log('connected with database successfully.')
})

const app = express();
routes(app);

export default app;

import express from 'express';

const app = express();
app.use(express.json());

const books = [
  {
    id: 1,
    titulo: 'Frankenstein',
  },
  {
    id: 2,
    titulo: 'The Demonologist',
  },
];

function searchBook(id) {
  return books.findIndex((book) => {
    return book.id === Number(id);
  });
}

app.get('/', (req, res) => {
  res.status(200).send('Apis Course');
});

app.get('/books', (req, res) => {
  res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
  const index = searchBook(req.params.id);

  res.status(200).json(books[index]);
});

app.post('/books', (req, res) => {
  books.push(req.body);
  res.status(201).send('Book registered');
});

app.put('/books/:id', (req, res) => {
  const index = searchBook(req.params.id);
  books[index].titulo = req.body.titulo;
  res.status(200).json(books);
});

app.delete('/books/:id', (req, res) => {
  const index = searchBook(req.params.id);
  books.splice(index,1);
  res.status(200).send('Registry sucessfully deleted.')
});

export default app;

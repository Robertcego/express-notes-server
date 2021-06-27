const express = require('express');
const server = express();
server.use(express.json());
const PORT = 3001;

// hardcoded notes to get right after I make the first call
let notes = [
  {
    id: 1,
    content: 'First note',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Second note',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'Third hardcoded note',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

// end of notes

// ******************************* //

// server

server.get('/', (req, res) => {
  const htmlGreet = `
    <h1>Server is running!</h1>
    <a href="http://localhost:3001/api/notes">
    <h2>
    Go to notes
    </h2>
    </a>
    `;
  res.send(htmlGreet);
});

server.get('/api/notes', (req, res) => {
  res.json(notes);
});

server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === parseInt(id));

  if (!note) {
    return res.sendStatus(404);
  } else {
    return res.json(note);
  }
});

server.post('/api/notes', (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: 'Content is required.',
    });
  }

  const note = {
    id: generateId(),
    content: body.content,
    date: new Date(),
    important: body.important || false,
  };

  notes = notes.concat(note);
  res.json(note);
});

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  notes = notes.filter((n) => n.id !== parseInt(id));
  res.status(200).json(notes);
});

server.listen(PORT, () => {
  console.log(`Hello, server is running on port: ${PORT} :)`);
});

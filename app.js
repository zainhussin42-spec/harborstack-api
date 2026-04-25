require('dotenv').config();
const express = require('express');
const app = express();

const { crews, shifts } = require('./data');

app.use(express.json());

app.use(express.json());

app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.originalUrl} - ${req.ip}`);
  next();
});

app.get('/api/v1/crews', (req, res) => {
  res.json(crews);
});

app.get('/api/v1/crews/:id', (req, res) => {
  const crew = crews.find(c => c.id === parseInt(req.params.id));
  if (!crew) return res.status(404).json({ message: 'Not found' });
  res.json(crew);
});

app.post('/api/v1/crews', (req, res) => {
  const newCrew = { id: crews.length + 1, ...req.body };
  crews.push(newCrew);
  res.status(201).json(newCrew);
});

app.put('/api/v1/crews/:id', (req, res) => {
  const index = crews.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  crews[index] = { ...crews[index], ...req.body };
  res.json(crews[index]);
});

app.delete('/api/v1/crews/:id', (req, res) => {
  const index = crews.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  const deleted = crews.splice(index, 1);
  res.json(deleted[0]);
});

app.get('/api/v1/shifts', (req, res) => {
  res.json(shifts);
});

app.get('/api/v1/shifts/:id', (req, res) => {
  const shift = shifts.find(s => s.id === parseInt(req.params.id));
  if (!shift) return res.status(404).json({ message: 'Not found' });
  res.json(shift);
});

app.post('/api/v1/shifts', (req, res) => {
  const newShift = { id: shifts.length + 1, ...req.body };
  shifts.push(newShift);
  res.status(201).json(newShift);
});

app.put('/api/v1/shifts/:id', (req, res) => {
  const index = shifts.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  shifts[index] = { ...shifts[index], ...req.body };
  res.json(shifts[index]);
});

app.delete('/api/v1/shifts/:id', (req, res) => {
  const index = shifts.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  const deleted = shifts.splice(index, 1);
  res.json(deleted[0]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

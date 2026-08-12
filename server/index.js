import express from 'express';
import cors from 'cors';
import prisma from './prismaClient.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// GET all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// POST a new task
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  const newTask = await prisma.task.create({
    data: { title, description },
  });
  res.json(newTask);
});

// PUT (update) a task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const updatedTask = await prisma.task.update({
    where: { id: parseInt(id) },
    data: { title, description, completed },
  });
  res.json(updatedTask);
});

// DELETE a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
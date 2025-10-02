import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort('-createdAt');
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Task.create({ user: req.user.id, title, description });
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, status },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4000;

// define the middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/home', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
})

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Data model: array to store data for simplicity
let taskIdCounter = 1;
let tasks = [];


///////////////
// Creating API endpoints
///////////////

// get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// add a new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: taskIdCounter++,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };

    tasks.push(newTask);
    res.json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) {
        return res.status(404).json({ error: 'Task not found' });
    }

    taskToUpdate.title = req.body.title || taskToUpdate.title;
    taskToUpdate.description = req.body.description || taskToUpdate.description;

    res.json(taskToUpdate);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter((task) => task.id !== taskId);
    res.json({ message: 'Task deleted successfully' });
});

  // Mark a task as complete
app.put('/tasks/:id/complete', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskToComplete = tasks.find((task) => task.id === taskId);

    if (!taskToComplete) {
        return res.status(404).json({ error: 'Task not found' });
    }

    taskToComplete.completed = true;
    res.json(taskToComplete);
});

// end of endpoints

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export the Express API
module.exports = app
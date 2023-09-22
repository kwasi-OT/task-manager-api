const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');
const {db, pgp} = require('./db'); //import PostgreSQL configuration
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
// let taskIdCounter = 1;
// let tasks = [];


///////////////
// Creating API endpoints
///////////////

// get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await db.any('SELECT * FROM tasks')
    res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// add a new task
app.post('/tasks', async (req, res) => {
    try {
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            completed: false,
        };

        const result = await db.one(
            'INSERT INTO tasks (title, description, completed) VALUES (${title}, ${description}, ${completed}) RETURNING id',
            newTask
        );

        newTask.id = result.id;
        res.json(newTask);
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const taskToUpdate = await db.oneOrNone('SELECT * FROM tasks WHERE id = $1', taskId);

        if (!taskToUpdate) {
            return res.status(404).json({ error: 'Task not found' });
        }

        taskToUpdate.title = req.body.title || taskToUpdate.title;
        taskToUpdate.description = req.body.description || taskToUpdate.description;

        await db.none('UPDATE tasks SET title = $1, description = $2 WHERE id = $3', [
            taskToUpdate.title,
            taskToUpdate.description,
            taskId,
        ]);

        res.json(taskToUpdate);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
    const taskId = parseInt(req.params.id);
    await db.none('DELETE FROM tasks WHERE id = $1', taskId);
    res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  // Mark a task as complete
app.put('/tasks/:id/complete', async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const taskToComplete = await db.oneOrNone('SELECT * FROM tasks WHERE id = $1', taskId);

        if (!taskToComplete) {
            return res.status(404).json({ error: 'Task not found' });
        }

        taskToComplete.completed = true;
        await db.none('UPDATE tasks SET completed = $1 WHERE id = $2', [taskToComplete.completed, taskId]);
        res.json(taskToComplete);
    } catch (error) {
        console.error('Error marking task as complete:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// end of endpoints

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
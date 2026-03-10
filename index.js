const express = require("express");
const app = express();

app.use(express.json());

const tasks = [];

app.get("/", (req,res) => {
    res.send("Welcome to Task Manager API!");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

app.get("/tasks", (req,res) => {
    res.json(tasks);
});

app.post("/tasks", (req,res) => {

    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    const task = {
        id: tasks.length + 1,
        title
    };

    tasks.push(task);

    res.status(201).json(task);
});

app.put("/tasks/:id", (req,res) => {

    const { id } = req.params;
    const { title } = req.body;

    const task = tasks.find(t => t.id == id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    task.title = title;

    res.json(task);
});

app.delete("/tasks/:id", (req,res) => {

    const { id } = req.params;

    const index = tasks.findIndex(t => t.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Task not found"});
    }

    tasks.splice(index, 1);

    res.json({ message: "Task deleted successfully" });

});
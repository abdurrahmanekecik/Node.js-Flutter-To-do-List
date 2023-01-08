const express = require("express");
const app = express();
const TodoTask = require("./models/TodoTask");
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


router.get('/', (req, res) => {
    res.send(TodoTask());
});


router.post('/', (req, res) => {
    const todoTask = new todoTask({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
    });
    todoTask.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});
//search with id
router.get('/task:Id', async (req, res) => {
    try {
        const todoTask = await todoTask.findById(req.params.taskId);
        res.json(todoTask);
    } catch (err) {
        res.json({ message: err });
    }
});
//delete task
router.delete('/task:Id', async (req, res) => {
    try {
        const removedTask = await todoTask.remove({ _id: req.params.taskId });
        res.json(removedTask);
    } catch (err) {
        res.json({ message: err });
    }
});
//data update task
router.patch('/task:Id', async (req, res) => {
    try {
        const updatedTask = await todoTask.updateOne(
            { _id: req.params.taskId },
            { $set: { name: req.body.name } }
        );
        res.json(updatedTask);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router
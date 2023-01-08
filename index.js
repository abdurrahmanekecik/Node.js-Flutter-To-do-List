const TodoTask = require("./models/TodoTask");

const express = require("express");
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
});

app.listen(3000, () => {
    console.log("App Started");
});


app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("app.ejs", { todoTasks: tasks });
    });
});

app.post('/', async (req, res) => {
    const todoTask = TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        console.log("save.")
        res.redirect("/");
    }
    catch (err) {
        console.log(err);
    }

});



app.get('/edit/:id/', (req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        res.render("edit.ejs", { todoTasks: tasks, idTask: id });
        if (err) return res.send(500, err);
    });
});


app.post('/edit/:id/',(req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});



app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});


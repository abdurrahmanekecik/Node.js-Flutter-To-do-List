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

app.get('/', (req, res) => {
    res.render('todo');
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





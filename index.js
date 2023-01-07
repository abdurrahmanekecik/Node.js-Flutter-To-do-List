const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
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

app.post('/', (req, res) => {
    console.log(req.body);
});





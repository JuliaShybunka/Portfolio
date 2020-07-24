const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
    res.render("index")
})



app.listen(3000, function() {
    console.log('Server is running on port 3000')
})
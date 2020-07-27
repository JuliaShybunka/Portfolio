const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const defaultWorkDB = require('./defaultWorkDB.json');

const app = express();

mongoose.connect('mongodb://localhost:27017/portfolioWorkDB', { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

const workSchema = new mongoose.Schema({
    image: String,
    title: String,
    link: String,
});
const Work = mongoose.model('Work', workSchema);


app.get('/', function(req, res) {
    Work.find({}, function(err, works) {
        console.log(works)
        if (works.length === 0) {
            Work.insertMany(defaultWorkDB, function(err, works) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Add default work items")
                }
            })
        } else {
            res.render('index', { works: works })
        }
    })

})



app.listen(3000, function() {
    console.log('Server is running on port 3000')
})
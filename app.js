const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
var multer = require('multer');
const defaultWorkDB = require("./defaultWorkDB.json");

const app = express();

mongoose.connect("mongodb://localhost:27017/portfolioWorkDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({
//     dest: ‘. / uploads / ’,
//     rename: function(fieldname, filename) {
//         return filename;
//     },
// }));

const workSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    title: String,
    link: String,
});
const Work = mongoose.model("Work", workSchema);

app.get("/", function(req, res) {
    Work.find({}, function(err, works) {
        if (works.length === 0) {
            Work.insertMany(defaultWorkDB, function(err, works) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Add default work items");
                    res.redirect("/");
                }
            });
        } else {
            res.render("index", { works: works });
        }
    });
});

app.get('/addWork', function(req, res) {
    res.render('addWork');
});

// app.post(‘/api/photo’, function(req, res) {
//     var newItem = new Item();
//     newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
//     newItem.img.contentType = ‘image / png’;
//     newItem.save();
// });

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
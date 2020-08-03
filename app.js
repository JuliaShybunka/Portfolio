require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const multer = require('multer');
const defaultWorkDB = require("./defaultWorkDB.json");
const fs = require('fs');
const path = require('path');


const app = express();

mongoose.connect("mongodb://localhost:27017/portfolioWorkDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

let upload = multer({ storage: storage });

const workSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    title: String,
    link: String,
});
const Work = new mongoose.model("Work", workSchema);

const skillSchema = new mongoose.Schema({
    title: String,
    number: Number
});

const Skill = new mongoose.model("Skill", skillSchema)

app.get("/", function(req, res) {
    Work.find({}, function(err, works) {
        Skill.find({}, function(err, skills) {
            res.render("index", { works: works, skills: skills });
        });
    });

});

app.post('/', upload.single('image'), function(req, res) {
    let newWork = {
        image: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        title: req.body.title,
        link: req.body.link
    };

    Work.findById(req.body.updateWork, function(err, work) {
        if (err) {
            console.log(err);
        } else {
            if (work === null) {
                Work.insertMany(newWork, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('new work add succesfully');
                    }
                });
            } else {
                Work.findByIdAndUpdate(work._id, newWork, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Successfully updated");
                    }
                });
            }
        }
    });

    res.redirect('/');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    let user = req.body.email;
    let password = req.body.password;
    if (user === process.env.LOGIN_USER && password === process.env.LOGIN_PASS) {
        res.render("adminPage");
    } else {
        res.send('You do not have Administrator access');
    }

});

app.post('/adminPage', function(req, res) {
    let name = req.body.exampleRadios;
    if (name === 'createWork') {
        res.render('addWork', { work: { _id: false } });
    } else if (name === 'updateWork') {
        Work.find({}, function(err, works) {
            if (err) {
                console.log(err);
            } else {
                res.render('updateWork', { works: works });
            }
        });
    } else if (name === 'createSkill') {
        res.render('addSkill');
    } else if (name === 'updateSkill') {
        Skill.find({}, function(err, skills) {
            if (err) {
                console.log(err);
            } else {
                res.render('updateSkill', { skills: skills });
            }
        });
    }
});

app.post('/delete', function(req, res) {
    let workId = req.body.deleteWork;
    let skillId = req.body.deleteSkill;

    let skillBtn = req.body.deleteSkillBtn;

    if (skillBtn === 'deleteSkillBtn') {
        Skill.findByIdAndDelete(skillId, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted");
                res.redirect('/');
            }
        });
    } else {
        Work.findByIdAndDelete(workId, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted");
                res.redirect('/');
            }
        });
    }
});

app.post('/update', function(req, res) {
    let workId = req.body.updateWork;
    let skillId = req.body.updateSkill;

    let skillBtn = req.body.updateSkillBtn;

    if (skillBtn === 'updateSkillBtn') {
        Skill.findById(skillId, function(err, skill) {
            if (err) {
                console.log(err);
            } else {
                console.log(skill);
                res.render('addSkill', { skill: skill });
            }
        });
    } else {
        Work.findById(workId, function(err, work) {
            if (err) {
                console.log(err);
            } else {
                res.render('addWork', { work: work });
            }
        });
    }
});

app.post('/addSkill', function(req, res) {
    let newSkill = {
        title: req.body.title,
        number: req.body.circleNumber
    };

    Skill.findById(req.body.updateSkill, function(err, skill) {
        if (err) {
            console.log(err);
        } else {
            if (skill === null) {
                Skill.insertMany(newSkill, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('new skill add succesfully');
                    }
                });
            } else {
                Skill.findByIdAndUpdate(skill._id, newSkill, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Successfully updated");
                    }
                });
            }
            res.redirect('/');
        }
    });

});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
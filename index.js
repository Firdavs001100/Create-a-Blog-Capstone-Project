import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// To store the data which was sent via post request and also to change it later
var dataSet = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        data: dataSet
    });
});

app.get("/edit/:index", (req, res) => {
    var index = parseInt(req.params.index);
    var checkedIndex = dataSet.find((data) => data.index === index);
    res.render("editPost.ejs", {
        data: checkedIndex
    });
});

app.post("/submit", (req, res) => {
    var title = req.body.title ;
    var info = req.body.info ;

    const data = {
      title: title,
      info: info,
      index: generateIndex()
    };

    dataSet.push(data);

    res.redirect("/");
});

app.post("/update/:index", (req, res) => {
    var index = parseInt(req.params.index);
    var checkedIndex = dataSet.findIndex((data) => data.index === index);
    if (checkedIndex === -1) {
        res.status(404).send('Post not found or something went wrong');
    }

    var newTitle = req.body.title;
    var newInfo = req.body.info;

    dataSet[checkedIndex].title = newTitle;
    dataSet[checkedIndex].info = newInfo;

    res.send("<script>alert('Blog updated successfully'); window.location='/';</script>");
});

app.post("/delete/:index", (req, res) => {
    var index = parseInt(req.params.index);
    dataSet = dataSet.filter((data) => data.index !== index);
    
    res.send("<script>alert('Blog deleted successfully'); window.location='/';</script>");
});

app.listen(port, () => {
    console.log(`The server is being run on port N_${port}`);
});

function generateIndex() {
        var random = Math.floor(Math.random() * 10000);
        return random;
    }
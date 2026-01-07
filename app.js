const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    var first = req.body.fName;
    var last = req.body.lName;
    var email = req.body.emailName;

    console.log(`your first name is ${first} and last name is ${last} and email is ${email}`);
})

const port = 3000;

app.listen(port, console.log(`Server is listening on port ${port}`));
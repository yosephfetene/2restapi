const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const first = req.body.fName;
    const last = req.body.lName;
    const email = req.body.emailName;

    
    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: first,
                    LNAME: last
                }
            }
        ]
    };

    const url = "https://us9.api.mailchimp.com/3.0/lists/2b79b01a67";
    const jsonData = JSON.stringify(data);
    const options = {
        method: "POST",
        auth: "angela1:a94b63373c01f550b32214fd0cd4c36e-us9"
    };

    const httpRequest = https.request(url, options, function(response){
    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    });
});


    httpRequest.write(jsonData);
    httpRequest.end();
});

const port = 3000;

app.listen(port, console.log(`Server is listening on port ${port}`));

// a94b63373c01f550b32214fd0cd4c36e-us9

// Id: 2b79b01a67
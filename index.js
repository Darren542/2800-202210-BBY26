// https://expressjs.com/en/guide/routing.html


// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));


app.get("/", function (req, res) {
    //Need to add code to check if user logged in
    // let doc = fs.readFileSync("./app/html/home.html", "utf8");
    let doc = fs.readFileSync("./app/html/splash.html", "utf8");

    // just send the text stream
    res.send(doc);
});

app.get("/nav", function(req, res) {
    let doc = fs.readFileSync("./app/templates/nav.html", "utf8");
    res.send(doc);
})


app.get("/footer", function(req, res) {
    let doc = fs.readFileSync("./app/templates/footer.html", "utf8");
    res.send(doc);
})

app.get("/splash", function(req, res) {
    let doc = fs.readFileSync("./app/html/splash.html", "utf8");
    res.send(doc);
})

// for page not found (i.e., 404)
app.use(function (req, res, next) {
    // this could be a separate file too - but you'd have to make sure that you have the path
    // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});

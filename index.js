// https://expressjs.com/en/guide/routing.html


// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");
const session = require("express-session");
const { JSDOM } = require('jsdom');

// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use(session(
    {
        secret: "extra text that no one will guess",
        name: "wazaSessionID",
        resave: false,
        // create a unique identifier for that client
        saveUninitialized: true
    })
);

app.get("/", function (req, res) {
    //Need to add code to check if user logged in
    // let doc = fs.readFileSync("./app/html/home.html", "utf8");
    
    if (req.session.loggedIn) {
        res.redirect("/profile");
    } else {

        let doc = fs.readFileSync("./app/html/splash.html", "utf8");
        //res.set("Server", "Wazubi Engine");
        //res.set("X-Powered-By", "Wazubi");
        res.send(doc);
    }
});


app.get("/profile", function (req, res) {

    // check for a session first!
    if (req.session.loggedIn) {

        res.send("./app/html/home.html");

    } else {
        // not logged in - no session and no access, redirect to home!
        res.redirect("/");
    }

});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post("/login", async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "test"
    });
    let myResults = null;
    connection.connect();
    const [rows, fields] = await connection.execute("SELECT * FROM users.sql");
    var isthere = false;
    var username;
    var password;

    for(var i = 0; i < rows.length; i++){
        if (rows[i].Email_address == req.body.username && rows[i].pwd == req.body.password){
            isthere = true;
            id = rows[i].ID;
            username = rows[i].username;
        }
    }

    if (isthere) {
        req.session.loggedIn = true;
        req.session.username = username;
        req.session.save(function (err) {

        });

        res.send({ status: "success", msg: "Logged in." });
    } else {
        res.send({ status: "fail", msg: "User account not found." });
    }
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

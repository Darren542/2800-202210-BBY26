// https://expressjs.com/en/guide/routing.html
"use strict";

const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");
const session = require("express-session");
const { JSDOM } = require('jsdom');
const mysql = require('mysql2');
const path = require("path");
const mys = require("mysql2/promise");
const { isInt32Array } = require("util/types");

app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use(session(
    {
        secret: "sdkf;lanmsflkwnfeowfnw",
        name: "BBY26-K9Meet-Session",
        resave: false,
        saveUninitialized: true
    })
);

app.get("/", function (req, res) {
    if (req.session.loggedIn) {
        if (req.session.isAdmin) {
            let doc = fs.readFileSync("./app/html/admin.html", "utf8");
            res.send(doc);
        } else {
            let doc = fs.readFileSync("./app/html/home.html", "utf8");
            res.send(doc);
        }
    } else {
        let doc = fs.readFileSync("./app/html/splash.html", "utf8");
        res.send(doc);
    }
});

app.get("/users", function (req, res) {
    if (req.session.loggedIn && req.session.isAdmin) {
        const mysql = require("mysql2");
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "BBY_26"
        });
        connection.connect();
        connection.execute(
            "SELECT * FROM BBY_26_users",
            function (error, results) {
                //console.log("results:", results);
                if (error) {
                    console.log(error);
                }
                res.send(results);
            });
        connection.end();
    }
})

app.get("/login", function (req, res) {
    if (req.session.loggedIn) {
        res.redirect("/");
    } else {
        let doc = fs.readFileSync("./app/html/login.html", "utf8");
        res.send(doc)
    }
});

app.get("/profile", function (req, res) {
    if (req.session.loggedIn) {
        res.redirect("/");
    } else {
        res.redirect("/");
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/login", function (req, res) {
    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "BBY_26"
    });
    connection.connect();
    connection.execute(
        "SELECT * FROM BBY_26_users WHERE username = ?",
        [req.body.username],
        function (error, results) {
            if (error) {
            }
            if (results[0] != null && req.body.password == results[0].pw) {
                req.session.loggedIn = true;
                req.session.userID = results[0].userID;
                req.session.username = results[0].username;
                req.session.email = results[0].email;
                req.session.isAdmin = results[0].isAdmin;
                req.session.save(function (err) {
                });
                res.send({ status: "success", msg: "Logged in." });
            } else {
                res.send({ status: "fail", msg: "User account not found." });
            }
        });
    connection.end();
});

app.get("/username", function (req, res) {
    res.send(req.session.username);
})

app.get("/email", function (req, res) {
    res.send(req.session.email);
})

app.get("/logout", function (req, res) {
    if (req.session) {
        req.session.destroy(function (error) {
            if (error) {
                res.status(400).send("Unable to log out")
            } else {
                res.redirect("/");
            }
        });
    }
})


app.get("/signup", function (req, res) {
    if (req.session.loggedIn) {
        res.redirect("/");
    }
    else {
        let doc = fs.readFileSync("./app/html/signup.html", "utf8");
        res.send(doc);
    }
});

app.get("/user_profile", function (req, res) {
    if (req.session.loggedIn) {
        let doc = fs.readFileSync("./app/html/user_profile.html", "utf8");
        res.send(doc);
    } else {
        res.redirect("/");
    }

});

app.get("/nav", function (req, res) {
    let doc;
    if (req.session.loggedIn) {
        doc = fs.readFileSync("./app/templates/nav.html", "utf8");
    } else {
        doc = fs.readFileSync("./app/templates/nav-logged-out.html", "utf8");
    }
    res.send(doc);
})

app.get("/footer", function (req, res) {
    let doc = fs.readFileSync("./app/templates/footer.html", "utf8");
    res.send(doc);
})


app.get("/splash", function (req, res) {
    if (req.session.loggedIn) {
        res.redirect("/");
    }
    let doc = fs.readFileSync("./app/html/splash.html", "utf8");
    res.send(doc);
})

app.get("/event", function (req, res) {
    let doc = fs.readFileSync("./app/html/event.html", "utf8");
    res.send(doc);
})

app.get("/search", function (req, res) {
    let doc = fs.readFileSync("./app/html/search.html", "utf8");
    res.send(doc);
})

app.get("/create", function (req, res) {
    if (req.session.loggedIn) {
        let doc = fs.readFileSync("./app/html/create.html", "utf8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
})

app.get("/create-group1", (req, res) => {
    let doc = fs.readFileSync(path.join(__dirname, "./app/html/create-group/create-group1.html"), "utf-8");
    res.send(doc);
})

app.post("/add-user", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'BBY_26'
    });
    connection.connect();
    connection.query('SELECT * FROM BBY_26_users WHERE email = ?', [req.body.email], function (error, results, fields) {
        if (error) {
        }
        if (results.length != 0) {
            res.send({ status: "failure", msg: "Email Taken" });
            connection.end();
        }
        else {
            connection.query('INSERT INTO BBY_26_users (email, username, pw) values (?, ?, ?)',
                [req.body.email, req.body.username, req.body.password],
                function (error, results, fields) {
                    if (error) {
                    }
                    res.send({ status: "success", msg: "Record added." });

                });
            connection.end();
        }
    });
});

let name;
let tags;
let country;
let state;
let city;
let description;
let isfree;

app.post("/fill", async (req, res) => {
    name = req.body.groupname;
    tags = req.body.tags;
    init();
})
async function init() {
    let connection = await mys.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        multipleStatements: true,
    });
    await connection.query(`    
        CREATE database IF NOT EXISTS groups_26;
        
        `)
    connection.end();
}

app.post("/fill2", async (req, res) => {
    country = req.body.country;
    state = req.body.state;
    city = req.body.city;
    init2();
})

async function init2() {
    let connection = await mys.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        multipleStatements: true,
        database:'groups_26'
    });
    await connection.query(`    
    CREATE table IF NOT EXISTS ${name}(
        name varchar(100) PRIMARY KEY,
        tags varchar(100), 
        country varchar(50),
        province varchar(50),
        city varchar(50),
        descrip varchar(1000),
        isFree int NOT NULL
    );
        `)
    connection.end();
}

app.post("/fill3", async (req, res) => {
    description = req.body.description;
})

app.post("/fill4", async (req, res) => {
    isfree = req.body.free;
})

app.get("/next2", (req, res) => {
    let doc = fs.readFileSync(path.join(__dirname, "./app/html/create-group/create-group2.html"), "utf-8");
    res.send(doc);
})

app.get("/next3", (req, res) => {
    let doc = fs.readFileSync(path.join(__dirname, "./app/html/create-group/create-group3.html"), "utf-8");
    res.send(doc);
})

app.get("/next4", (req, res) => {
    let doc = fs.readFileSync(path.join(__dirname, "./app/html/create-group/create-group4.html"), "utf-8");
    res.send(doc);
})

app.get("/next5", (req, res) => {
    let doc = fs.readFileSync(path.join(__dirname, "./app/html/create-group/create-group5.html"), "utf-8");
    res.send(doc);
})

app.get("/exit", (req, res) => {
    res.header('Content-Type', 'text/html');
    let doc = fs.readFileSync(path.join(__dirname, "./app/html/create.html"), "utf-8");
    res.send(doc);
})

app.get("/grouphome", async (req, res) => {
    let connection = await mys.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        multipleStatements: true,
        database: 'groups_26'
    });
    connection.connect();
    await connection.query(
        `INSERT IGNORE INTO  ${name} (name,tags,country,province,city,descrip,isFree) values (?, ?, ?, ?, ?, ?, ?)`,
        [name, tags, country, state, city, description, isfree],
        function (error, results, fields) {
            if (error) {
            }
            res.send({ status: "success", msg: "Record added." });

        });
    res.header('Content-Type', 'text/html');
    let doc = fs.readFileSync(path.join(__dirname, "./app/html/group_home.html"), "utf-8");
    await connection.end();
    
    res.send(doc);
})



app.use(function (req, res, next) {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

let port = 8000;
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});

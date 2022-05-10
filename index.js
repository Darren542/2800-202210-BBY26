// https://expressjs.com/en/guide/routing.html
"use strict";

const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");
const session = require("express-session");
const { JSDOM } = require('jsdom');
const mysql = require('mysql2');

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

    //-------------------------------------------------------------------------
    // Code to prevent nodejs server from crashing if database not found from
    // @author banguncool & Dharman
    // @see https://stackoverflow.com/questions/57469707/how-to-catch-connection-error-with-nodejs-mysql2-library-async-await
    //--------------------------------------------------------------------------
    function testConnection() {
        let connection;
        let myPromise = new Promise((resolve, reject) => {

            connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "BBY_26"
            });

            connection.connect(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });

        });

        myPromise.then(
            function (value) {
                connection.execute(
                    "SELECT * FROM BBY_26_users WHERE username = ?",
                    [req.body.username],
                    function (error, results) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            if (results[0] != null && req.body.password == results[0].pw) {
                                req.session.loggedIn = true;
                                req.session.userID = results[0].userID;
                                req.session.username = results[0].username;
                                req.session.email = results[0].email;
                                req.session.isAdmin = results[0].isAdmin;
                                req.session.save(function (err) {
                                });
                                res.send({ status: "success", msg: "Logged in." });
                            }
                            else {
                                res.send({ status: "fail", msg: "User account not found." });
                            }
                        }
                    });
                connection.end();
            },
            function (error) {
                console.log(error);
            }
        );
    }
    testConnection();
});

app.get("/username", function (req, res){
    res.send(req.session.username);
})

app.get("/email", function (req, res){
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
    if (req.session.loggedIn){
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
    if (req.session.loggedIn){
        let doc = fs.readFileSync("./app/html/create.html", "utf8");
        res.send(doc);
    } else {
        res.redirect("/");
    }    
})


app.post("/add-user", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    function tryConnection() {
        let connection;
        let myPromise = new Promise((resolve, reject) => {

            connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "BBY_26"
            });

            connection.connect(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });

        });

        myPromise.then(
            function (value) {
                connection.query('SELECT * FROM BBY_26_users WHERE email = ? OR username = ?', [req.body.email, req.body.username], function (error, results, fields) {
                    if (error) {
                    }
                    console.log("lookup results", results);
                    if (results && results[0] != null) {
                        if ( results[0].username == req.body.username) {
                            res.send({ status: "ufailure", msg: "Username Taken" });
                        } else if (results[0].email == req.body.email) {
                            res.send({ status: "efailure", msg: "Email Taken" });
                        } else {
                            console.log("This should only show if their are errors in the database lookups")
                        }
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
            },
            function (error) {
                console.log(error);
            }
        );
    }
    tryConnection()
});

app.use(function (req, res, next) {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

let port = 8000;
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});

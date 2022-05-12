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

app.get("/username", function (req, res) {
    res.send(req.session.username);
});

app.get("/email", function (req, res) {
    res.send(req.session.email);
});

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

// /profile sends them to the correct profile url
app.get("/profile", function (req, res) {
    if (req.session.loggedIn) {
        res.redirect(`/user-profile/${req.session.username}`);
    } else {
        res.redirect("/");
    }
});

// sends the user to their own profile page
app.get("/user-profile/", function (req, res) {
    if (req.session.loggedIn) {
        // let doc = fs.readFileSync("./app/html/user-profile.html", "utf8");
        //res.send(doc);
        res.redirect(`/user-profile/${req.session.username}`);
    } else {
        res.redirect("/");
    }

});

// get the page of the wanted users profile
app.get("/user-profile/:id", function (req, res) {
    if (req.session.loggedIn) {
        let doc = fs.readFileSync("./app/html/user-profile.html", "utf8");
        res.send(doc);
    } else {
        res.redirect("/");
    }

});

app.get("/profile-info/:id", function (req, res) {
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
                    "SELECT * FROM BBY_26_profiles WHERE username = ?",
                    [req.params.id],
                    function (error, results) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            if (results[0] != null) {
                                if (!results[0].showLoc && results[0].username != req.session.username) {
                                    results[0].country = 'hidden';
                                    results[0].province = 'hidden';
                                    results[0].city = 'hidden';
                                    results[0].test = 'testadd';
                                }
                                res.send(results[0]);
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

app.get("/dogs", function (req, res) {
    res.send("dog section is still under construction");
});

app.get("/photos", function (req, res) {
    res.send("photos section is still under construction");
});

app.get("/my-events", function (req, res) {
    res.send("events section is still under construction");
});

app.get("/my-groups", function (req, res) {
    res.send("groups section is still under construction");
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
                    if (results && results[0] != null) {
                        if (results[0].username == req.body.username) {
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
                res.send({ status: "database-fail", msg: "database not found" });
            }
        );
    }
    tryConnection()
});

app.get("/edit-profile/", function (req, res) {
    if (req.session.loggedIn) {
        res.redirect(`/edit-profile/${req.session.username}`);
    } else {
        res.redirect("/");
    }
})

app.get("/edit-profile/:id", function (req, res) {
    if (req.session.loggedIn) {
        let doc = fs.readFileSync("./app/html/user-profile-editor.html", "utf8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.post("/update-profile/:id", function (req, res) {
    // Can only update the profile if you are admin or it is your account
    if (req.session.loggedIn && (req.session.isAdmin || (req.session.username == req.params.id))) {
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
            function () {
                connection.execute(
                    "UPDATE bby_26_profiles SET displayName = ?, quote = ?, country = ?, province = ?, city = ?, userDescription = ?, showEmail = ?, showLoc = ? WHERE username = ?",
                    [req.body.displayName, req.body.quote, req.body.country, req.body.province, req.body.city, req.body.description, req.body.showEmail, req.body.showLocation, req.params.id],
                    function (error, results) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.send({ status: "success", msg: "Updated Profile." });
                        }

                    });
                connection.end();
            },
            function (error) {
                console.log(error);
            }
        );


    } else {
        res.redirect("/");
    }
});

app.get("/account-settings/", function (req, res) {
    if (req.session.loggedIn) {
        let doc = fs.readFileSync("./app/html/account-settings.html", "utf8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});


app.use(function (req, res, next) {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

let port = 8000;
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});

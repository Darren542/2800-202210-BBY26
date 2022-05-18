// https://expressjs.com/en/guide/routing.html
"use strict";

const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");
const session = require("express-session");
const mysql = require('mysql2');
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const mys = require("mysql2/promise");
const { isInt32Array } = require("util/types");
// const { createQuery } = require("mysql2/typings/mysql/lib/Connection");

// Creating Events
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

const profileImageStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/img/profile-imgs")
    },
    filename: function (req, file, callback) {
        callback(null, `profile-${req.params.id}`);
    }
});

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (req.session.isAdmin || (req.session.username == req.params.id)) {
        cb(null, true);
    } else {
        cb(new Error("You don't have permission!"), false);
    }
};

const uploadProfileImage = multer({
    storage: profileImageStorage,
    fileFilter: multerFilter,
});

//-----------------------------------------------------------------------------------------
// Help on password hashing from:
// @see https://stackoverflow.com/questions/17201450/salt-and-hash-password-in-nodejs-w-crypto
// @author Matthew
async function hashPassword(password, callback) {
    let salt = crypto.randomBytes(64).toString('base64');
    let iterations = 100;
    let keylength = 64;
    crypto.pbkdf2(password, salt, iterations, keylength, 'sha512', (err, derivedKey) => {
        if (err) {
            console.log(err);
        } else {
            callback({
                salt: salt,
                hash: derivedKey.toString('hex'),
                iterations: iterations
            });
        }
    });
}

async function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt, callback) {
    crypto.pbkdf2(passwordAttempt, savedSalt, savedIterations, 64, 'sha512', (err, derivedKey) => {
        if (err) {
            console.log(err);
        } else {
            callback(savedHash == derivedKey.toString('hex'));
        }
    });
}

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

//ONLY FOR ADMINS
app.get("/home", function (req, res) {
    if (req.session.loggedIn && req.session.isAdmin) {
        let doc = fs.readFileSync("./app/html/home.html", "utf8");
        res.send(doc);
    }
});


app.get("/event", function (req, res) {
    let doc = fs.readFileSync("./app/html/event.html", "utf8");
    res.send(doc);
})

app.get('/event', function(req, res) {
    if (req.session.loggedIn && req.session.isAdmin) {
        const mysql = require("mysql2");
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        connection.connect();
        connection.execute(
            "SELECT * FROM BBY_26_events",
            function (error, results) {
                console.log("results:", results);
                if (error) {
                    console.log(error);
                }
                res.send(results);
            });
        connection.end();
    }
});

app.post('/create-event', function (req, res) {
    let formData = {
        eventName: req.body.eventName,
        eventLocationStreet: req.body.eventLocationStreet,
        eventLocationCity: req.body.eventLocationCity,
        eventDateTime: req.body.eventDateTime,
        eventEndTime: req.body.eventEndTime,
        eventDuration: req.body.eventDuration,
        eventType: req.body.eventType,
        // eventImage: document.getElementById('image-upload').;
        eventDetails: req.body.eventDetails,
        // this probleley needs to changed
        eventTags: req.body.eventTags
    }
    console.log(formData);

    if (req.session.loggedIn) {
        const mysql = require('mysql2');
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        connection.connect();
        connection.execute(
            "INSERT INTO BBY_26_address (street, city) VALUES (?, ?)", [formData.eventLocationStreet, formData.eventLocationCity],
            // have to write error functions
        )
        connection.execute(
            "INSERT INTO BBY_26_events (event_name, event_date_time, event_end_time, event_duration, event_type, event_description) VALUES (?, ?, ?, ?, ?, ?)", [formData.eventName, formData.eventDateTime, formData.eventEndTime, formData.eventDuration, formData.eventType, formData.eventDetails],
            // have to write error functions
        )
        connection.end();
    }
});

app.get("/users", function (req, res) {
    if (req.session.loggedIn && req.session.isAdmin) {
        const mysql = require("mysql2");
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
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


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.post("/modify-privilege", function (req, res) {
    if (req.session.username == req.body.username) {
        res.send({ status: "fail", msg: "Cannot demote yourself." });
    } else {
        const connection2 = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        connection2.connect();
        connection2.execute(
            "SELECT COUNT(isAdmin) AS DATA FROM BBY_26_users WHERE isAdmin = 1",
            function (error, results) {
                if (error) {
                }
                if (results[0].DATA != 1 || req.body.changeTo == 1) {
                    const connection = mysql.createConnection({
                        host: "localhost",
                        user: "root",
                        password: "",
                        database: "COMP2800"
                    });
                    connection.connect();
                    connection.execute(
                        "UPDATE BBY_26_users SET isAdmin = ? WHERE username = ?",
                        [req.body.changeTo, req.body.username],
                        function (error, results) {
                            if (error) {
                            }
                            if (results.affectedRows != 0) {
                                res.send({ status: "success", msg: "Changed privilege." });
                            } else {
                                res.send({ status: "fail", msg: "User account not found." });
                            }
                        }
                    );
                    connection.end();
                } else {
                    res.send({ status: "fail", msg: "Need at least one account with admin privilege!" });
                }
            }
        );
        connection2.end();
    }
});
app.post("/delete-user", function (req, res) {
    if (req.session.username == req.body.username) {
        res.send({ status: "fail", msg: "Cannot delete yourself." });
    } else {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "COMP2800"
        });
        connection.connect();
        connection.execute(
            "DELETE FROM BBY_26_users WHERE username = ?",
            [req.body.username],
            function (error, results) {
                if (error) {
                }
                if (results[0] != null) {
                    res.send({ status: "success", msg: "Deleted user." });
                } else {
                    res.send({ status: "fail", msg: "User account not found." });
                }
            });
        connection.end();
    }
});
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
                database: "COMP2800"
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
                            if (results[0] != null) {
                                isPasswordCorrect(results[0].pwHash, results[0].pwSalt, results[0].pwIterations, req.body.password, (correct) => {
                                    if (correct) {
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
                            } else {
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

app.get("/username/:id", function (req, res) {
    if (req.session.loggedIn && (req.session.isAdmin || (req.session.username == req.params.id))) {
        let connection;
        let myPromise = new Promise((resolve, reject) => {

            connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "COMP2800"
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
                    "SELECT username FROM bby_26_users WHERE username = ?",
                    [req.params.id],
                    function (error, results) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.send({ status: "success", msg: "Updated Username.", username: results[0].username });
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

app.get("/email/:id", function (req, res) {
    if (req.session.loggedIn && (req.session.isAdmin || (req.session.username == req.params.id))) {
        let connection;
        let myPromise = new Promise((resolve, reject) => {

            connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "COMP2800"
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
                    "SELECT email FROM bby_26_users WHERE username = ?",
                    [req.params.id],
                    function (error, results) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.send({ status: "success", msg: "Updated Username.", email: results[0].email });
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
                database: "COMP2800"
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

app.get("/create-events", function (req, res) {
    if (req.session.loggedIn) {
        let doc = fs.readFileSync("./app/html/create-events.html", "utf8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.get("/create-group1", (req, res) => {
    let doc = fs.readFileSync(path.join(__dirname, "./app/html/create-group/create-group1.html"), "utf-8");
    res.send(doc);
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
                database: "COMP2800"
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
            async function (value) {
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
                        hashPassword(req.body.password, (values) => {
                            //console.log('values', values)
                            connection.query('INSERT INTO BBY_26_users (email, username, pw, pwHash, pwSalt, pwIterations) values (?, ?, ?, ?, ?, ?)',
                                [req.body.email, req.body.username, req.body.password, values.hash, values.salt, values.iterations],
                                function (error, results, fields) {
                                    if (error) {
                                        console.log("error from db", error);
                                        connection.end();
                                    } else {
                                        connection.query('INSERT INTO BBY_26_profiles (username, displayName) values (?, ?)',
                                            [req.body.username, req.body.username],
                                            function (error, results, fields) {
                                                if (error) {
                                                }
                                                res.send({ status: "success", msg: "Record added." });
                                                connection.end();
                                            });
                                    }
                                });
                        });

                    }
                });

            },
            function (error) {
                connection.end();
                //console.log(error);
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
                database: "COMP2800"
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
        res.redirect(`/account-settings/${req.session.username}`);
    } else {
        res.redirect("/");
    }
});

app.get("/account-settings/:id", function (req, res) {
    if (req.session.loggedIn && (req.session.isAdmin || (req.session.username == req.params.id))) {
        let doc = fs.readFileSync("./app/html/account-settings.html", "utf8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.post("/update-username/:id", function (req, res) {
    // Can only update the profile if you are admin or it is your account

    if (req.session.loggedIn && (req.session.isAdmin || (req.session.username == req.params.id))) {
        let connection;
        let myPromise = new Promise((resolve, reject) => {

            connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "COMP2800"
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
                    "UPDATE bby_26_users SET username = ? WHERE username = ?",
                    [req.body.username, req.params.id],
                    function (error, results) {
                        if (error) {
                            //console.log(error);
                            if (error.code == 'ER_DUP_ENTRY') {
                                res.send({ status: "failure", msg: "Username Taken." });
                            }
                        }
                        else {
                            if (req.session.username == req.params.id) {
                                req.session.username = req.body.username;
                            }
                            res.send({ status: "success", msg: "Updated Username." });
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

app.post("/update-email/:id", function (req, res) {
    // Can only update the profile if you are admin or it is your account

    if (req.session.loggedIn && (req.session.isAdmin || (req.session.username == req.params.id))) {
        let connection;
        let myPromise = new Promise((resolve, reject) => {

            connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "COMP2800"
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
                    "UPDATE bby_26_users SET email = ? WHERE username = ?",
                    [req.body.email, req.params.id],
                    function (error, results) {
                        if (error) {
                            //console.log(error);
                            if (error.code == 'ER_DUP_ENTRY') {
                                res.send({ status: "failure", msg: "Email Taken." });
                            }
                        }
                        else {
                            req.session.email = req.body.email;
                            res.send({ status: "success", msg: "Updated Email." });
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

app.post("/update-password/:id", function (req, res) {
    // Can only update the profile if you are admin or it is your account

    if (req.session.loggedIn && (req.session.isAdmin || (req.session.username == req.params.id))) {
        let connection;
        let myPromise = new Promise((resolve, reject) => {

            connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "COMP2800"
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
                hashPassword(req.body.password, (values) => {
                    connection.execute(
                        "UPDATE bby_26_users SET pwHash = ?, pwSalt = ?, pwIterations = ?, pw = ? WHERE username = ?",
                        [values.hash, values.salt, values.iterations, req.body.password, req.params.id],
                        function (error, results) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                res.send({ status: "success", msg: "Updated Password." });
                            }

                        });
                    connection.end();
                })

            },
            function (error) {
                console.log(error);
            }
        );


    } else {
        res.redirect("/");
    }
});

app.post('/update-avatar/:id', uploadProfileImage.single("files"), function (req, res) {

    if (req.session.loggedIn && (req.session.isAdmin || (req.session.username == req.params.id))) {

        let connection;
        let myPromise = new Promise((resolve, reject) => {

            connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "COMP2800"
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
                    "UPDATE bby_26_profiles SET profileImg = ? WHERE username = ?",
                    [`profile-${req.params.id}`, req.params.id],
                    function (error, results) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            res.send({ status: "success", msg: "Updated Profile Image." });
                        }

                    });
                connection.end();
            },
            function (error) {
                console.log(error);
            }
        );
    } else {
        res.send({ status: "failure", msg: "You did not have permission to do that." });
    }
});

app.get("/profile-url/:id", function (req, res) {

    function testConnection() {
        let connection;
        let myPromise = new Promise((resolve, reject) => {

            connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "COMP2800"
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
                    "SELECT profileImg FROM BBY_26_profiles WHERE username = ?",
                    [req.params.id],
                    function (error, results) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            if (results[0] != null) {
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
        database: 'groups_26'
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

app.get("/getgroup", async (req, res) => {
    const connection = await mys.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "groups_26",
        multipleStatements: true
    });
    connection.connect();
    const [rows, fields] = await connection.execute(`SELECT * FROM ${name}`);
    let arr = {
        "tags": rows[0].tags, "country": rows[0].country, "name": rows[0].name, "province": rows[0].province,
        "city": rows[0].city, "descrip": rows[0].descrip, "plan": rows[0].isFree
    };

    res.setHeader("Content-Type", "application/json");
    res.send(arr);
})

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
    let doc = fs.readFileSync(path.join(__dirname, "./app/html/group-home.html"), "utf-8");
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

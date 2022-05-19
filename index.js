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

app.get('/event', function (req, res) {
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
app.get("/lookup", function (req, res) {
    let doc = fs.readFileSync("./app/html/lookup.html", "utf8");
    res.send(doc);
})

app.get("/users", function (req, res) {
    if (req.session.loggedIn) {
        if (req.session.isAdmin) {
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
        } else {
            const mysql = require("mysql2");
            const connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "COMP2800"
            });
            connection.connect();
            connection.execute(
                "SELECT username FROM BBY_26_users WHERE isAdmin = 0",
                function (error, results) {
                    //console.log("results:", results);
                    if (error) {
                        console.log(error);
                    }
                    res.send(results);
                });
            connection.end();
        }
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

app.delete("/unreserve-event", function (req, res) {
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
                "DELETE FROM BBY_26_RSVP WHERE userID = ? AND eventID = ?;",
                [req.body.userID, req.body.eventID],
                function (error, results) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                    }
                });
            connection.end();
        });
});

app.delete("/delete-event", function (req, res) {
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
                "DELETE FROM BBY_26_events WHERE eventID = ?;",
                [req.body.eventID],
                function (error, results) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                    }
                });
            connection.end();
        });
});

app.put("/update-event", function (req, res) {
    // console.log("EventID: " + req.body.eventID);
    // console.log("Event Name: " + req.body.eventName);
    // console.log("Event City: " + req.body.eventLocationCity);
    // console.log("Event Street: " + req.body.eventLocationStreet);
    // console.log("Event Date:" + req.body.eventDateTime);
    // console.log("Event Duration:" + req.body.eventDuration);
    // console.log("Event Description:" + req.body.eventDescription);
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
                "UPDATE BBY_26_events SET event_name = ?, event_date_time = ?, event_duration = ?, event_description = ? WHERE eventID = ?;",
                [req.body.eventName, req.body.eventDateTime, req.body.eventDuration, req.body.eventDescription, req.body.eventID],
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
        });
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

app.get("/userID", function (req, res) {
    res.status(200).send((req.session.userID).toString());
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
    res.redirect(`/user-profile/${req.query.username}`);
});

// sends the user to their own profile page
app.get("/user-profile/", function (req, res) {
    if (req.session.loggedIn) {
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
                                if (!results[0].showLoc) {
                                    results[0].country = 'hidden';
                                    results[0].province = 'hidden';
                                    results[0].city = 'hidden';
                                    results[0].test = 'testadd';
                                }
                                results[0].username = req.params.id;
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
});

app.get("/photos", function (req, res) {
});

app.post("/get-events", function (req, res) {
    let events = [];
    let connection;
    let index = 0;
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
                "SELECT * FROM BBY_26_RSVP WHERE userID = (SELECT userID FROM BBY_26_users WHERE username = ?)",
                [req.body.username],
                function (error, results) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        if (results[0] != null) {
                            results.forEach(function () {
                                events.push(results[index].eventID);
                                index++;
                            });
                            res.send(events);
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
});

app.post("/get-event-address", function (req, res) {
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
                "SELECT * FROM BBY_26_addresses WHERE eventID = ?",
                [req.body.eventID],
                function (error, results) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        if (results[0] != null) {
                            res.send(results);
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
})

app.post("/load-event", function (req, res) {
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
                "SELECT * FROM BBY_26_events WHERE eventID = ?",
                [req.body.eventID],
                function (error, results) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        if (results[0] != null) {
                            res.send(results);
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
});

app.get("/my-groups", function (req, res) {
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
});

app.get("/create-events", function (req, res) {
    if (req.session.loggedIn) {
        let doc = fs.readFileSync("./app/html/create-events.html", "utf8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

// Page for starting the creation of a group.
// Loads in partially created group if parameter in URL
// Linked from create page.
app.get("/create-group", (req, res) => {
    if (req.session.loggedIn) {
        if (req.query.saveID != null) {
            let doc = fs.readFileSync("./app/html/create-group.html", "utf-8");
            res.send(doc);
        } else {
            let doc = fs.readFileSync("./app/html/create-group.html", "utf-8");
            res.send(doc);
        }
    } else {
        res.redirect("/");
    }
});

// Creates a new group in the database. Group info in groups table, Group's tags in group_tags table.
// Used by the create-group page.
app.post("/create-group", function (req, res) {
    // Can only update the profile if you are admin or it is your account
    if (req.session.loggedIn) {
        let connection;
        let myPromise = new Promise((resolve, reject) => {

            connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "COMP2800",
                multipleStatements: true
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
                connection.query('INSERT INTO BBY_26_groups (ownerID, group_name, country, province, city, group_description, group_type) values (?, ?, ?, ?, ?, ?, ?)',
                    [req.session.userID, req.body.name, req.body.country, req.body.province, req.body.city, req.body.description, req.body.planType],
                    function (error, results, fields) {
                        if (error) {
                            console.log("error from db", error);
                            connection.end();
                        } else {
                            let newGroupID = results.insertId;
                            if (req.body.tags.length > 1) {
                                for (let tags = 1; tags < req.body.tags.length; tags++) {
                                    connection.query('INSERT INTO BBY_26_group_tags (groupID, tag_name) values (?, ?)',
                                        [newGroupID, req.body.tags[tags]],
                                        function (error, results, fields) {
                                            if (error) {
                                                console.log("error from db", error);
                                                connection.end();
                                            }
                                            if (tags == (req.body.tags.length - 1)) {
                                                res.send({ status: "success", msg: "Group Created." });
                                                connection.end();
                                            }
                                        });
                                }
                            } else {
                                res.send({ status: "success", msg: "Group Created." });
                                connection.end();
                            }

                        }
                    });
            },
            function (error) {
                console.log(error);
            }


        );

    } else {
        res.redirect("/");
    }
});

// Saves a partially created group into a the saved_group table
// Used by the create-group page.
app.post("/save-group", function (req, res) {
    // Can only update the profile if you are admin or it is your account
    if (req.session.loggedIn) {
        let connection;
        let myPromise = new Promise((resolve, reject) => {

            connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "COMP2800",
                multipleStatements: true
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
                connection.query('INSERT INTO BBY_26_saved_group (ownerID, group_name, country, province, city, group_description, group_type, tagString, guidelines, terms) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [req.session.userID, req.body.name, req.body.country, req.body.province, req.body.city, req.body.description, req.body.planType, req.body.tags, req.body.guidelines, req.body.terms],
                    function (error, results, fields) {
                        if (error) {
                            console.log("error from db", error);
                            connection.end();
                        } else {
                            if (req.body.saveNum != 0) {
                                connection.execute(
                                    "DELETE FROM BBY_26_saved_group WHERE savedID = ?",
                                    [req.body.saveNum],
                                    function (error, results) {
                                        if (error) {
                                            console.log(error)
                                        }
                                        if (results.affectedRows != null) {
                                            res.send({ status: "success", msg: "Group Saved." });
                                        } else {
                                            res.send({ status: "fail", msg: "User account not found." });
                                        }
                                    });
                            } else {
                                res.send({ status: "success", msg: "Group Saved." });
                                connection.end();
                            }

                        }
                    });
            },
            function (error) {
                console.log(error);
            }


        );

    } else {
        res.redirect("/");
    }
});

// To get the data on all partially complete groups users have saved
// Used by create page
app.get("/saved-groups", function (req, res) {
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
                "SELECT * FROM BBY_26_saved_group WHERE ownerID = ?",
                [req.session.userID],
                function (error, results) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        if (results[0] != null) {
                            res.send(results);
                        }
                        else {
                            res.send({ status: "fail", msg: "No saved groups found." });
                        }
                    }
                });
            connection.end();
        },
        function (error) {
            console.log(error);
        }
    );
});

// To get the data on a single partially complete group the user has saved
// Used by create-group page
app.get("/saved-groups/:id", function (req, res) {
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
                "SELECT * FROM BBY_26_saved_group WHERE ownerID = ? AND savedID = ?",
                [req.session.userID, req.params.id],
                function (error, results) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        if (results[0] != null) {
                            res.send(results);
                        }
                        else {
                            res.send({ status: "fail", msg: "No saved group found." });
                        }
                    }
                });
            connection.end();
        },
        function (error) {
            console.log(error);
        }
    );
});

// Used to delete a partially completed group from its table
// Used by the create page
app.post("/delete-saved-group/:id", function (req, res) {
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
                "DELETE FROM BBY_26_saved_group WHERE savedID = ? AND ownerID = ?",
                [req.params.id, req.session.userID],
                function (error, results) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.send({ status: "success", msg: "Group save deleted." });
                    }
                    connection.end();
                });

        },
        function (error) {
            console.log(error);
        }
    );
});

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


var grouparray = [];

app.post("/fill", async (req, res) => {
    name = req.body.groupname;
    tags = req.body.tags;
    grouparray.push(name);
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

app.get("/get-tables", async (req, res) => {
    let sendgroup = [];
    for (let i = 0; i < grouparray.length; i++) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "groups_26",
            multipleStatements: true
        });
        connection.connect();
        const [rows, fields] =
            await connection.execute(`SELECT * FROM  ${grouparray[i]}`);
        let arr = {
            "name": rows[0].name, "tags": rows[0].tags, "country": rows[0].country, "province": rows[0].province, "city": rows[0].city,
            "description": rows[0].descrip, "plan": rows[0].isFree
        };
        sendgroup.push(arr);
    }
    res.setHeader("Content-Type", "application/json");
    res.send(sendgroup);
})

app.get("/grouphome", async (req, res) => {
    if (req.session.loggedIn) {
        let doc = fs.readFileSync(path.join(__dirname, "./app/html/group-home.html"), "utf-8");
        res.header('Content-Type', 'text/html');
        res.send(doc);
    } else {
        res.redirect("/");
    }


})

app.get("/community-guidelines", function (req, res) {
    let doc = fs.readFileSync("./app/html/community-guidelines.html", "utf8");
    res.send(doc)
});

app.get("/terms-and-conditions", function (req, res) {
    let doc = fs.readFileSync("./app/html/terms-and-conditions.html", "utf8");
    res.send(doc)
});

app.use(function (req, res, next) {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

let port = 8000;
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});

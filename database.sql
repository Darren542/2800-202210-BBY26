CREATE database IF NOT EXISTS BBY_26;

USE BBY_26;

CREATE table IF NOT EXISTS BBY_26_users(
	userID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	username varchar(16),
	email varchar(50),
	pw varchar(1000),
	isAdmin boolean DEFAULT FALSE
);
	
INSERT INTO BBY_26_users (username, email, pw, isAdmin) 
VALUES ("bcherng", "briancherngsch@gmail.com", 123, 1);

INSERT INTO BBY_26_users (username, email, pw, isAdmin) 
VALUES ("dluck", "dluck4@my.bcit.ca", 123, 1);

INSERT INTO BBY_26_users (username, email, pw, isAdmin) 
VALUES ("ajand", "aryan.jand@gmail.com", 123, 1);

INSERT INTO BBY_26_users (username, email, pw, isAdmin) 
VALUES ("psidhul", "sidhupahul0@gmail.com", 123, 1);

INSERT INTO BBY_26_users (username, email, pw, isAdmin) 
VALUES ("gsingh", "germanpreet3533@gmail.com", 123, 1);

INSERT INTO BBY_26_users (username, email, pw) 
VALUES ("testuser", "notreal@gmail.com", 123);

CREATE TABLE IF NOT EXISTS BBY_26_events(
	eventID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	event_name varchar(20),
    FOREIGN KEY 
	event_time TIME NOT NULL,
    event_date DATE NOT NULL,
    -- false is private & public is ture
	event_type boolean DEFAULT FALSE,
    event_description varchar(500),
    event_tags varchar(500),
);

CREATE TABLE IF NOT EXISTS BBY_26_address(
    addressID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    event_street varchar(75),
    event_city varchar(50),
);




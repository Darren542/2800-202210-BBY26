CREATE database IF NOT EXISTS bby26;

USE bby26;

CREATE table IF NOT EXISTS users(
	userID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	username varchar(16),
	email varchar(50),
	pw varchar(1000),
	isAdmin boolean DEFAULT FALSE
);
	
INSERT INTO users (username, email, pw, isAdmin) 
VALUES ("bcherng", "briancherngsch@gmail.com", 123, 1);

INSERT INTO users (username, email, pw, isAdmin) 
VALUES ("dluck", "dluck4@my.bcit.ca", 123, 1);

INSERT INTO users (username, email, pw, isAdmin) 
VALUES ("ajand", "aryan.jand@gmail.com", 123, 1);

INSERT INTO users (username, email, pw, isAdmin) 
VALUES ("psidhul", "sidhupahul0@gmail.com", 123, 1);

INSERT INTO users (username, email, pw, isAdmin) 
VALUES ("gsingh", "germanpreet3533@gmail.com", 123, 1);

INSERT INTO users (username, email, pw) 
VALUES ("testuser", "notreal@gmail.com", 123);






CREATE database IF NOT EXISTS COMP2800;

USE COMP2800;

CREATE table IF NOT EXISTS BBY_26_users(
	userID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	username varchar(20) NOT NULL UNIQUE,
	email varchar(50) NOT NULL UNIQUE,
	pw varchar(1000) NOT NULL,
	isAdmin boolean DEFAULT FALSE,
	creationTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE table IF NOT EXISTS BBY_26_profiles(
	profileID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	username varchar(20) NOT NULL UNIQUE, 
	displayName varchar(20),
	quote varchar(60) DEFAULT "Welcome to my profile page!",
	userDescription varchar(150) DEFAULT "User has not entered a description yet.",
	country varchar(25) DEFAULT "Milky Way",
	province varchar(25) DEFAULT "Sol System",
	city varchar(25) DEFAULT "Earth",
	showEmail boolean DEFAULT TRUE NOT NULL,
	showLoc boolean DEFAULT TRUE NOT NULL,
	profileImg varchar(35) DEFAULT "profile.jpg",
	FOREIGN KEY (username) REFERENCES BBY_26_users (username)
		ON DELETE CASCADE
		ON UPDATE CASCADE
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

INSERT INTO BBY_26_profiles (username, displayName, quote, userDescription, country, province, city) VALUES ("bcherng", "Brian", "Welcome to my profile page!", "I don't own any dogs, but I am one of the creators of this website. I hope you enjoy using it", "Canada", "BC", "Burnaby");

INSERT INTO BBY_26_profiles (username, displayName, quote, userDescription, country, province, city, showLoc) VALUES ("dluck", "Darren", "Welcome to my profile page!", "I don't own any dogs, but I am one of the creators of this website. I hope you enjoy using it", "Canada", "BC", "Richmond", FALSE);

INSERT INTO BBY_26_profiles (username, displayName, quote, userDescription, country, province, city) VALUES ("ajand", "Aryan", "Welcome to my profile page!", "I don't own any dogs, but I am one of the creators of this website. I hope you enjoy using it", "Canada", "BC", "Burnaby");

INSERT INTO BBY_26_profiles (username, displayName, quote, userDescription, country, province, city) VALUES ("psidhul", "Pahul", "Welcome to my profile page!", "I don't own any dogs, but I am one of the creators of this website. I hope you enjoy using it", "Canada", "BC", "Burnaby");

INSERT INTO BBY_26_profiles (username, displayName, quote, userDescription, country, province, city) VALUES ("gsingh", "Jerry", "Welcome to my profile page!", "I don't own any dogs, but I am one of the creators of this website. I hope you enjoy using it", "Canada", "BC", "Burnaby");

INSERT INTO BBY_26_profiles (username, displayName, userDescription) VALUES ("testuser", "TEST USER", "I am a test user, use this account to test out the different site functions when not an admin");

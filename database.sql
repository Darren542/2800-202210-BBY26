CREATE database IF NOT EXISTS COMP2800;

USE COMP2800;

CREATE table IF NOT EXISTS BBY_26_users(
	userID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	username varchar(20) NOT NULL UNIQUE,
	email varchar(50) NOT NULL UNIQUE,
	isAdmin boolean DEFAULT FALSE,
	creationTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	pw varchar(1000) NOT NULL,
	pwHash varchar(150) NOT NULL,
	pwSalt varchar(150) NOT NULL,
	pwIterations int NOT NULL
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

CREATE TABLE IF NOT EXISTS BBY_26_address(
    addressID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    street varchar(75),
    city varchar(50),
	province varchar(50) ,
	country varchar(56)
);

 CREATE TABLE IF NOT EXISTS BBY_26_events(
    eventID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	ownerID int NOT NULL,
    event_name varchar(20),
    event_date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	creationTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    event_duration int NOT NULL,
	event_type boolean DEFAULT FALSE,
    event_photo varchar(50) DEFAULT "events.jpg",
    event_description varchar(50),
	FOREIGN KEY (ownerID) REFERENCES BBY_26_users (userID)
		ON UPDATE CASCADE
); 

CREATE TABLE IF NOT EXISTS BBY_26_tag(
	tagID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	tags varchar(50),
	eventID int NOT NULL,
	FOREIGN KEY (eventID) REFERENCES BBY_26_events (eventID)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

	-- event_type boolean, 
-- event-type false is private & public is true
-- need add a filed for user taking in photos
-- need to add a feild that is boolen and takes in ture flase vaules of gudielines


CREATE TABLE IF NOT EXISTS BBY_26_addresses(
    addressID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    street varchar(75),
    city varchar(50),
	eventID int,
	userID int,
	FOREIGN KEY (eventID) REFERENCES BBY_26_events(eventID),
	FOREIGN KEY (userID) REFERENCES BBY_26_users(userID)
);


CREATE TABLE IF NOT EXISTS BBY_26_groups(
	groupID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	ownerID int NOT NULL,
	group_name varchar(30),
    country varchar(56),
	province varchar(50),
	city varchar(50),
	group_description varchar(500),
	group_type varchar(10), 
	creationTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (ownerID) REFERENCES BBY_26_users (userID)
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BBY_26_group_tags(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	groupID int NOT NULL,
	tag_name varchar(25),
	FOREIGN KEY (groupID) REFERENCES BBY_26_groups (groupID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BBY_26_saved_group(
	savedID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	ownerID int NOT NULL,
	group_name varchar(30),
    country varchar(56),
	province varchar(50),
	city varchar(50),
	group_description varchar(500),
	group_type varchar(10),
	tagString varchar(500),
	creationTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	guidelines boolean DEFAULT FALSE,
	terms boolean DEFAULT FALSE,	
	FOREIGN KEY (ownerID) REFERENCES BBY_26_users (userID)
		ON UPDATE CASCADE
);
    	
INSERT INTO BBY_26_users (username, email, pw, isAdmin, pwHash, pwSalt, pwIterations) 
VALUES ("bcherng", "briancherngsch@gmail.com", 123, 1, "47fc8a8159e64b8d790ea80c810737889d32a5e1e1cb7f824a792863817a5bda11a312f1c8739aea78b7f0166e20447f2db8c55c7a8b571c0514194707e51e55", "MabXaGmGVnWsYoAG63n8PA+hGCT01dKIO7YlJjdsFXQr+gOLvrq2olWjyadUdPT7Su0BHcA4f5L/caU8YtU9AA==", 100); --password is 123

INSERT INTO BBY_26_users (username, email, pw, isAdmin, pwHash, pwSalt, pwIterations) 
VALUES ("dluck", "dluck4@my.bcit.ca", 123, 1, "47fc8a8159e64b8d790ea80c810737889d32a5e1e1cb7f824a792863817a5bda11a312f1c8739aea78b7f0166e20447f2db8c55c7a8b571c0514194707e51e55", "MabXaGmGVnWsYoAG63n8PA+hGCT01dKIO7YlJjdsFXQr+gOLvrq2olWjyadUdPT7Su0BHcA4f5L/caU8YtU9AA==", 100); --password is 123

INSERT INTO BBY_26_users (username, email, pw, isAdmin, pwHash, pwSalt, pwIterations) 
VALUES ("ajand", "aryan.jand@gmail.com", 123, 1, "47fc8a8159e64b8d790ea80c810737889d32a5e1e1cb7f824a792863817a5bda11a312f1c8739aea78b7f0166e20447f2db8c55c7a8b571c0514194707e51e55", "MabXaGmGVnWsYoAG63n8PA+hGCT01dKIO7YlJjdsFXQr+gOLvrq2olWjyadUdPT7Su0BHcA4f5L/caU8YtU9AA==", 100);--password is 123

INSERT INTO BBY_26_users (username, email, pw, isAdmin, pwHash, pwSalt, pwIterations) 
VALUES ("psidhul", "sidhupahul0@gmail.com", 123, 1, "47fc8a8159e64b8d790ea80c810737889d32a5e1e1cb7f824a792863817a5bda11a312f1c8739aea78b7f0166e20447f2db8c55c7a8b571c0514194707e51e55", "MabXaGmGVnWsYoAG63n8PA+hGCT01dKIO7YlJjdsFXQr+gOLvrq2olWjyadUdPT7Su0BHcA4f5L/caU8YtU9AA==", 100);--password is 123

INSERT INTO BBY_26_users (username, email, pw, isAdmin, pwHash, pwSalt, pwIterations) 
VALUES ("gsingh", "germanpreet3533@gmail.com", 123, 1, "47fc8a8159e64b8d790ea80c810737889d32a5e1e1cb7f824a792863817a5bda11a312f1c8739aea78b7f0166e20447f2db8c55c7a8b571c0514194707e51e55", "MabXaGmGVnWsYoAG63n8PA+hGCT01dKIO7YlJjdsFXQr+gOLvrq2olWjyadUdPT7Su0BHcA4f5L/caU8YtU9AA==", 100);--password is 123

INSERT INTO BBY_26_users (username, email, pw, pwHash, pwSalt, pwIterations) 
VALUES ("testuser", "notreal@gmail.com", 123, "47fc8a8159e64b8d790ea80c810737889d32a5e1e1cb7f824a792863817a5bda11a312f1c8739aea78b7f0166e20447f2db8c55c7a8b571c0514194707e51e55", "MabXaGmGVnWsYoAG63n8PA+hGCT01dKIO7YlJjdsFXQr+gOLvrq2olWjyadUdPT7Su0BHcA4f5L/caU8YtU9AA==", 100);--password is 123

INSERT INTO BBY_26_profiles (username, displayName, quote, userDescription, country, province, city) VALUES ("bcherng", "Brian", "Welcome to my profile page!", "I don't own any dogs, but I am one of the creators of this website. I hope you enjoy using it", "Canada", "BC", "Burnaby");

INSERT INTO BBY_26_profiles (username, displayName, quote, userDescription, country, province, city, showLoc) VALUES ("dluck", "Darren", "Welcome to my profile page!", "I don't own any dogs, but I am one of the creators of this website. I hope you enjoy using it", "Canada", "BC", "Richmond", FALSE);

INSERT INTO BBY_26_profiles (username, displayName, quote, userDescription, country, province, city) VALUES ("ajand", "Aryan", "Welcome to my profile page!", "I don't own any dogs, but I am one of the creators of this website. I hope you enjoy using it", "Canada", "BC", "Burnaby");

INSERT INTO BBY_26_profiles (username, displayName, quote, userDescription, country, province, city) VALUES ("psidhul", "Pahul", "Welcome to my profile page!", "I don't own any dogs, but I am one of the creators of this website. I hope you enjoy using it", "Canada", "BC", "Burnaby");

INSERT INTO BBY_26_profiles (username, displayName, quote, userDescription, country, province, city) VALUES ("gsingh", "Jerry", "Welcome to my profile page!", "I don't own any dogs, but I am one of the creators of this website. I hope you enjoy using it", "Canada", "BC", "Burnaby");

INSERT INTO BBY_26_profiles (username, displayName, userDescription) VALUES ("testuser", "TEST USER", "I am a test user, use this account to test out the different site functions when not an admin");

INSERT INTO BBY_26_events (event_name,event_duration, event_description, event_type) 
VALUES ("Test Event 1", 120, "My first event woo hoo!", true);

INSERT INTO BBY_26_events (event_name, event_duration, event_description, event_type) 
VALUES ("Test Event 2", 240, "My second event.", true);


CREATE TABLE IF NOT EXISTS BBY_26_RSVP(
	eventID int NOT NULL,
	userID int NOT NULL,
	FOREIGN KEY (eventID) REFERENCES BBY_26_events(eventID),
	FOREIGN KEY (userID) REFERENCES BBY_26_users(userID),
	PRIMARY KEY (eventID, userID)
);
    	
INSERT INTO BBY_26_RSVP (eventID, userID) 
VALUES (1, 1);

INSERT INTO BBY_26_RSVP (eventID, userID) 
VALUES (2, 1);


INSERT INTO BBY_26_addresses (addressID, street, city, eventID) 
VALUES (1, "123 Street", "Burnaby", 1);

INSERT INTO BBY_26_addresses (addressID, street, city, eventID) 
VALUES (2, "234 Street", "Burnaby", 2);
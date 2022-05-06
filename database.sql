CREATE database bby26;

USE bby26;

CREATE table users(
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










-- CREATE table profiles(
--     userID int NOT NULL,
--     firstname varchar(16),
--     lastname varchar(16),
--     residence varchar(30),
--     descr varchar(500),
--     FOREIGN KEY(userID) REFERENCES users(userID) ON DELETE CASCADE
-- );
    
-- CREATE table dogs(
--     dogID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     ownerID int NOT NULL,
--     dogname varchar(16),
--     breed varchar(25),
--     birthyear int NOT NULL,
--     descr varchar(500),
--     FOREIGN KEY(ownerID) REFERENCES users(userID) ON DELETE CASCADE
-- );

-- CREATE table addresses(
--     addressID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     country varchar(50),
--     province varchar(50),
--     city varchar(50),
--     street varchar(50),
--     postal varchar(10),
--     xCoord int,
--     yCoord int
-- );

-- CREATE table events(
--     eventID int NOT NULL AUTO_INCREMENT,
--     ownerID int NOT NULL,
--     eventName varchar(50),
--     descr varchar(500),
--     imgURL varchar(200),
--     eventDate date NOT NULL,
--     eventTime time NOT NULL,
--     eventLocation int NOT NULL,
--     eventDuration int NOT NULL,
--     FOREIGN KEY (eventID) REFERENCES users(userID),
--     FOREIGN KEY (eventLocation) REFERENCES addresses(addressID),
--     PRIMARY KEY (eventID, ownerID)
-- );

-- CREATE table userAddresses(
--     userID int NOT NULL,
--     addressID int NOT NULL,
--     FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
--     FOREIGN KEY (addressID) REFERENCES addresses(addressID) ON DELETE CASCADE,
--     PRIMARY KEY (userID, addressID)
-- )



-- CREATE table eventAddresses(
--     eventID int NOT NULL PRIMARY KEY,
--     addressID int NOT NULL PRIMARY KEY,
--     FOREIGN KEY(eventID) REFERENCES events(eventID) ON DELETE CASCADE,
--     FOREIGN KEY(addressID) REFERENCES addresses(addressID) ON DELETE CASCADE
-- )

-- 	FOREIGN KEY(userID) REFERENCES a01056291_user(userID) ON DELETE CASCADE
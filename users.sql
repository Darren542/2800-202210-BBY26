CREATE TABLE users (
  ID int NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  email_address VARCHAR(45) NOT NULL,
  Pass_word VARCHAR(20) NOT NULL, 
  adminstrator int NOT NULL,
  PRIMARY KEY (ID)
);

INSERT INTO users (username, email_address, pwd, adminstrator) VALUES ('pahulsidhu', 'sidhupahul0@gmail.com', "123456789", 1);
INSERT INTO users (username, email_address, pwd, adminstrator) VALUES ('germanpreet', 'germanpreet3533@gmail.com', "123456789", 1);
INSERT INTO users (username, email_address, pwd, adminstrator) VALUES ('aryanjand', 'aryan.jand@gmail.com', "123456789", 1);
INSERT INTO users (username, email_address, pwd, adminstrator) VALUES ('darrenluck', 'darren.luck@gmail.com', "123456789", 1);
INSERT INTO users (username, email_address, pwd, adminstrator) VALUES ('brian', 'brian@gmail.com', "123456789", 1);


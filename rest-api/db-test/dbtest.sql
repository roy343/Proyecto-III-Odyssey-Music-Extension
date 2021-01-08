CREATE DATABASE IF NOT EXISTS test;

USE test;

CREATE TABLE persona(
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY(id)
    );
    
    DESCRIBE persona;
    
    INSERT INTO persona values
    (1, 'TEST SUBJECT 1'),
    (2, 'TEST SUBJECT 2'),
    (3, 'TEST SUBJECT 3');
    
    SELECT * FROM persona;

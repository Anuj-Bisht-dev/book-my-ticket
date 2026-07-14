SELECT * from seats;

 CREATE TABLE seats (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255),
     isbooked INT DEFAULT 0
 );
INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20);

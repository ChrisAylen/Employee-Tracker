--Database: employee_db

DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United Kingdom.1252'
    LC_CTYPE = 'English_United Kingdom.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

DROP TABLE IF EXISTS department CASCADE;

CREATE TABLE department(
id SERIAL PRIMARY  KEY NOT	NULL,
name char(30) UNIQUE 	NOT NULL	
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY NOT NULL,
    title CHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id int NOT NULL References department (id)
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name CHAR(30) NOT NULL,
    last_name CHAR(30)NOT NULL,
    role_id  int NOT NULL REFERENCES role (id),      
    manager_id int REFERENCES employee (id)
);


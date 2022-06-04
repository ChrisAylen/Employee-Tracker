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
name character varying(30) UNIQUE NOT NULL	
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY NOT NULL,
    title character varying(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id int NOT NULL References department (id)
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    role_id  int NOT NULL REFERENCES role (id),      
    manager_id int REFERENCES employee (id)
);

CREATE VIEW manager AS
SELECT employee.id AS employee_id, first_name,last_name,role_id, department.name AS department_name, role.title AS role_title FROM employee
JOIN role on role_id =role.id
JOIN department on department_id=department.id
WHERE manager_id IS NULL;


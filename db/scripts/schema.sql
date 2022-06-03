DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL 
);

CREATE TABLE role (
    id int AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id int NOT NULL DEFAULT 0,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
);

-- employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

CREATE TABLE employee (
    id int AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30)NOT NULL,
    role_id  int NOT NULL,      
    manager_id int,
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);

CREATE VIEW manager AS
SELECT employee.id AS employee_id, first_name,last_name,role_id, department.name AS department_name, role.title AS role_title FROM employee
JOIN role on role_id =role.id
JOIN department on department_id=department.id
WHERE manager_id IS NULL;
INSERT into department(name)
VALUES
('Sales'),
('Engineering'),
('Service'),
('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Manager',80000,1),
('Sales Associate',50000,1),
('Engineering Manager',100000,2),
('Senior Engineer',85000,2),
('Service Manager',80000,3),
('Service Engineer',60000,3),
('Finance Manager',90000, 4),
('Finanace Administrator',55000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jane','Smith',1, NULL),
('John','Jones',2,1),
('Edward','Ryles',3, NULL),
('Sharron','Miller', 4,2),
('Annette','Allen',5, NULL),
('Mary','Butcher', 6,3),
('Tanya','Eggerton',7, NULL),
('Chris','Simpson', 8,4);
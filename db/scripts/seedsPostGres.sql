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
('Louis','Armstrong',1, NULL),
('Miles','Davis',2,1),
('Alison','Balsom',3, NULL),
('Maurice','Andre', 4,2),
('Andrea','Motis',5, NULL),
('Chuck','Mangione', 6,3),
('Maynard','Ferguson',7, NULL),
('Dizzy','Gillespie', 8,4);
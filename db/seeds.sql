INSERT INTO departments (names)
VALUES ('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles(title, salary, department_id)
VALUES ('CEO', '800000', 1), 
('Lead Engineer', '150000', 2),
('Software Engineer', '120000', 2),
('Account Manager', '160000', 3),
('Accountant', '125000', 3),
('Legal Team Lead', '250000', 4),
('Lawyer', '190000', 4);

INSERT INTO employees(role_id, first_name, last_name, manager_id)
VALUES(1,'Mike', 'Chan', NULL), 
(2,'Ashley', 'Rodriguez', 1), 
(3,'Kevin', 'Tupik', 2),
(4,'Kunal', 'Singh', 1),
(5,'Malia','Brown', 4),
(6,'Sarah', 'Lourd', 1),
(7,'Tom', 'Allen', 6);
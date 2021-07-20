DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Administration"), ("Instructional"), ("Cafeteria"), ("Janitorial");

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

INSERT INTO role (title, salary, department_id)
VALUES ('Principal', 120000, 1), ('Assistant Principal', 100000, 1), ("Counselor", 50000, 1), ("Secretary", 30000, 1);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jonathon', 'Renaud', 1, null), ('Madame', 'McCroan', 2, 1), ('George', 'McPhearney', 3, 1), ('Lord', 'Titherton', 4, 1); 
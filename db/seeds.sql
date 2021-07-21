INSERT INTO department (name)
VALUES ("Administration"), ("Instructional"), ("Cafeteria");

INSERT INTO role (title, salary, department_id)
VALUES ("Principal", 120000, 1), ("Assistant Principal", 100000, 1), ("Counselor", 50000, 1), ("Secretary", 30000, 1), ("Master Teacher", 40000, 2), ("Teacher", 35000, 2), ("Paraprofessional", 20000, 2), ("Kitchen Manager", 35000, 3), ("Prep Cook", 20000, 3), ("Cashier", 15000, 3), ("Food Server", 15000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jonathon", "Renaud", 1, null), ("Madame", "McCroan", 2, 1), ("George", "McPhearney", 3, 1), ("Lord", "Titherton", 4, 1), ("Jenna", "Marie", 5, 1), ("George", "Carter", 6, 5), ("Manny", "Bravo", 6, 5), ("Adam", "Barnett", 7, 6), ("Glenn", "Burkett", 7, 7), ("Helen", "Burhart", 8, 1), ("Janet", "Freestone", 9, 8), ("Joe", "Sleepy", 10, 8), ("Donald", "RumpRoast", 11, 8)
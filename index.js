const mysql = require ('mysql');
const inquirer = require ('inquirer');
const consoleTable = require('console.table');
// const consoleLog = require('console.log');

const connection = mysql.createConnection({
    host: 'localhost',
  
    port: 3306,
  
    user: 'root',
  
    password: 'Macrodiet1!',
    database: 'employee_trackerDB',
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    beginning()
  });

    function direction() {
      inquirer.prompt({
        name: 'direction',
        type: 'list',
        message: 'Employee Management System: What would you like to do?',
        choices:['View Department', 'View Roles', 'View Employees', 'Add Department', 'Add Roles', 'Add Employees', 'Update Employee\'s Role', 'Exit'],

      })
      .then((res) => {
        switch(res.direction){
          case 'View Department':
            console.log('You chose to view the Departments...\n');
            viewDepartment();
            break;
          case 'View Roles':
            console.log('You chose to view Roles...\n');
            viewRoles();
            break;
          case 'View Employees':
            console.log('You chose to view the Employees...\n');
            viewEmployees();
            break;
          case 'Add Department':
            console.log('You chose to add a Department...\n');
            addDepartment();
            break;
          case 'Add Roles':
            console.log('You chose to add a Role...\n');
           addRole();
            break;
          case 'Add Employees':
            console.log('You chose to add an Employee...\n');
            addEmployee();
            break;
          case 'Update Employee\'s Role':
            console.log('You chose to update and Employee\'s Role...\n');
            updateRole();
            break;
          case 'Exit':
            console.log()
            connection.end();
          default:
            break;
          }

      }

      )};

    function viewDepartment () {
      connection.query('SELECT * FROM department', (err, data) => {
        if (err) throw err;
        console.table(data);
        direction();
      })
    };

    function viewRoles () {
      connection.query('SELECT * FROM role', (err, data) => {
        if (err) throw err;
        console.table(data);
        direction();
      })
    };

    function viewEmployees() {
      connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(m.first_name,' ', m.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id;",
        (err, data) => {
          if (err) throw err;
          console.table(data);
          direction();
        }
      );
    }

    function addDepartment() {
      inquirer.prompt({
          name: 'addDepartment',
          type: 'input',
          message: 'What is the name of your department?',
        }).then((answer) => {
          connection.query(
            `INSERT INTO department (name)
                VALUES ('${answer.addDepartment}');`,
            (err, data) => {
              if (err) throw err;
              direction();
            }
          );
        });
    }

    function addRole() {
      connection.query('SELECT * FROM department', (err, data) => {
        const departmentChoices = data.map((department) => {
          return {
            name: department.name,
            value: department.id,
          };
        });

        inquirer
        .prompt([
          {
            name: 'departmentId',
            type: 'list',
            message: 'What department would you like to add the role',
            choices: departmentChoices,
          },
          {
            name: 'title',
            type: 'input',
            message: 'What is the name of the role',
          },
          {
            name: 'salary',
            type: 'input',
            message: 'What is the salary?',
          },
        ])
        .then((answer) => {
          console.table(answer);
          connection.query(
            'INSERT INTO role SET ?',
            {
              title: answer.title,
              salary: answer.salary,
              department_id: answer.departmentId,
            },
            (err, data) => {
              direction();
            }
          );
          console.log(answer.title, answer.salary, answer.departmentId)
        
        });
    });
  }
  
  

    function addEmployee() {
    
      connection.query('SELECT * FROM role', (err, data) => {
        const roleChoices = data.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });
        connection.query(
          'SELECT first_name, last_name, id FROM employee',
          (err, data) => {
            const managerChoices = data.map((employee) => {
              return {
                name: employee.first_name + ' ' + employee.last_name,
                value: employee.id,
              };
            });
            managerChoices.push({ name: 'none', value: null });
            console.log(managerChoices);
            inquirer
              .prompt([
                {
                  name: 'roleID',
                  type: 'list',
                  message: 'Choose the employee\'s role.',
                  choices: roleChoices,
                },
                {
                  name: 'managerID',
                  type: 'list',
                  message: 'Choose the employee\'s manager.',
                  choices: managerChoices,
                },
                {
                  name: 'firstName',
                  type: 'input',
                  message: 'What is the employee\'s first name?',
                },
                {
                  name: 'lastName',
                  type: 'input',
                  message: 'What is the employee\'s last name?',
                },
              ])
              .then((response) => {
                console.table(response);
                connection.query(
                  'INSERT INTO employee SET ?',
                  {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.roleID,
                    manager_id: response.managerID,
                  },
                  (err, data) => {
                    if (err) throw err;
                    direction();
                  }
                );
              });
          }
        );
      });
    }

    function updateRole() {
      //Show Department
      connection.query('SELECT * FROM role', (err, data) => {
        const roleChoices = data.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });
    
        inquirer
          .prompt([
            {
              name: 'updateRoleId',
              type: 'list',
              message: 'Which role is needed?',
              choices: roleChoices,
            },
            {
              name: 'employeeID',
              type: 'input',
              message: 'What is the employee ID?',
            },
          ])
          .then((answer) => {
            connection.query(
              'UPDATE employee SET ? WHERE ?',
              [
                {
                  role_id: answer.updateRoleId,
                },
                {
                  id: answer.employeeID,
                },
              ],
              function (error) {
                if (error) throw err;
                console.table(answer);
                direction();
              }
            );
          });
      });
    }




    function beginning () {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(m.first_name,' ', m.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id;", (err, data) => {
    if(err) throw err;
    console.table(data);
    direction()
  
  })
  };



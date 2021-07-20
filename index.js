const mysql = require ('mysql');
const inquirer = require ('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'Macrodiet1!',
    database: 'employee_trackerDB',
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    // createProduct();
    beginning()
  });

    function direction() {
      inquirer.prompt({
        name: "direction",
        type: "list",
        message: "Employee Management System: What would you like to do?",
        choices:["View Department", "View Roles", "View Employees", "Add Department", "Add Roles", "Add Employees", "Update Employee's Role"],

      })
      .then((res) => {
        switch(res.direction){
          case "View Department":
            console.log("You chose to view the Departments...\n");
            viewDepartment();
            break;
          case "View Roles":
            console.log("You chose to view Roles...\n");
            viewRoles();
            break;
          case "View Employees":
            console.log("You chose to view the Employees...\n");
            viewEmployees();
            break;
          case "Add Department":
            console.log("You chose to add a Department...\n");
            addDepartment();
            break;
          case "Add Roles":
            console.log("You chose to add a Role...\n");
           addRole();
            break;
          case "Add Employees":
            console.log("You chose to add an Employee...\n");
            addEmployee();
            break;
          case "Update Employee's Role":
            console.log("You chose to update and Employee's Role...\n");
            updateRole();
            break;
          default:
            break;
          }

      }

      )};

    function viewDepartment () {
      console.log("yes this worked vDEP...\n")
    };

    function viewRoles () {
      console.log("yes this worked vRoles...\n")
    };

    function viewEmployees () {
      console.log("yes this worked vEmp...\n")
    };

    function addDepartment () {
      console.log("yes this worked aDep...\n")
    };

    function addRole () {
      console.log("yes this worked aRole...\n")
    };

    function addEmployee () {
      console.log("yes this worked aEM...\n")
    };

    function updateRole () {
      console.log("yes this worked upda...\n")
    };





    function beginning () {
  connection.query('SELECT * FROM employee', (err, data) => {
    if(err) throw err;
    console.table(data);
    direction()
  
  })
  };



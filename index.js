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
      // .then(res) => {

      // }

    }


    function beginning () {
  connection.query('SELECT * FROM employee', (err, data) => {
    if(err) throw err;
    console.table(data);
    direction()
  
  })
  };



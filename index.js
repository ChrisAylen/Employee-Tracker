const { prompt } = require("inquirer");
const db = require("./db");
require('dotenv').config();
const connection = require("./db/connection");


//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

console.clear();
mainMenu();

function mainMenu() {

    prompt([
        {
            type: "list",
            pageSize: 8,
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View all departments",
                    value: "view-all-departments"
                    //I am presented with a formatted table showing department names and department ids
                },
                {
                    name: "View all roles",
                    value: "view-all-roles"
                    //I am presented with the job title, role id, the department that role belongs to, and the salary for that role
                },
                {
                    name: "View all employees",
                    value: "view-all-employees"
                    //I am presented with a formatted table showing employee data,
                    // including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
                },
                {
                    name: "Add a department",
                    value: "add-a-department"
                    //I am prompted to enter the name of the department and that department is added to the database
                },
                {
                    name: "Add a role",
                    value: "add-a-role"
                    //I am prompted to enter the name, salary, and department for the role and that role is added to the database
                },
                {
                    name: "Add an employee",
                    value: "add-a-employee"
                },
                {
                    name: "Update an employee role",
                    value: "update-an-employee-role"
                    //I am prompted to select an employee to update and their new role and this information is updated in the database
                },
                {
                    name: "Exit",
                    value: "exit-app"
                }
            ]
        }
    ]).then(res => {
        //place logic for the chosen action
        let choice = res.choice;
        switch (choice) {
            case "view-all-departments":
                console.clear();
                db.viewAllDepartments()
                    .then(([rows]) => {
                        let departments = rows;
                        console.table(departments);
                    })
                    .then(() => mainMenu());


                break;
            case "view-all-roles":
                console.clear();
                db.viewAllRoles()
                    .then(([rows]) => {
                        let roles = rows;
                        console.table(roles);
                    })
                    .then(() => mainMenu());

                break;
            case "view-all-employees":
                console.clear();
                db.viewAllEmployees()
                    .then(([rows]) => {
                        let employees = rows;
                        console.table(employees);
                    })
                    .then(() => mainMenu());

                break;
            case "add-a-department":
                console.clear();


                break;

            case "add-a-role":

                break;

            case "add-a-employee":

                break;

            case "update-an-employee-role":

                break;

            default:
                exitApp();

                break;
        }

    })

    exitApp = () => {
        console.clear();
        process.exit();
    }
}
//module.exports = index.js;
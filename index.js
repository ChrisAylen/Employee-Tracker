const { prompt } = require("inquirer");
const db = require("mysql2");

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
mainMenu();

function mainMenu() {
    prompt([
        {
            type: "list",
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
            ]
        }
    ]).then(res => {
        //place logic for the chosen action

    })
}
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
        //console.clear();
        let choice = res.choice;
        switch (choice) {
            case "view-all-departments":
                db.viewAllDepartments()
                    .then(([rows]) => {
                        let departments = rows;
                        console.table(departments);
                    })
                    .then(() => mainMenu());


                break;
            case "view-all-roles":

                db.viewAllRoles()
                    .then(([rows]) => {
                        let roles = rows;
                        console.table(roles);
                    })
                    .then(() => mainMenu());

                break;
            case "view-all-employees":

                db.viewAllEmployees()
                    .then(([rows]) => {
                        let employees = rows;
                        console.table(employees);
                    })
                    .then(() => mainMenu());

                break;
            case "add-a-department":
                prompt([{
                    name: "name",
                    message: "What is the name of the department you want to add?"
                }])
                    .then(res => {
                        let name = res;
                        db.addADepartment(name)
                            .then(() => console.log(`${name.name} has been added as a new department`))
                            .then(() => mainMenu())
                    })



                break;

            case "add-a-role":
                //Need an object list of departments
                db.viewAllDepartments()
                    .then(([rows]) => {
                        let departments = rows;
                        const listOfdepartments = departments.map(({ id, name }) => ({
                            name: name,
                            value: id

                        }));
                        console.log(listOfdepartments)
                        prompt([
                            {
                                //Need the title of the role
                                name: "title",
                                message: "What is the title of the role you wish to add?"
                            },
                            {
                                //Need the salary of the role
                                name: "salary",
                                message: "What is the salary of this role"
                            },
                            {
                                type: "list",
                                name: "department_id",
                                message: "Which department do you want to add this role to?",
                                choices:listOfdepartments
                            }
                        ])
                        //Add the new role
                        .then(role=>{
                            db.addARole(role)
                            .then(()=>console.log("Added a role"))
                            .then(()=>mainMenu())
                        })

                    })




                //Need the chosen department ID

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
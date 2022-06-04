const { prompt } = require("inquirer");
const db = require("./db");
require('dotenv').config();
const connection = require("./db/connection");

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
                    .then((departments) => {
                       console.table(departments);
                    })
                    .then(() => mainMenu());
                break;
            case "view-all-roles":

                db.viewAllRoles()
                    .then((roles) => {
                        console.table(roles);
                    })
                    .then(() => mainMenu());

                break;
            case "view-all-employees":

                db.viewAllEmployees()
                    .then((rows) => {
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
                    .then((rows) => {
                        let departments = rows;
                        const listOfdepartments = departments.map(({ id, name }) => ({
                            name: name,
                            value: id

                        }));

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
                                //Need the chosen department ID
                                type: "list",
                                name: "department_id",
                                message: "Which department do you want to add this role to?",
                                choices: listOfdepartments
                            }
                        ])
                            //Add the new role
                            .then(role => {
                                db.addARole(role)
                                    .then(() => console.log("Added a role"))
                                    .then(() => mainMenu())
                            })

                    })
                break;
            case "add-a-employee":
                //Get a list of roles to add the employee to
                let newEmployee = {
                    first_name: "",
                    last_name: "",
                    role_id: "",
                    manager_id: ""
                };

                db.viewAllRoles()
                    .then((rows) => {
                        let roles = rows;
                        const listofRoles = roles.map(({ department_name, job_title, role_id, salary }) => ({
                            name: job_title,
                            value: role_id

                        }));
                        prompt([

                            {
                                pageSize: listofRoles.length,
                                type: "list",
                                name: "role_id",
                                message: "Select a role for the employee?",
                                choices: listofRoles
                            }


                        ])
                            .then(role => {
                                //Choose a RELEVANT manager to add to the new employee
                                db.getAllManagers()
                                    .then((rows) => {
                                        let managers = rows;
                                        console.table(managers)
                                        const listofManagers = managers.map(({ first_name, last_name, employee_id }) => ({
                                            name: first_name + ' ' + last_name,
                                            value: employee_id
                                        }));
                                        listofManagers.push({
                                            name: "None",
                                            value: null
                                        })
                                        prompt([
                                            {
                                                type: "list",
                                                name: "employee_id",
                                                message: "Select a manager",
                                                choices: listofManagers
                                            }
                                        ])
                                            .then(manager => {
                                                prompt([
                                                    {
                                                        name: "first_name",
                                                        message: "What is the first name of the new employee?"

                                                    },
                                                    {
                                                        name: "last_name",
                                                        message: "What is the last name of the new employee?"
                                                    }
                                                ])
                                                    .then(employee_name => {
                                                        newEmployee.first_name = employee_name.first_name;
                                                        newEmployee.last_name = employee_name.last_name;
                                                        newEmployee.role_id = role.role_id;
                                                        newEmployee.manager_id = manager.employee_id;
                                                        db.addAnEmployee(newEmployee);
                                                        console.log(newEmployee) + " has been added as a new employee";
                                                        mainMenu();
                                                    })
                                            })

                                    })


                            })
                    })



                break;

            case "update-an-employee-role":
                let employeeToUpdate = {
                    employee_id: "",
                    role_id: "",
                };
                //Get a list of employees
                db.viewAllEmployees()
                    .then((rows) => {
                        let employees = rows;
                        const listofEmployees = employees.map(({ first_name, last_name, id }) => ({
                            name: first_name + ' ' + last_name,
                            value: id
                        }));
                        //console.log(listofEmployees)
                        let thePageSize;

                        //Display all the roles without scrolling if there are 20 or less roles
                        if (listofEmployees.length <= 20) {
                            thePageSize = listofEmployees.length;
                        }
                        else {
                            thePageSize = 20;
                        }
                        prompt([
                            {
                                pageSize: thePageSize,
                                type: "list",
                                name: "employee_id",
                                message: "Select an employee to update",
                                choices: listofEmployees
                            }

                        ])
                            .then(employee => {
                                //Get a list of roles to add the employee to
                                db.viewAllRoles()
                                    .then((rows) => {
                                        let roles = rows;
                                        const listofRoles = roles.map(({ department_name, job_title, role_id, salary }) => ({
                                            name: job_title,
                                            value: role_id

                                        }));
                                        prompt([
                                            {
                                                pageSize: listofRoles.length,
                                                type: "list",
                                                name: "role_id",
                                                message: "Select a role for the employee?",
                                                choices: listofRoles


                                            }
                                        ])
                                            .then(role => {
                                                employeeToUpdate.employee_id = employee.employee_id;
                                                employeeToUpdate.role_id = role.role_id;
                                                db.updateEmployeeRole(employeeToUpdate.employee_id, employeeToUpdate.role_id);
                                                console.log(employeeToUpdate.employee_id + " has been updated to the role of " + employeeToUpdate.role_id);
                                                mainMenu();
                                            })

                                    })
                            })
                    })








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

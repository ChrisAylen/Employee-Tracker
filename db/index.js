const connection = require("./connection");


class DB {
    constructor(conneciton) {
        this.connection = connection;
    }
    //job title, role id, the department that role belongs to, and the salary for that rol
    viewAllRoles = () => {
        return this.connection.promise().query(
            `select title as job_title, role.id AS role_id, department.name AS department_name,salary from role 
            JOIN department ON department.id = department_id 
            ORDER BY  department.name;`
        )

    }
    viewAllDepartments = () => {
        return this.connection.promise().query(
            `Select name, id from department;`
        );
    }
    //employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    viewAllEmployees = () => {
        return this.connection.promise().query(
            `Select employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.salary, 
            manager.first_name AS manager_first_name, manager.last_name AS manager_last_name from employee 
            JOIN role on employee.id=role.id 
            JOIN department on role.department_id = department_id join employee manager on manager.id = employee.manager_id;`
    
        )

    }
}

module.exports = new DB(connection);



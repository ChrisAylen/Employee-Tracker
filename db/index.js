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
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager from employee 
            LEFT JOIN role on employee.id=role.id 
            LEFT JOIN department on role.department_id = department.id 
            LEFT join employee manager on manager.id = employee.manager_id;`
         )
    }
    addADepartment =(department)=>{
        return this.connection.promise().query("INSERT INTO department SET ?", department)
    }
    addARole= (role) =>{
        return this.connection.promise().query("INSERT INTO role SET ?", role)
    }
    addAnEmployee = (employee)=>{
        return this.connection.promise().query("INSERT INTO employee SET ?", employee)
    }
    getDepartmentManagersForRole = (roleId)=>{
        return this.connection.promise().query(`Select employee.id AS manager_id, CONCAT(first_name, ' ', last_name) AS manager_name  FROM employee
        JOIN role on role_id=role.id
         Where manager_id IS NOT NULL AND role_id=${roleId}`)
    }

}

module.exports = new DB(connection);



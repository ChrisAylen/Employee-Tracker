const connection = require("./connection");


class DB {
    constructor(conneciton) {
        this.connection = connection;
    }
    //job title, role id, the department that role belongs to, and the salary for that rol
    viewAllRoles = async () => {
        const roles = await connection
            `select title as job_title, role.id AS role_id, department.name AS department_name,salary from role 
            JOIN department ON department.id = department_id 
            ORDER BY  department.name;`
        return roles;

    }
     viewAllDepartments  = async () => {
         const depts = await connection
            `Select name, id from department;`
      return depts
    }
    //employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    viewAllEmployees = async () => {
        const employees = await connection
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager from employee 
            LEFT JOIN role on role_id=role.id 
            LEFT JOIN department on role.department_id = department.id 
            LEFT join employee manager on manager.id = employee.manager_id;`
        return employees;
    }
    addADepartment = async (department) => {
        const  dept = await connection `INSERT INTO department ${connection(department)}`
        return dept;
    }
    addARole = async (role) => {
         await connection `INSERT INTO role ${connection(role)}`
    }
    addAnEmployee = async (employee) => {
         await connection `INSERT INTO employee${connection(employee)}`
    }
    getAllManagers = async () => {
        const managers = await connection `SELECT * FROM manager`
        return managers
    }
    updateEmployeeRole = async (employeeId, roleId) => {
        await connection`UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`
        
    }
}

module.exports = new DB(connection);



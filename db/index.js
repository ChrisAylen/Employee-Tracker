const connection = require("./connection");


class DB {
    constructor(conneciton) {
        this.connection = connection;
    }
    viewAllRoles = () => {
        return this.connection.promise().query(
            "select * from role;"
        )

    }
    viewAllDepartments = () => {
        return this.connection.promise().query(
            "Select name, id from department;"
        );
    }
    viewAllEmployees = () => {
        return this.connection.promise().query(
            "select * from employee;"
        )

    }
}

module.exports = new DB(connection);



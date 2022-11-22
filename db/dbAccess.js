const connection = require("./connection");

class DBAccess {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
      this.connection = connection;
    }
    // Show all departments
  showAllDepartments() {
    return this.connection.promise().query(
      "SELECT departments.id, departments.names FROM departments;"
    );
  }

  showAllRoles() {
    return this.connection.promise().query(
      "SELECT roles.id, roles.title, roles.salary, departments.names AS DEPT FROM roles LEFT JOIN DEPARTMENTS ON roles.department_id = departments.id;"
    );
  }

  showAllEmployees() {
    return this.connection.promise().query(
      "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.names AS dept, roles.salary, CONCAT(employees.first_name, ' ', employees.last_name) AS mgr FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id;"
    );
  }

  addDepartment(department) {
    return this.connection.promise().query(
      "INSERT INTO departments SET ? ", department);
  }

  addRole(role) {
    return this.connection.promise().query(
      "INSERT INTO roles SET ? ", role);
  }
  }
  module.exports = new DBAccess(connection);
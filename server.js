const { prompt } = require("inquirer");
const conn = require("./db/connection");
// const { addDepartment } = require("./db/dbAccess");
const dbAccess = require("./db/dbAccess");
require("console.table");

function mainPrompt (){
    prompt([
        {
            type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
  {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES"
          },
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
          }, 
          {
            name: "Add a Department",
            value: "ADD_DEPARTMENT"
          },
          {
            name: "Add a Role",
            value: "ADD_ROLE"
          },
          {
            name: "Add an Employee",
            value: "ADD_EMPLOYEE"
          },
          {
            name: "Update Employees Role",
            value: "UPDATE_EMPLOYEE_ROLE"
          }   
    ]
}
]).then(answer => {
    let choice = answer.choice;
    switch (choice){
        case 'VIEW_DEPARTMENTS':
            viewDepartments();
            break;
        case 'VIEW_ROLES':
            viewRoles();
            break;
        case 'VIEW_EMPLOYEES':
            viewEmployees();
            break;
        case 'ADD_DEPARTMENT':
            addDepartment();
            break;
        case 'ADD_ROLE':
            addRole();
            break;
        case 'ADD_EMPLOYEE':
            addEmployee();
            break;
        case 'UPDATE_EMPLOYEE_ROLE':
             updateEmployeeRole();
            break;
        default: 
        // quit the program tbd
    }
     

})
}
function viewDepartments(){
    dbAccess.showAllDepartments()
    .then(([dept_rows])=> {
        let departments = dept_rows;
        console.log('\n');
        console.table(departments);
    })
    .then(()=> mainPrompt());
}
function viewRoles(){
    dbAccess.showAllRoles()
    .then(([roles_rows])=> {
        let roles = roles_rows;
        console.log('\n');
        console.table(roles);
    })
    .then(()=> mainPrompt());
}

function viewEmployees(){
    dbAccess.showAllEmployees()
    .then(([emp_rows])=> {
        let emp = emp_rows;
        console.log('\n');
        console.table(emp);
    })
    .then(()=> mainPrompt());
}

function addDepartment(){
    prompt([
        {
            name: 'names',
            message: 'new department name',
        }
    ])
    .then(answer => {
        let name = answer;
        dbAccess.addDepartment(name)
        .then(() => console.log('successfully added'))
        .then(() => mainPrompt())
    })
}

function addRole(){
    dbAccess.showAllDepartments()
    .then(([department_rows]) => {
        let departments = department_rows;
        let dep_choices = departments.map(({ id, names}) => ({ name: names, value: id }));
   
    prompt([
        {
            name: 'title',
            message: 'new title',
        },
        {
            name: 'salary',
            message: 'new roles salary',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'which department role do they belong too?',
            choices: dep_choices
        },
    ])
    .then(answer => {
        let name = answer;
        dbAccess.addRole(name)
        .then(() => console.log('successfully added'))
        .then(() => mainPrompt())
    })
})
}


function addEmployee(){
    dbAccess.showAllRoles()
    .then(([roles_rows]) => {
        let roles = roles_rows;
        let roles_choices = roles.map(({ id, title}) => ({ name: title, value: id }));
   
    prompt([
        {
            name: 'first_name',
            message: 'give first name of employee',
        },
        {
            name: 'last_name',
            message: 'give last name of employee',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'what is the employees role?',
            choices: roles_choices
        },
    ])
    .then(answer => {
        let first_name = answer.first_name;
        let last_name = answer.last_name;
        let role_id = answer.role_id;
       dbAccess.showAllEmployees()
       .then(([emp_rows])=> {
        let employees = emp_rows;
        let manager_choices = employees.map(({id, first_name, last_name})=> ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        prompt({
            type: 'list',
            name: 'manager_id',
            message: 'give employee a manager',
            choices: manager_choices
        })
        .then(answer => {
            let newEmployee = {
                manager_id: answer.manager_id,
                role_id: role_id,
                first_name: first_name,
                last_name: last_name
            }
            dbAccess.addEmployee(newEmployee);
        })
        .then(() => {
            console.log('successfully added employee')
        })
        .then(() => mainPrompt())
       })
    })
})
}


function updateEmployeeRole(){

    dbAccess.showAllEmployees()
       .then(([emp_rows])=> {
        let employees = emp_rows;
        let employee_choices = employees.map(({id, first_name, last_name})=> ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        prompt({
            type: 'list',
            name: 'employee_id',
            message: 'give employee id',
            choices: employee_choices
        })
        .then(answer => {
            let employee_id = answer.employee_id;

    dbAccess.showAllRoles()
    .then(([roles_rows]) => {
        let roles = roles_rows;
        let roles_choices = roles.map(({ id, title}) => ({ name: title, value: id }));
   
    prompt([
        {
            type: 'list',
            name: 'role_id',
            message: 'what is the new role of the employee?',
            choices: roles_choices
        }
    ])
    .then(answer => {
       dbAccess.updateEmployeeRole(employee_id, answer.role_id)
        .then(() => {
            console.log('successfully updated employee role')
        })
        .then(() => mainPrompt())
       });
    });
})
}
       )
}

mainPrompt();
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

mainPrompt();
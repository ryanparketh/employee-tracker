const { prompt } = require("inquirer");
const conn = require("./db/connection");
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
mainPrompt();
const inquirer = require('inquirer');
const { promptDepartment, promptRoles, promptEmployees } = require('./prompt');
// const { createDepartment, createRole, createEmployee, updateEmployee } = require('./create');

// Start with asking what they'd like to do
const Option = () => {
    inquirer.prompt({
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
    
    }).then(({ options }) => {
    if (options == 'View All Departments') {
        console.log('\nViewing Departments!');
        promptDepartment();
    }
    else if (options == 'View All Roles') {
        console.log('\nViewing All Roles!');
        promptRoles();
    }
    else if (options == 'View All Employees') {
        console.log('\nViewing Employees!');
        promptEmployees();
    }
    else if (options == 'Add a Department') {
        console.log('\nAdding a Department!');
        createDepartment();
    }
    else if (options == 'Add a Role') {
        console.log('\nAdding a Role!');
        createRole();
    }
    else if (options == 'Add an Employee') {
        console.log('\nAdding an Employee!');
        createEmployee();
    }
    else {
        console.log('\nUpdating Employee Role!');
        updateEmployee();
    }
}).catch((error) => {
    if (error.isTtyError) {
        console.log('Prompt could not be rendered in the current environment');
    } else {
        console.log(error);
    }
});
};


module.exports = { Option };
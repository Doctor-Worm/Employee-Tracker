const inquirer = require('inquirer');
const db = require('../db/connection');
const { getRoles, getDepartments, getEmployees } = require('../utils/queries');

require('console.table');



// Start with asking what they'd like to do
const start = () => {
    inquirer.prompt({
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit Application'],
    
    }).then(({ options }) => {
    if (options == 'View All Departments') {
        console.log('\nViewing Departments!');
        promptDepartments();
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
    else if (options == 'Update an Employee Role') {
        console.log('\nUpdating Employee Role!');
        updateEmployee();
    }
    else {
        console.log("You're all done!")
        process.exit();
    }
}).catch((error) => {
    if (error.isTtyError) {
        console.log('Prompt could not be rendered in the current environment');
    } else {
        console.log(error);
    }
});
};


// Prompt Queries -------
const promptDepartments = () => {
    let sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('=====================\nDepartments:\n');
        console.table(rows);
        start();
    });
};

const promptRoles = () => {
    let sql = `SELECT role.id, job_title, salary, name AS department_name
                FROM role
                LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.log('=====================\nRoles:\n');
        console.table(rows);
        start();
    });
};

const promptEmployees = () => {
let sql = `SELECT employee.id, first_name, last_name, job_title, department.name AS department_name, salary, manager_id
            FROM department, role, employee
            WHERE role.id = employee.role_id
            AND department.id = role.department_id
            ORDER BY id asc`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.log('=====================\nEmployees:\n');
        console.table(rows);
        start();
    });
};



// Create Queries -------

// Create a New Department
const createDepartment = async () => {
    await inquirer.prompt({
        type: 'input',
        name: 'newDepartment',
        message: 'What is the name of the new department? (Required)',
        validate: newDepartment => {
            if (newDepartment) {
                return true;
            } else {
                console.log('Please enter your department name!');
                return false;
            }
        }
    })
    .then(function(answer) {
        let sql = `INSERT INTO department(name)
        VALUES (?)`;
        let params = answer.newDepartment;
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log(`\nAdded ${params} to the database!\n`);
            start();
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log('Prompt could not be rendered in the current environment');
        } else {
            console.log(error);
        }
    });
};


// Create a New Employee Role
const createRole = async () => {
    let departments = await getDepartments();
    let departmentArray = [];
    for (let i = 0; i < departments.length; i++ ) {
        // console.log(departments[i]);
        departmentArray.push(departments[i].name);
    };
    // console.log(departmentArray);
    
        inquirer.prompt([
            {
                type: 'input',
                name: 'newRoleTitle',
                message: 'What is the name of the job title for this new role? (Required)',
                validate: newRoleTitle => {
                    if (newRoleTitle) {
                        return true;
                    } else {
                        console.log('Please enter the job title!');
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'newRoleSalary',
                message: 'What is the salary for this new role? (Required)',
                validate: newRoleSalary => {
                    if (newRoleSalary) {
                        return true;
                    } else {
                        console.log('Please enter the job salary!');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'newRoleDepartment',
                message: 'What is the department that this new role belongs to? (Required)',
                choices: departmentArray
            }
        ])
    .then(function(answers) {
        // console.log(answers);
        let id = [];
        for (let i = 0; i < departments.length; i++) {
            if (answers.newRoleDepartment == departments[i].name) {
                let department_id = departments[i].id;
                console.log(`The ID is ${department_id}`);
                id.push(department_id);
            }
        }
        let sql = `INSERT INTO role(job_title, salary, department_id)
                    VALUES (?, ?, ?)`;
        let params = [ answers.newRoleTitle, answers.newRoleSalary, id ];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log(`\nAdded ${answers.newRoleTitle} to the database!\n`);
            start();
        });

    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log('Prompt could not be rendered in the current environment');
        } else {
            console.log(error);
        }
    });
};


// Create a New Employee
const createEmployee = async () => {
    let roles = await getRoles();
    let employees = await getEmployees();
    let rolesArray = [];
    for (let i = 0; i < roles.length; i++ ) {
        // console.log(roles[i]);
        rolesArray.push(roles[i].job_title);
    };
    let managerArray = [];
    for (let i = 0; i < employees.length; i++) {
        // console.log(employees[i]);
        managerArray.push(employees[i].first_name + ' ' + employees[i].last_name);
    }

    inquirer.prompt([
        {
            type: 'input',
            name: 'newFirstName',
            message: 'What is the first name of the new employee? (Required)',
            validate: newFirstName => {
                if (newFirstName) {
                    return true;
                } else {
                    console.log("Please enter the new employee's first name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'newLastName',
            message: 'What is the last name of the new employee? (Required)',
            validate: newLastName => {
                if (newLastName) {
                    return true;
                } else {
                    console.log("Please enter the new employee's last name!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'newEmployeeRole',
            message: 'What is the role of the new employee? (Required)',
            choices: rolesArray
        },
        {
            type: 'list',
            name: 'newEmployeeManager',
            message: 'Who is the manager for this new employee? (Required)',
            choices: managerArray
        }
    ])
.then(function(answers) {
    // console.log(answers);
    // console.log(roles);
    let roleID = [];
        for (let i = 0; i < roles.length; i++) {
            if (answers.newEmployeeRole == roles[i].job_title) {
                roleID.push(roles[i].id);
            }
        };
        console.log(`The Role ID is ${roleID}`);
        let managerID = [];
        for (let i = 0; i < employees.length; i++) {
            if (answers.newEmployeeManager == (employees[i].first_name + ' ' + employees[i].last_name)) {
                managerID.push(employees[i].id);
            }
        };
        console.log(`The Manager ID is ${managerID}`);
    let sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;
    let params = [ answers.newFirstName, answers.newLastName, roleID, managerID ];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(`\nAdded ${answers.newFirstName + ' ' + answers.newLastName} to the database!\n`);
            start();
    });
})
.catch((error) => {
    if (error.isTtyError) {
        console.log('Prompt could not be rendered in the current environment');
    } else {
        console.log(error);
    }
});
};


const updateEmployee = () => {

};



module.exports = { start };
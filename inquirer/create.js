const db = require('../db/connection');
require('console.table');
const inquirer = require('inquirer');
const { getRoles } = require('../utils/queries');

const createDepartment = () => {
    inquirer.prompt({
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
            console.log(result);
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


const createRole = async () => {
    let roles = await getRoles();
    let rolesArray = [];
    for (let i = 0; i < roles.length; i++ ) {
        console.log(roles[i]);
        rolesArray.push(roles[i].department_name);
    };
    let filteredRoles = [...new Set(rolesArray)];
    console.log(filteredRoles);
    
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
                choices: filteredRoles
            }
        ])
    .then(function(answers) {
        console.log(answers);
        let ;
        let sql = `INSERT INTO role(job_title, salary)
                    VALUES (?, ?)`;
        let params = [ answers.newRoleTitle, answers.newRoleSalary ];
        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log(result);
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


const createEmployee = () => {
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
            type: 'number',
            name: 'newEmployeeRole',
            message: 'What is the role id for the role that this new employee will do? (Required)',
            validate: newEmployeeRole => {
                if (newEmployeeRole) {
                    return true;
                } else {
                    console.log("Please enter the new employee's role id!");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'newEmployeeManager',
            message: 'What is the manager id for the manager that this new employee will answer to? (Required)',
            validate: newEmployeeManager => {
                if (newEmployeeManager) {
                    return true;
                } else {
                    console.log("Please enter the new employee's manager id!");
                    return false;
                }
            }
        }
    ])
.then(function(answers) {
    let sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;
    let params = [ answers.newFirstName, answers.newLastName, answers.newEmployeeRole, answers.newEmployeeManager ];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(result);
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



module.exports = { createDepartment, createRole, createEmployee, updateEmployee };
require('console.table');
const db = require('../db/connection');


const promptDepartments = () => {
    let sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.log('=====================\nDepartments:\n');
        console.table(rows);
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
    });
};



module.exports = { promptDepartments, promptRoles, promptEmployees };
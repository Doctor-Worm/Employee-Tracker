const db = require('../db/connection');


const getRoles = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT role.id, job_title, salary, name AS department_name, department_id
        FROM role
        LEFT JOIN department ON role.department_id = department.id`;
        db.query(sql, (err, res) => {
        if (err) reject(err);
        resolve(res);
        });
    });
};


const getDepartments = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM department`;
        db.query(sql, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};


const getEmployees = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM employee`;
        db.query(sql, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};



module.exports = { getRoles, getDepartments, getEmployees };
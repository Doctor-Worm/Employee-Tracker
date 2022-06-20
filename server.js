const db = require('./db/connection');
const { start } = require('./inquirer/index');


// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    });

start();